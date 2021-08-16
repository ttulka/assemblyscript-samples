const fs = require("fs");
const path = require("path");
const PNG = require("pngjs").PNG;
const {
  Node,
  NodeKind,
  AssertionKind,
  ASTBuilder,
  Transform,
} = require("visitor-as/as");

function* walk(maybeNode, visited = new WeakSet()) {
  if (!(maybeNode instanceof Node)) {
    return;
  }
  if (visited.has(maybeNode)) {
    return;
  }
  yield maybeNode;
  visited.add(maybeNode);

  for (const value of Object.values(maybeNode)) {
    if (Array.isArray(value)) {
      for (const element of value) {
        yield* walk(element, visited);
      }
    } else {
      yield* walk(value, visited);
    }
  }
}

class InlinerTransform extends Transform {
  afterParse(parser) {
    const inlinerSrc = fs.readFileSync(require.resolve("./types.ts"), "utf8");
    parser.parseFile(inlinerSrc, "~inliner/types.ts", true);
    for (const source of parser.sources) {
      for (const node of walk(source)) {
        if (this.isInlineImageAsRgbaStaticArrayCall(node)) {
          this.handleInlineImageAsRgbaStaticArrayCall(source, node);
        }
      }
    }
  }

  isInlineImageAsRgbaStaticArrayCall(node) {
    return (
      node.kind === NodeKind.CALL &&
      ASTBuilder.build(node.expression) === "Inliner.inlineImageAsRgbaStaticArray"
    );
  }

  handleInlineImageAsRgbaStaticArrayCall(source, node) {
    console.assert(
      node.args.length === 1,
      "inlineImageAsRgbaStaticArray takes exactly one argument"
    );
    node.expression.property.text += "_internal";

    const filePath = path.resolve(
      path.dirname(source.normalizedPath),
      node.args[0].value
    );
    const data = fs.readFileSync(filePath);
    const png = PNG.sync.read(data);
    const originalRange = node.args[0].range;
    node.args[0] = Node.createAssertionExpression(
      AssertionKind.PREFIX,
      Node.createArrayLiteralExpression(
        [...new Uint8Array(png.data)].map((v) =>
          Node.createIntegerLiteralExpression(
            { low: v, high: 0, unsigned: false },
            originalRange
          )
        ),
        originalRange
      ),
      Node.createNamedType(
        Node.createSimpleTypeName("StaticArray", originalRange),
        [
          Node.createNamedType(
            Node.createSimpleTypeName("u8", originalRange),
            [],
            false,
            originalRange
          ),
        ],
        false,
        originalRange
      ),
      originalRange
    );
  }
}
module.exports = InlinerTransform;
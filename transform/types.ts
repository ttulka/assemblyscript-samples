@global
class Inliner {

  // This function is just a placeholder so that the TS language server
  // is happy during author time. It will be replaced with the internal
  // version during compilation.
  static inlineImageAsRgbaStaticArray(buf: string): StaticArray<u8> {
    return new StaticArray<u8>(0);
  }

  @inline
  static inlineImageAsRgbaStaticArray_internal(
    buf: StaticArray<u8>
  ): StaticArray<u8> {
    return buf;
  }
}
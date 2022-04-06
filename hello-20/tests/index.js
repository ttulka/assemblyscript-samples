import assert from "assert";

import { hello } from "../build/debug.js";

assert.strictEqual(hello("Joe"), "Hello, Joe!");

console.log("ok");

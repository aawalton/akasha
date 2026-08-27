import { expect, test } from "bun:test"
import { assertOutputDirParentsExist } from "./output-dirs.ts"

test("every configured output dir has an existing parent source tree", () => {
  expect(() => assertOutputDirParentsExist()).not.toThrow()
})

test("assertOutputDirParentsExist fails loud when a target's parent is missing", () => {
  const orphan = "/tmp/temper-nonexistent-package-xyz/src/generated"
  expect(() => assertOutputDirParentsExist([orphan])).toThrow(/orphaned/)
})

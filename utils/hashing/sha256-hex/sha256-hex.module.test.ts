import { expect, test } from "bun:test"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"

test("a body with nothing in it digests to the whole sixty-four characters", () => {
  expect(sha256Hex("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
})

test("text is read as utf8, so text and the bytes of that text digest the same", () => {
  expect(sha256Hex("akasha")).toBe(sha256Hex(new TextEncoder().encode("akasha")))
})

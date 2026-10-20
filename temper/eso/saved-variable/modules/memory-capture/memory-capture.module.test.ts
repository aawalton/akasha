import { expect, test } from "bun:test"
import {
  buildReadingOf,
  readingKeyOf,
} from "akasha/temper/eso/saved-variable/modules/memory-capture/memory-capture.module.code.ts"

test("a reading is known by its character, bar and capture time together", () => {
  const one = readingKeyOf("Erin Solstice", "backBar", 1792439957)
  expect(readingKeyOf("Erin Solstice", "backBar", 1792439958)).not.toBe(one)
  expect(readingKeyOf("Erin Solstice", "frontBar", 1792439957)).not.toBe(one)
  expect(readingKeyOf("Erin Solstice", "backBar", 1792439957)).toBe(one)
})

test("a reading lands under the build hash kept inside it", () => {
  const held = { capturedAt: 1792439957, buildHash: "ATQI", stats: { "magicka-maximum": 15100 } }
  expect(buildReadingOf("Erin Solstice", "backBar", held)).toEqual({
    character: "Erin Solstice",
    buildHash: "ATQI",
    bar: "backBar",
    reading: { capturedAt: 1792439957, stats: { "magicka-maximum": 15100 } },
  })
})

test("a reading keeping no build hash of its own lands nothing", () => {
  const held = { capturedAt: 1792439957, stats: { "magicka-maximum": 15100 } }
  expect(buildReadingOf("Erin Solstice", "backBar", held)).toBe(null)
})

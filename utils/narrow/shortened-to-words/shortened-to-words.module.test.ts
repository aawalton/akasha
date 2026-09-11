import { expect, test } from "bun:test"
import { shortenedToWords } from "akasha/utils/narrow/shortened-to-words/shortened-to-words.module.code.ts"

test("leaves a name already inside the length alone", () => {
  expect(shortenedToWords("queen-bohemian-rhapsody", 100)).toBe("queen-bohemian-rhapsody")
})

test("drops whole words rather than parting one", () => {
  expect(shortenedToWords("queen-bohemian-rhapsody", 16)).toBe("queen-bohemian")
})

test("parts a first word that fills the length on its own", () => {
  expect(shortenedToWords("supercalifragilistic", 8)).toBe("supercal")
})

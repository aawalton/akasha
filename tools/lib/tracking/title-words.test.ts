import { describe, expect, test } from "bun:test"
import { resolveActivityDifficulty } from "./levels.ts"
import { DAY_TURN_WORDS, MINUTE_WORDS, titleMatchesAnyWord } from "./title-words.ts"

describe("the words a title is matched against", () => {
  test("the two lists are what they are, and Sleep is on both", () => {
    expect(MINUTE_WORDS).toEqual(["Sleep", "Rest"])
    expect(DAY_TURN_WORDS).toEqual(["Sleep"])
  })
})

describe("matching a title against a word", () => {
  test("a whole word in the title matches, whatever the case", () => {
    expect(titleMatchesAnyWord("Sleep", ["sleep"])).toBe(true)
    expect(titleMatchesAnyWord("sleep", ["Sleep"])).toBe(true)
    expect(titleMatchesAnyWord("Long sleep after a long day", ["Sleep"])).toBe(true)
  })

  test("anything that is not a letter or a digit separates one word from the next", () => {
    expect(titleMatchesAnyWord("Sleep — deep", ["Sleep"])).toBe(true)
    expect(titleMatchesAnyWord("nap/sleep/rest", ["rest"])).toBe(true)
    expect(titleMatchesAnyWord("sleep(8h)", ["Sleep"])).toBe(true)
  })

  test("a word inside a longer word is not a word, so sleeping is not Sleep", () => {
    expect(titleMatchesAnyWord("sleeping", ["Sleep"])).toBe(false)
    expect(titleMatchesAnyWord("asleep", ["Sleep"])).toBe(false)
    expect(titleMatchesAnyWord("Restaurant", ["Rest"])).toBe(false)
  })

  /**
   * A word of several words is a subset, not a phrase.
   *
   * Every token of the word has to stand somewhere in the title, and nothing says they stand in that
   * order or next to each other.
   */
  test("a word of several words matches when all of them are in the title, in any order", () => {
    expect(titleMatchesAnyWord("in sleep now", ["Sleep in"])).toBe(true)
    expect(titleMatchesAnyWord("sleep in", ["Sleep in"])).toBe(true)
    expect(titleMatchesAnyWord("sleep", ["Sleep in"])).toBe(false)
  })

  test("any one of the words matching is enough", () => {
    expect(titleMatchesAnyWord("Rest", MINUTE_WORDS)).toBe(true)
    expect(titleMatchesAnyWord("Rest", DAY_TURN_WORDS)).toBe(false)
  })

  test("a title with no words in it matches nothing", () => {
    expect(titleMatchesAnyWord("", ["Sleep"])).toBe(false)
    expect(titleMatchesAnyWord("---", ["Sleep"])).toBe(false)
  })

  test("a title that is no text at all matches nothing rather than throwing", () => {
    expect(titleMatchesAnyWord(42, ["Sleep"])).toBe(false)
    expect(titleMatchesAnyWord(null, ["Sleep"])).toBe(false)
    expect(titleMatchesAnyWord(undefined, ["Sleep"])).toBe(false)
  })

  test("a word that is no text, or is only punctuation, is passed over", () => {
    expect(titleMatchesAnyWord("Sleep", [42, "Sleep"])).toBe(true)
    expect(titleMatchesAnyWord("Sleep", [42])).toBe(false)
    expect(titleMatchesAnyWord("Sleep", ["  "])).toBe(false)
    expect(titleMatchesAnyWord("Sleep", [])).toBe(false)
  })

  test("letters beyond the Latin ones are letters", () => {
    expect(titleMatchesAnyWord("сон deep", ["сон"])).toBe(true)
    expect(titleMatchesAnyWord("休息 now", ["休息"])).toBe(true)
  })
})

/**
 * The library holds two different rules for "does this title name this thing", and they disagree.
 *
 * `titleMatchesAnyWord` splits a title into words and asks whether the word is one of them.
 * `resolveActivityDifficulty` asks whether the activity's name appears anywhere in the title as a
 * run of characters. The same pair of strings gets opposite answers, and which rule runs decides
 * whether a block turns the day or how hard it was rated.
 */
describe("the two title rules in this library, side by side", () => {
  // KNOWN DEFECT: the catalog match should split into words too, so that one rule answers "does this
  // title name this thing" and the two cannot disagree.
  test("Read is inside Threading, so the catalog matches it and the word rule does not", () => {
    expect(resolveActivityDifficulty("Threading cable", [{ title: "Read", defaultDifficulty: 3 }])).toBe(
      "3"
    )
    expect(titleMatchesAnyWord("Threading cable", ["Read"])).toBe(false)
  })

  test("the disagreement runs both ways along the same pair of strings", () => {
    for (const [title, word] of [
      ["sleeping", "Sleep"],
      ["Restaurant", "Rest"],
      ["Cartography", "art"],
    ] as const) {
      expect(titleMatchesAnyWord(title, [word])).toBe(false)
      expect(resolveActivityDifficulty(title, [{ title: word, defaultDifficulty: 1 }])).toBe("1")
    }
  })

  test("the word rule matches a phrase out of order where the catalog rule needs it whole", () => {
    expect(titleMatchesAnyWord("in sleep now", ["Sleep in"])).toBe(true)
    expect(
      resolveActivityDifficulty("in sleep now", [{ title: "Sleep in", defaultDifficulty: 1 }])
    ).toBeUndefined()
  })

  test("where both rules see a plain whole word, they agree", () => {
    expect(titleMatchesAnyWord("Long sleep", ["sleep"])).toBe(true)
    expect(resolveActivityDifficulty("Long sleep", [{ title: "sleep", defaultDifficulty: 1 }])).toBe(
      "1"
    )
  })
})

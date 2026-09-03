import { describe, expect, test } from "bun:test"
import type { Page } from "../daily-tracking/tracking-types.ts"
import { EXIT, exitCodeOf } from "../exit.ts"
import {
  DIFFICULTY_LEVEL_KEY,
  SAFETY_LEVEL_KEY,
  parseDifficulty,
  parseSafety,
  resolveActivityDifficulty,
  resolveCarriedSafety,
  resolveDifficulty,
} from "./levels.ts"

/** A row as it comes back from the store, which is `id` and `seq` and whatever else was written. */
function page(fields: Readonly<Record<string, unknown>>): Page {
  return { id: "row-1", seq: 1, ...fields }
}

/** What a refusal said, so a test can name the sentence rather than only the exit code. */
function refusalOf(f: () => unknown): { code: number; message: string } {
  try {
    f()
  } catch (thrown) {
    return { code: exitCodeOf(thrown), message: (thrown as Error).message }
  }
  throw new Error("nothing was refused")
}

describe("the levels a block may be rated", () => {
  test("safety runs -2 to 5 and difficulty runs 0 to 5, ends included", () => {
    expect(parseSafety("-2")).toBe("-2")
    expect(parseSafety("5")).toBe("5")
    expect(parseDifficulty("0")).toBe("0")
    expect(parseDifficulty("5")).toBe("5")
  })

  test("a step past either end is refused, and the sentence names the two ends", () => {
    expect(refusalOf(() => parseSafety("-2.5")).message).toBe(
      'safety must be between -2 and 5, got "-2.5"'
    )
    expect(refusalOf(() => parseSafety("5.5")).message).toBe(
      'safety must be between -2 and 5, got "5.5"'
    )
    expect(refusalOf(() => parseDifficulty("-0.5")).message).toBe(
      'difficulty must be between 0 and 5, got "-0.5"'
    )
    expect(refusalOf(() => parseDifficulty("5.5")).message).toBe(
      'difficulty must be between 0 and 5, got "5.5"'
    )
  })

  test("a rating is a half-step, and a third of a step is not one", () => {
    expect(parseSafety("2.5")).toBe("2.5")
    expect(refusalOf(() => parseSafety("2.3")).message).toBe(
      'safety must be a half-step (e.g. 2 or 2.5), got "2.3"'
    )
  })

  /**
   * The order the two refusals stand in is the behaviour, not an accident of which reads better.
   *
   * `99.3` is both out of range and off the half-step, and only one sentence comes back. A reader
   * told "half-step" about a number that is twenty times too large learns the smaller of the two
   * things wrong with it.
   */
  test("half-step is checked before range, so a wildly large third-step says half-step", () => {
    expect(refusalOf(() => parseSafety("99.3")).message).toBe(
      'safety must be a half-step (e.g. 2 or 2.5), got "99.3"'
    )
    expect(refusalOf(() => parseDifficulty("99.3")).message).toBe(
      'difficulty must be a half-step (e.g. 2 or 2.5), got "99.3"'
    )
  })

  test("something that is no number at all is refused before either of those", () => {
    expect(refusalOf(() => parseSafety("")).message).toBe('safety must be a number, got ""')
    expect(refusalOf(() => parseSafety("   ")).message).toBe('safety must be a number, got "   "')
    expect(refusalOf(() => parseSafety("abc")).message).toBe('safety must be a number, got "abc"')
  })

  test("every refusal here is the caller's mistake", () => {
    for (const raw of ["", "abc", "2.3", "9"]) {
      expect(refusalOf(() => parseSafety(raw)).code).toBe(EXIT.INPUT)
    }
  })
})

describe("the spelling a rating takes once it is accepted", () => {
  test("a rating comes back as text, never as a number", () => {
    expect(typeof parseSafety("3")).toBe("string")
    expect(typeof parseDifficulty("2.5")).toBe("string")
  })

  test("the way the caller wrote it is not kept: 2.0 and -0 are 2 and 0", () => {
    expect(parseSafety("2.0")).toBe("2")
    expect(parseSafety("-0")).toBe("0")
    expect(parseSafety(" 2 ")).toBe("2")
  })

  /**
   * The negative half-step is built from the magnitude, so the floor runs away from zero, not down.
   *
   * `Math.floor(-1.5)` is `-2`, which would have made this `-2.5`, a different and worse rating.
   */
  test("a negative half-step keeps its own value rather than the one below it", () => {
    expect(parseSafety("-1.5")).toBe("-1.5")
    expect(parseSafety("-0.5")).toBe("-0.5")
  })
})

describe("what a new block does with the safety of the one before it", () => {
  test("a stated safety wins over anything the prior row carried", () => {
    const prior = page({ [SAFETY_LEVEL_KEY]: "1" })
    expect(resolveCarriedSafety(prior, "4")).toBe("4")
  })

  test("with nothing stated, the prior row's safety is copied across", () => {
    expect(resolveCarriedSafety(page({ [SAFETY_LEVEL_KEY]: "2.5" }), undefined)).toBe("2.5")
  })

  /**
   * The copy is a copy of the text, not a re-reading of the rating.
   *
   * Whatever stands in the prior row goes into the new one unread, so a rating that could never
   * have been written by `parseSafety` spreads from row to row once it is in.
   */
  // KNOWN DEFECT: a carried safety should be validated on the way through, so a rating no parse
  // would accept cannot spread down the day.
  test("a prior safety is copied verbatim and unread, even a rating no parse would accept", () => {
    expect(resolveCarriedSafety(page({ [SAFETY_LEVEL_KEY]: "not-a-level" }), undefined)).toBe(
      "not-a-level"
    )
    expect(resolveCarriedSafety(page({ [SAFETY_LEVEL_KEY]: "99" }), undefined)).toBe("99")
    expect(resolveCarriedSafety(page({ [SAFETY_LEVEL_KEY]: "2.3" }), undefined)).toBe("2.3")
  })

  test("with no prior row, and with a prior row that never rated itself, the answer is nothing", () => {
    expect(resolveCarriedSafety(null, undefined)).toBeUndefined()
    expect(resolveCarriedSafety(page({}), undefined)).toBeUndefined()
    expect(resolveCarriedSafety(page({ [SAFETY_LEVEL_KEY]: 3 }), undefined)).toBeUndefined()
  })

  /**
   * Nothing is `undefined` and never `null`, because the caller spreads this into the row it writes.
   *
   * `null` would land in the row as a stated absence and overwrite whatever was there; `undefined`
   * leaves the key out of the write entirely.
   */
  test("nothing is the absence of the key, so it can never be written as a stated null", () => {
    const carried = resolveCarriedSafety(null, undefined)
    expect(carried).toBeUndefined()
    expect(carried).not.toBeNull()
    expect(JSON.stringify({ safetyLevel: carried })).toBe("{}")
    expect(JSON.stringify({ safetyLevel: null })).toBe('{"safetyLevel":null}')
  })
})

describe("how a block gets its difficulty", () => {
  test("a stated difficulty is read and returned", () => {
    expect(resolveDifficulty("3.5", "anything", [])).toBe("3.5")
  })

  test("with nothing stated, the catalog of activities is asked", () => {
    expect(resolveDifficulty(undefined, "Deep work", [{ title: "work", defaultDifficulty: 3 }])).toBe(
      "3"
    )
  })

  test("with neither, it refuses, and the sentence teaches both ways out", () => {
    expect(refusalOf(() => resolveDifficulty(undefined, "Nap", [])).message).toBe(
      'no session-activity default matches "Nap" and no --difficulty was given — ' +
        "rate this block with `--difficulty <0…5>`, or teach the catalog with " +
        '`ops tracking activity-set "<activity>" --difficulty <0…5>` so every block ' +
        "naming it rates itself"
    )
    expect(refusalOf(() => resolveDifficulty(undefined, "Nap", [])).code).toBe(EXIT.INPUT)
  })

  /**
   * There is no third rung, and in particular the prior row is not one.
   *
   * Safety carries down the day and difficulty does not: `resolveDifficulty` takes no prior page at
   * all, so there is nowhere for a carried difficulty to come from.
   */
  test("difficulty does not carry forward the way safety does", () => {
    const prior = page({ [DIFFICULTY_LEVEL_KEY]: "4", [SAFETY_LEVEL_KEY]: "1" })
    expect(resolveCarriedSafety(prior, undefined)).toBe("1")
    expect(resolveDifficulty.length).toBe(3)
    expect(() => resolveDifficulty(undefined, "Nap", [])).toThrow()
  })
})

describe("reading a difficulty off the catalog of activities", () => {
  test("the activity name is looked for anywhere inside the title, whatever the case", () => {
    expect(resolveActivityDifficulty("Deep WORK on the roof", [
      { title: "work", defaultDifficulty: 3 },
    ])).toBe("3")
    expect(resolveActivityDifficulty("deep work", [{ title: "  WORK  ", defaultDifficulty: 3 }])).toBe(
      "3"
    )
  })

  /**
   * The match is a substring and not a word, which is a different rule from every other title match
   * in this library. `titleMatchesAnyWord` splits into words; this one does not.
   */
  // KNOWN DEFECT: the catalog should match whole words, so an activity named "Read" does not rate a
  // block called "Threading cable".
  test("a name inside another word still matches, so Read rates Threading cable", () => {
    expect(resolveActivityDifficulty("Threading cable", [{ title: "Read", defaultDifficulty: 3 }])).toBe(
      "3"
    )
    expect(resolveActivityDifficulty("Cartography", [{ title: "art", defaultDifficulty: 2 }])).toBe(
      "2"
    )
  })

  test("several activities in one title take the highest, not the sum and not the first", () => {
    const catalog = [
      { title: "read", defaultDifficulty: 2 },
      { title: "write", defaultDifficulty: 4 },
      { title: "and", defaultDifficulty: 1 },
    ]
    expect(resolveActivityDifficulty("read and write", catalog)).toBe("4")
    expect(resolveActivityDifficulty("write and read", catalog)).toBe("4")
  })

  test("an activity with no default, or a nameless one, is passed over", () => {
    expect(
      resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: undefined }])
    ).toBeUndefined()
    expect(
      resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: Number.NaN }])
    ).toBeUndefined()
    expect(
      resolveActivityDifficulty("deep work", [
        { title: "   ", defaultDifficulty: 5 },
        { title: "work", defaultDifficulty: 1 },
      ])
    ).toBe("1")
  })

  test("a zero default is a rating and not an absence", () => {
    expect(resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: 0 }])).toBe("0")
  })

  test("no activity matching is nothing, which is what sends the caller to the refusal", () => {
    expect(resolveActivityDifficulty("Nap", [{ title: "work", defaultDifficulty: 3 }])).toBeUndefined()
    expect(resolveActivityDifficulty("Nap", [])).toBeUndefined()
  })

  /**
   * The catalog's number is spelled, not checked.
   *
   * A stated `--difficulty` goes through `parseLevel`, which holds the range and the half-step. A
   * catalog default goes through `canonicalLevel` alone, which only decides how to write it down.
   */
  // KNOWN DEFECT: a catalog default should be read by the same parse a stated one is, so an
  // out-of-range default refuses instead of being written into the row.
  test("a catalog default outside 0…5 is written down unchecked", () => {
    expect(resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: 9 }])).toBe("9")
    expect(resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: -1.5 }])).toBe(
      "-1.5"
    )
    expect(refusalOf(() => parseDifficulty("9")).message).toBe(
      'difficulty must be between 0 and 5, got "9"'
    )
  })

  // KNOWN DEFECT: a catalog default that is no half-step should refuse, rather than being quietly
  // rewritten as the half-step below it.
  test("a catalog default that is no half-step is quietly rounded down to one", () => {
    expect(resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: 2.7 }])).toBe(
      "2.5"
    )
    expect(resolveActivityDifficulty("deep work", [{ title: "work", defaultDifficulty: 2.1 }])).toBe(
      "2.5"
    )
    expect(refusalOf(() => parseDifficulty("2.7")).message).toBe(
      'difficulty must be a half-step (e.g. 2 or 2.5), got "2.7"'
    )
  })
})

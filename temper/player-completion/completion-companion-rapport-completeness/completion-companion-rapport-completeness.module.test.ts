import { describe, expect, test } from "bun:test"
import { MAX_COMPANION_RAPPORT } from "../companion-rapport/companion-rapport.module.code.ts"
import { isCompanionRapportPathComplete } from "./completion-companion-rapport-completeness.module.code.ts"

const DEFID_BASTIAN = 1
const DEFID_MIRRI = 2
const DEFID_EMBER = 5
const DEFID_ISOBEL = 6
const DEFID_SHARP = 8
const DEFID_AZANDAR = 9
const DEFID_TANLORIN = 12
const DEFID_ZERITH = 13

const MAX = MAX_COMPANION_RAPPORT
const NEAR_MAX = MAX_COMPANION_RAPPORT - 1

const ALL_AT_MAX: Record<number, number> = {
  [DEFID_BASTIAN]: MAX,
  [DEFID_MIRRI]: MAX,
  [DEFID_EMBER]: MAX,
  [DEFID_ISOBEL]: MAX,
  [DEFID_SHARP]: MAX,
  [DEFID_AZANDAR]: MAX,
  [DEFID_TANLORIN]: MAX,
  [DEFID_ZERITH]: MAX,
}

describe("isCompanionRapportPathComplete at the card level", () => {
  test("it is complete when every canonical companion is at max affinity", () => {
    expect(isCompanionRapportPathComplete(ALL_AT_MAX)).toBe(true)
  })

  test("it is incomplete when one companion is a single point below max", () => {
    expect(isCompanionRapportPathComplete({ ...ALL_AT_MAX, [DEFID_MIRRI]: NEAR_MAX })).toBe(false)
  })

  test("an empty rapport map is incomplete rather than vacuously complete", () => {
    expect(isCompanionRapportPathComplete({})).toBe(false)
  })

  test("a partial map missing companions is incomplete", () => {
    expect(isCompanionRapportPathComplete({ [DEFID_AZANDAR]: MAX })).toBe(false)
  })

  test("missing rapport data is incomplete", () => {
    expect(isCompanionRapportPathComplete(undefined)).toBe(false)
  })

  test("an empty path is read the same as no path", () => {
    expect(isCompanionRapportPathComplete(ALL_AT_MAX, [])).toBe(true)
    expect(isCompanionRapportPathComplete({}, [])).toBe(false)
  })
})

describe("isCompanionRapportPathComplete at the item level", () => {
  test("one companion at max is complete", () => {
    expect(isCompanionRapportPathComplete({ [DEFID_BASTIAN]: MAX }, [DEFID_BASTIAN])).toBe(true)
  })

  test("one companion below max is incomplete", () => {
    expect(isCompanionRapportPathComplete({ [DEFID_BASTIAN]: NEAR_MAX }, [DEFID_BASTIAN])).toBe(
      false
    )
  })

  test("a companion absent from the map is incomplete", () => {
    expect(isCompanionRapportPathComplete({}, [DEFID_ZERITH])).toBe(false)
  })

  test("missing rapport data is incomplete whatever the path", () => {
    expect(isCompanionRapportPathComplete(undefined, [DEFID_BASTIAN])).toBe(false)
  })
})

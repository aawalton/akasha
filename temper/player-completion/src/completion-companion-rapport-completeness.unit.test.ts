import { describe, expect, it } from "bun:test"
import { MAX_COMPANION_RAPPORT } from "./companion-rapport"
import { isCompanionRapportPathComplete } from "./completion-companion-rapport-completeness"

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

describe("isCompanionRapportPathComplete — card level", () => {
  it("complete when every canonical companion is at max affinity", () => {
    expect(isCompanionRapportPathComplete(ALL_AT_MAX)).toBe(true)
  })

  it("incomplete when one companion is one point below max", () => {
    expect(isCompanionRapportPathComplete({ ...ALL_AT_MAX, [DEFID_MIRRI]: NEAR_MAX })).toBe(false)
  })

  it("incomplete for an empty rapport map (no vacuous truth)", () => {
    expect(isCompanionRapportPathComplete({})).toBe(false)
  })

  it("incomplete for a partial map missing companions", () => {
    expect(isCompanionRapportPathComplete({ [DEFID_AZANDAR]: MAX })).toBe(false)
  })

  it("incomplete when rapport data is missing", () => {
    expect(isCompanionRapportPathComplete(undefined)).toBe(false)
  })

  it("treats an empty path the same as no path", () => {
    expect(isCompanionRapportPathComplete(ALL_AT_MAX, [])).toBe(true)
    expect(isCompanionRapportPathComplete({}, [])).toBe(false)
  })
})

describe("isCompanionRapportPathComplete — item level", () => {
  it("complete for a single companion at max", () => {
    expect(isCompanionRapportPathComplete({ [DEFID_BASTIAN]: MAX }, [DEFID_BASTIAN])).toBe(true)
  })

  it("incomplete for a single companion below max", () => {
    expect(isCompanionRapportPathComplete({ [DEFID_BASTIAN]: NEAR_MAX }, [DEFID_BASTIAN])).toBe(
      false
    )
  })

  it("incomplete for a companion absent from the map", () => {
    expect(isCompanionRapportPathComplete({}, [DEFID_ZERITH])).toBe(false)
  })

  it("incomplete when rapport data is missing regardless of path", () => {
    expect(isCompanionRapportPathComplete(undefined, [DEFID_BASTIAN])).toBe(false)
  })
})

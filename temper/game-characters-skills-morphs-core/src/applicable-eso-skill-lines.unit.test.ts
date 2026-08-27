import { describe, expect, it } from "bun:test"
import { computeApplicableEsoSkillLineIds } from "./applicable-eso-skill-lines"

describe("computeApplicableEsoSkillLineIds", () => {
  const baseApplicableEsoLineIds = new Set<number>([24, 25, 26, 51, 50])
  const classLinesByEsoClassId = new Map<number, readonly number[]>([
    [1, [22, 27, 28]],
    [2, [38, 39, 40]],
  ])
  const racialLineByEsoRaceId = new Map<number, number>([
    [1, 60],
    [6, 63],
  ])

  it("returns base + matching class trio + matching racial line", () => {
    const result = computeApplicableEsoSkillLineIds({
      esoClassId: 1,
      esoRaceId: 6,
      classLinesByEsoClassId,
      racialLineByEsoRaceId,
      baseApplicableEsoLineIds,
    })
    expect([...result].sort((a, b) => a - b)).toEqual([22, 24, 25, 26, 27, 28, 50, 51, 63])
  })

  it("omits class lines when class id is unknown", () => {
    const result = computeApplicableEsoSkillLineIds({
      esoClassId: 999,
      esoRaceId: 1,
      classLinesByEsoClassId,
      racialLineByEsoRaceId,
      baseApplicableEsoLineIds,
    })
    expect([...result].sort((a, b) => a - b)).toEqual([24, 25, 26, 50, 51, 60])
  })

  it("omits racial line when race id is unknown", () => {
    const result = computeApplicableEsoSkillLineIds({
      esoClassId: 1,
      esoRaceId: 999,
      classLinesByEsoClassId,
      racialLineByEsoRaceId,
      baseApplicableEsoLineIds,
    })
    expect([...result].sort((a, b) => a - b)).toEqual([22, 24, 25, 26, 27, 28, 50, 51])
  })

  it("does not mutate the input baseApplicableEsoLineIds", () => {
    const baseSnapshot = [...baseApplicableEsoLineIds]
    computeApplicableEsoSkillLineIds({
      esoClassId: 1,
      esoRaceId: 6,
      classLinesByEsoClassId,
      racialLineByEsoRaceId,
      baseApplicableEsoLineIds,
    })
    expect([...baseApplicableEsoLineIds]).toEqual(baseSnapshot)
  })
})

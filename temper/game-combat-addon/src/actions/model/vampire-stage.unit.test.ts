import { describe, expect, test } from "bun:test"
import { STAGE_BY_ID, vampireStageForAbilityId } from "./vampire-stage"

describe("vampireStageForAbilityId", () => {
  test("maps each stage abilityId to its stage number", () => {
    expect(vampireStageForAbilityId(135397)).toBe(1)
    expect(vampireStageForAbilityId(135399)).toBe(2)
    expect(vampireStageForAbilityId(135400)).toBe(3)
    expect(vampireStageForAbilityId(135402)).toBe(4)
  })

  test("returns undefined for a non-vampire abilityId", () => {
    expect(vampireStageForAbilityId(34117)).toBeUndefined()
    expect(vampireStageForAbilityId(0)).toBeUndefined()
  })

  test("returns undefined when the abilityId is absent", () => {
    expect(vampireStageForAbilityId(undefined)).toBeUndefined()
  })

  test("covers exactly the four stages", () => {
    expect(STAGE_BY_ID.size).toBe(4)
    expect([...STAGE_BY_ID.values()].sort()).toEqual([1, 2, 3, 4])
  })
})

import { describe, expect, it } from "bun:test"
import {
  COOLDOWN_GROUP_KEYS,
  COOLDOWN_GROUPS,
  type CooldownItemInput,
  DLC_DAILY_DURATION,
  DLC_DAILY_KEYS,
  DLC_DAILY_PATTERNS,
  findCooldownGroup,
  isDlcDailyContainerByName,
  isRftwContainer,
  matchesCooldownGroup,
  RFTW_GROUP,
} from "./cooldown-groups"

function item(itemName: string): CooldownItemInput {
  return { itemName }
}

describe("findCooldownGroup", () => {
  it("matches Rewards for the Worthy to the rftw group", () => {
    const group = findCooldownGroup(item("Rewards for the Worthy"))
    expect(group?.key).toBe("rftw")
  })

  it("matches Imperial City Coffer to the imperial-city group", () => {
    const group = findCooldownGroup(item("Imperial City Coffer of Tel Var"))
    expect(group?.key).toBe("imperial-city")
  })

  it("matches Mages Guild Merits to the mages-guild group", () => {
    const group = findCooldownGroup(item("Mages Guild Merits"))
    expect(group?.key).toBe("mages-guild")
  })

  it("matches Fighters Guild Merits to the fighters-guild group", () => {
    const group = findCooldownGroup(item("Fighters Guild Merits"))
    expect(group?.key).toBe("fighters-guild")
  })

  it("matches Undaunted Merits to the undaunted group", () => {
    const group = findCooldownGroup(item("Undaunted Merits"))
    expect(group?.key).toBe("undaunted")
  })

  it("matches Reward Container to cyrodiil-towns group", () => {
    const group = findCooldownGroup(item("Bruma Reward Container"))
    expect(group?.key).toBe("cyrodiil-towns")
  })

  it("returns undefined for non-cooldown items", () => {
    expect(findCooldownGroup(item("Iron Ore"))).toBeUndefined()
  })

  it("returns undefined for empty itemName", () => {
    expect(findCooldownGroup(item(""))).toBeUndefined()
  })
})

describe("isRftwContainer", () => {
  it("is true for Rewards for the Worthy", () => {
    expect(isRftwContainer(item("Rewards for the Worthy"))).toBe(true)
  })

  it("is false for other cooldown groups", () => {
    expect(isRftwContainer(item("Imperial City Coffer"))).toBe(false)
  })

  it("is false for empty itemName", () => {
    expect(isRftwContainer(item(""))).toBe(false)
  })
})

describe("isDlcDailyContainerByName", () => {
  it("matches Reward Coffer", () => {
    expect(isDlcDailyContainerByName(item("Wrothgar Reward Coffer"))).toBe(true)
  })

  it("matches Recompense", () => {
    expect(isDlcDailyContainerByName(item("Hero's Recompense"))).toBe(true)
  })

  it("is false for non-DLC items", () => {
    expect(isDlcDailyContainerByName(item("Iron Ore"))).toBe(false)
  })
})

describe("matchesCooldownGroup", () => {
  it("matches against a specific group", () => {
    expect(matchesCooldownGroup(item("Rewards for the Worthy"), RFTW_GROUP)).toBe(true)
  })

  it("returns false when name does not match the group", () => {
    expect(matchesCooldownGroup(item("Imperial City Coffer"), RFTW_GROUP)).toBe(false)
  })
})

describe("data integrity", () => {
  it("COOLDOWN_GROUPS keys cover the COOLDOWN_GROUP_KEYS union", () => {
    const groupKeys = COOLDOWN_GROUPS.map((g) => g.key).sort()
    const expectedKeys = [...COOLDOWN_GROUP_KEYS].sort()
    expect(groupKeys).toEqual(expectedKeys)
  })

  it("DLC_DAILY_KEYS values are distinct and prefixed", () => {
    const values = Object.values(DLC_DAILY_KEYS)
    expect(new Set(values).size).toBe(values.length)
    for (const v of values) expect(v.startsWith("dlc-dailies-")).toBe(true)
  })

  it("DLC_DAILY_PATTERNS is non-empty", () => {
    expect(DLC_DAILY_PATTERNS.length).toBeGreaterThan(0)
  })

  it("DLC_DAILY_DURATION is 20h in seconds", () => {
    expect(DLC_DAILY_DURATION).toBe(72000)
  })
})

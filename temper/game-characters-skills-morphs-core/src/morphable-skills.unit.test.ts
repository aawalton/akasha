import { describe, expect, it } from "bun:test"

import { skills } from "@temper/game-characters-skills/skills-data"
import { morphableSkillsByLine } from "./morphable-skills"

describe("morphableSkillsByLine — lineRankNeeded data correctness", () => {
  it("Templar Aedric Spear has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("templar-aedric-spear")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Templar Dawn's Wrath has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("templar-dawns-wrath")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("weapon Two Handed has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("weapon-two-handed")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("weapon One Hand and Shield has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("weapon-one-hand-and-shield")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Light Armor's morphable skill has lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("armor-light-armor")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Fighters Guild has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("guild-fighters-guild")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Mages Guild has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("guild-mages-guild")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Undaunted has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("guild-undaunted")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Psijic Order has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("guild-psijic-order")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Vampire has at least one skill with lineRankNeeded > 1", () => {
    const line = morphableSkillsByLine.get("world-vampire")
    expect(line).toBeDefined()
    expect(line?.some((s) => s.lineRankNeeded > 1)).toBe(true)
  })

  it("Templar Spear Shards specifically has lineRankNeeded equal to 30 (Aedric Spear's rank-30 ability)", () => {
    const line = morphableSkillsByLine.get("templar-aedric-spear")
    const spearShards = line?.find((s) => s.baseName === "Spear Shards")
    expect(spearShards).toBeDefined()
    expect(spearShards?.lineRankNeeded).toBe(30)
  })
})

describe("morphableSkillsByLine — base-less phantom-group exclusion", () => {
  it("dragonknight-ardent-flame has no group whose baseName is a morph (Incinerate / Searing Claw)", () => {
    const line = morphableSkillsByLine.get("dragonknight-ardent-flame")
    expect(line).toBeDefined()
    const baseNames = new Set(line?.map((s) => s.baseName))
    expect(baseNames.has("Incinerate")).toBe(false)
    expect(baseNames.has("Searing Claw")).toBe(false)
  })

  it("no line contains a group whose baseName also appears as a morph name in the same line", () => {
    const offenders: string[] = []
    for (const [lineId, entries] of morphableSkillsByLine) {
      const morphNames = new Set<string>()
      for (const entry of entries) {
        if (entry.morph1Name !== "") morphNames.add(entry.morph1Name)
        if (entry.morph2Name !== "") morphNames.add(entry.morph2Name)
      }
      for (const entry of entries) {
        if (morphNames.has(entry.baseName)) {
          offenders.push(`${lineId}:${entry.baseName}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})

describe("morphableSkillsByLine — Werewolf reworked morph structure", () => {
  const reworkedPairs: ReadonlyArray<{
    base: { name: string; esoSkillId: number }
    morph1: { name: string; esoSkillId: number }
    morph2: { name: string; esoSkillId: number }
    skillType: "active" | "ultimate"
  }> = [
    {
      base: { name: "Gnash", esoSkillId: 58405 },
      morph1: { name: "Rip and Tear", esoSkillId: 58742 },
      morph2: { name: "Bloody Gnash", esoSkillId: 58798 },
      skillType: "active",
    },
    {
      base: { name: "Rending Claws", esoSkillId: 58855 },
      morph1: { name: "Claw Fury", esoSkillId: 58864 },
      morph2: { name: "Bloodclaws", esoSkillId: 58879 },
      skillType: "active",
    },
    {
      base: { name: "Pounce", esoSkillId: 32632 },
      morph1: { name: "Brutal Pounce", esoSkillId: 39105 },
      morph2: { name: "Feral Pounce", esoSkillId: 39104 },
      skillType: "active",
    },
    {
      base: { name: "Roar", esoSkillId: 32633 },
      morph1: { name: "Ferocious Roar", esoSkillId: 39113 },
      morph2: { name: "Deafening Roar", esoSkillId: 39114 },
      skillType: "active",
    },
    {
      base: { name: "Hircine's Bounty", esoSkillId: 58310 },
      morph1: { name: "Hircine's Rage", esoSkillId: 58317 },
      morph2: { name: "Hircine's Fortitude", esoSkillId: 58325 },
      skillType: "active",
    },
    {
      base: { name: "Werewolf Transformation", esoSkillId: 32455 },
      morph1: { name: "Pack Leader", esoSkillId: 39075 },
      morph2: { name: "Werewolf Berserker", esoSkillId: 39076 },
      skillType: "ultimate",
    },
  ]

  const wwRows = skills.list.filter((s) => s.skillLineId === "world-werewolf")
  const wwRowFor = (name: string, esoSkillId: number) =>
    wwRows.find((s) => s.name === name && s.esoSkillId === esoSkillId)

  for (const pair of reworkedPairs) {
    it(`Werewolf base "${pair.base.name}" → "${pair.morph1.name}" / "${pair.morph2.name}" (${pair.skillType})`, () => {
      const line = morphableSkillsByLine.get("world-werewolf")
      expect(line).toBeDefined()
      const group = line?.find((s) => s.baseName === pair.base.name)
      expect(group).toBeDefined()
      expect(group?.skillType).toBe(pair.skillType)
      const morphNames = new Set([group?.morph1Name, group?.morph2Name])
      expect(morphNames.has(pair.morph1.name)).toBe(true)
      expect(morphNames.has(pair.morph2.name)).toBe(true)

      for (const slot of [pair.base, pair.morph1, pair.morph2]) {
        const rows = wwRows.filter((s) => s.name === slot.name)
        expect(rows.map((s) => s.esoSkillId)).toEqual([slot.esoSkillId])
      }
      expect(wwRowFor(pair.base.name, pair.base.esoSkillId)?.morphIndex).toBe(0)
    })
  }

  it("Werewolf line has exactly the six reworked bases and no others", () => {
    const line = morphableSkillsByLine.get("world-werewolf")
    expect(line).toBeDefined()
    const baseNames = (line ?? []).map((s) => s.baseName).sort()
    expect(baseNames).toEqual(reworkedPairs.map((p) => p.base.name).sort())
  })

  it("Werewolf line has no base-less phantom group (every group has a base)", () => {
    const line = morphableSkillsByLine.get("world-werewolf")
    expect(line).toBeDefined()
    const allowedBases = new Set(reworkedPairs.map((p) => p.base.name))
    const phantoms = (line ?? []).map((s) => s.baseName).filter((name) => !allowedBases.has(name))
    expect(phantoms).toEqual([])
  })

  it("Werewolf line no longer carries any OLD skill names (bases or morphs)", () => {
    const oldNames = [
      "Piercing Howl",
      "Infectious Claws",
      "Howl of Despair",
      "Howl of Agony",
      "Claws of Anguish",
      "Claws of Life",
      "Devour",
      "Pursuit",
      "Savage Strength",
      "Bloodmoon",
      "Call of the Pack",
    ]
    const wwNames = new Set(
      skills.list.filter((s) => s.skillLineId === "world-werewolf").map((s) => s.name)
    )
    const survivors = oldNames.filter((name) => wwNames.has(name))
    expect(survivors).toEqual([])
  })

  it("Werewolf line no longer carries any OLD morph esoSkillIds", () => {
    const oldEsoSkillIds = [
      42119, 42128, 42157, 42179, 42367, 42379, 46135, 46137, 46139, 46142, 58323, 58334, 58794,
      58808, 58876, 58907,
    ]
    const wwEsoSkillIds = new Set(
      skills.list.filter((s) => s.skillLineId === "world-werewolf").map((s) => s.esoSkillId)
    )
    const survivors = oldEsoSkillIds.filter((id) => wwEsoSkillIds.has(id))
    expect(survivors).toEqual([])
  })
})

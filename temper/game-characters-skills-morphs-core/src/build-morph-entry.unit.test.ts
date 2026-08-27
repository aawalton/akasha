import { describe, expect, it } from "bun:test"
import { makeSkill } from "./_select-morph-suggestions-test-helpers"
import { buildMorphEntry } from "./build-morph-entry"

describe("buildMorphEntry", () => {
  it("returns variant=base when base is below rank 4", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 2 },
      morph1: { name: "M1", rank: 0 },
      morph2: { name: "M2", rank: 0 },
      currentMorph: 0,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry).toBeDefined()
    expect(entry?.skillName).toBe("B")
    expect(entry?.variant).toBe("base")
    expect(entry?.rank).toBe(2)
  })

  it("returns variant=base when base=4 but atMorph is false and currentMorph=0", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 4 },
      morph1: { name: "M1", rank: 0 },
      morph2: { name: "M2", rank: 0 },
      currentMorph: 0,
      atMorph: false,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry?.variant).toBe("base")
    expect(entry?.skillName).toBe("B")
    expect(entry?.rank).toBe(4)
  })

  it("returns chosen morph (variant=morph1) when currentMorph=1 and morph1 is un-maxed", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 4 },
      morph1: { name: "M1", rank: 2 },
      morph2: { name: "M2", rank: 0 },
      currentMorph: 1,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry?.skillName).toBe("M1")
    expect(entry?.variant).toBe("morph1")
    expect(entry?.rank).toBe(2)
  })

  it("falls back to unchosen morph when chosen morph is maxed", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 4 },
      morph1: { name: "M1", rank: 4 },
      morph2: { name: "M2", rank: 1 },
      currentMorph: 1,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry?.skillName).toBe("M2")
    expect(entry?.variant).toBe("morph2")
    expect(entry?.rank).toBe(1)
  })

  it("picks the higher-ranked morph as 'chosen' when currentMorph=0 but morphs have rank", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 4 },
      morph1: { name: "M1", rank: 1 },
      morph2: { name: "M2", rank: 3 },
      currentMorph: 0,
      atMorph: true,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry?.skillName).toBe("M2")
    expect(entry?.variant).toBe("morph2")
  })

  it("returns undefined when sum of clamped ranks is >= 12 (fully leveled)", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 4 },
      morph1: { name: "M1", rank: 4 },
      morph2: { name: "M2", rank: 4 },
      currentMorph: 1,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry).toBeUndefined()
  })

  it("clamps rank > 4 down to 4 (treated as maxed for that variant)", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 8 },
      morph1: { name: "M1", rank: 4 },
      morph2: { name: "M2", rank: 4 },
      currentMorph: 1,
      abilityIndex: 1,
    })
    expect(buildMorphEntry(skill, false, 5, new Set())).toBeUndefined()
  })

  it("tags ultimate skills with skillType='ultimate'", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 1 },
      morph1: { name: "M1", rank: 0 },
      morph2: { name: "M2", rank: 0 },
      currentMorph: 0,
      abilityIndex: 1,
      isUltimate: true,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set())
    expect(entry?.skillType).toBe("ultimate")
  })

  it("isEquipped checks the *returned* variant name, not the base", () => {
    const skill = makeSkill({
      base: { name: "B", rank: 4 },
      morph1: { name: "M1", rank: 2 },
      morph2: { name: "M2", rank: 0 },
      currentMorph: 1,
      abilityIndex: 1,
    })
    const entry = buildMorphEntry(skill, false, 5, new Set(["B"]))
    expect(entry?.skillName).toBe("M1")
    expect(entry?.isEquipped).toBe(false)
  })
})

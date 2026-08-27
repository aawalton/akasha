import { describe, expect, it } from "bun:test"

import {
  blankSkill,
  DK_ARDENT_FLAME,
  DK_DRACONIC_POWER,
  defaultInput,
  lineOf,
  makeSkill,
  VAMPIRE,
  WEREWOLF,
} from "./_select-morph-suggestions-test-helpers"
import { type SkillMorphInput, selectMorphSuggestions } from "./select-morph-suggestions"

describe("selectMorphSuggestions — variant tagging", () => {
  it("propagates variant tag from buildMorphEntry to each entry", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            100: makeSkill({
              base: { name: "Lava", rank: 4 },
              morph1: { name: "Lava-M1", rank: 1 },
              morph2: { name: "Lava-M2", rank: 0 },
              currentMorph: 1,
              abilityIndex: 1,
            }),
          }),
        },
      })
    )
    expect(result.suggestions).toHaveLength(1)
    expect(result.suggestions?.[0]?.variant).toBe("morph1")
  })
})

describe("selectMorphSuggestions — sort", () => {
  it("places ultimates before actives", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: blankSkill("active", 5, false),
            20: blankSkill("ult", 1, true),
          }),
        },
      })
    )
    const names = result.suggestions?.map((e) => e.skillName) ?? []
    expect(names[0]).toBe("ult-base")
    expect(names[1]).toBe("active-base")
  })

  it("orders within same skillType: base > morph1 > morph2", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: makeSkill({
              base: { name: "B-base", rank: 1 },
              morph1: { name: "B-m1", rank: 0 },
              morph2: { name: "B-m2", rank: 0 },
              currentMorph: 0,
              abilityIndex: 1,
            }),
            20: makeSkill({
              base: { name: "M2-base", rank: 4 },
              morph1: { name: "M2-m1", rank: 4 },
              morph2: { name: "M2-m2", rank: 1 },
              currentMorph: 2,
              abilityIndex: 2,
            }),
            30: makeSkill({
              base: { name: "M1-base", rank: 4 },
              morph1: { name: "M1-m1", rank: 1 },
              morph2: { name: "M1-m2", rank: 0 },
              currentMorph: 1,
              abilityIndex: 3,
            }),
          }),
        },
      })
    )
    const variants = result.suggestions?.map((e) => e.variant) ?? []
    expect(variants).toEqual(["base", "morph1", "morph2"])
  })

  it("places not-incompatible before incompatible within same skillType + variant", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: makeSkill({
              base: { name: "EarlyEquipped", rank: 1 },
              morph1: { name: "x", rank: 0 },
              morph2: { name: "y", rank: 0 },
              currentMorph: 0,
              abilityIndex: 1,
            }),
          }),
          [DK_DRACONIC_POWER]: lineOf({
            20: makeSkill({
              base: { name: "LaterFresh", rank: 1 },
              morph1: { name: "p", rank: 0 },
              morph2: { name: "q", rank: 0 },
              currentMorph: 0,
              abilityIndex: 2,
            }),
          }),
        },
        equippedSkillNames: new Set(["EarlyEquipped"]),
      })
    )
    const names = result.suggestions?.map((e) => e.skillName) ?? []
    expect(names[0]).toBe("LaterFresh")
    expect(names[1]).toBe("EarlyEquipped")
  })

  it("breaks ties by lineDisplayOrder, then abilityIndex", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_DRACONIC_POWER]: lineOf({
            20: blankSkill("draconic", 1, false),
          }),
          [DK_ARDENT_FLAME]: lineOf({
            10: blankSkill("ardent", 2, false),
          }),
        },
      })
    )
    const names = result.suggestions?.map((e) => e.skillName) ?? []
    expect(names[0]).toBe("ardent-base")
    expect(names[1]).toBe("draconic-base")
  })
})

describe("selectMorphSuggestions — caps", () => {
  it("respects caps.active and caps.ultimate", () => {
    const skills: Record<number, SkillMorphInput> = {}
    for (let i = 0; i < 10; i++) {
      skills[100 + i] = blankSkill(`a${i}`, i, false)
    }
    for (let i = 0; i < 5; i++) {
      skills[200 + i] = blankSkill(`u${i}`, i, true)
    }
    const result = selectMorphSuggestions(
      defaultInput({ skillLineProgress: { [DK_ARDENT_FLAME]: lineOf(skills) } })
    )
    const ults = result.suggestions?.filter((e) => e.skillType === "ultimate") ?? []
    const acts = result.suggestions?.filter((e) => e.skillType === "active") ?? []
    expect(ults).toHaveLength(2)
    expect(acts).toHaveLength(7)
  })

  it("includes incompatible entries to fill remaining capacity when too few non-incompatible exist", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: blankSkill("a", 1, false),
            20: blankSkill("b", 2, false),
          }),
        },
        equippedSkillNames: new Set(["a-base", "b-base"]),
      })
    )
    expect(result.suggestions).toHaveLength(2)
    expect(result.suggestions?.every((e) => e.isIncompatible)).toBe(true)
  })
})

describe("selectMorphSuggestions — incompatible flagging", () => {
  it("flags candidates whose name is in equippedSkillNames as isIncompatible", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: blankSkill("a", 1, false),
          }),
        },
        equippedSkillNames: new Set(["a-base"]),
      })
    )
    const entry = result.suggestions?.[0]
    expect(entry?.isEquipped).toBe(true)
    expect(entry?.isIncompatible).toBe(true)
  })

  it("flags off-side curse candidates as incompatible when on-side curse has slotted leveling skills", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [VAMPIRE]: lineOf({
            10: makeSkill({
              base: { name: "vamp-slotted", rank: 2 },
              morph1: { name: "vamp-m1", rank: 0 },
              morph2: { name: "vamp-m2", rank: 0 },
              currentMorph: 0,
              abilityIndex: 1,
            }),
          }),
          [WEREWOLF]: lineOf({
            20: blankSkill("ww", 1, false),
          }),
        },
        equippedSkillNames: new Set(["vamp-slotted"]),
      })
    )
    const wwEntry = result.suggestions?.find((e) => e.skillName === "ww-base")
    const vampEntry = result.suggestions?.find((e) => e.skillName === "vamp-slotted")
    expect(wwEntry?.isLineConflict).toBe(true)
    expect(wwEntry?.isIncompatible).toBe(true)
    expect(wwEntry?.isEquipped).toBe(false)
    expect(vampEntry?.isLineConflict).toBe(false)
    expect(vampEntry?.isIncompatible).toBe(true)
  })

  it("does NOT flag off-side curse as incompatible when nothing in either curse line is slotted leveling", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [VAMPIRE]: lineOf({
            10: blankSkill("vamp", 1, false),
          }),
          [WEREWOLF]: lineOf({
            20: blankSkill("ww", 1, false),
          }),
        },
        equippedSkillNames: new Set<string>(),
      })
    )
    const vamp = result.suggestions?.find((e) => e.skillName === "vamp-base")
    const ww = result.suggestions?.find((e) => e.skillName === "ww-base")
    expect(vamp?.isIncompatible).toBe(false)
    expect(ww?.isIncompatible).toBe(false)
  })

  it("does NOT flag off-side curse as incompatible when on-side has only maxed slotted skills", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [VAMPIRE]: lineOf({
            10: makeSkill({
              base: { name: "vamp-maxed", rank: 4 },
              morph1: { name: "vamp-m1", rank: 4 },
              morph2: { name: "vamp-m2", rank: 4 },
              currentMorph: 1,
              abilityIndex: 1,
            }),
          }),
          [WEREWOLF]: lineOf({
            20: blankSkill("ww", 1, false),
          }),
        },
        equippedSkillNames: new Set(["vamp-maxed"]),
      })
    )
    const ww = result.suggestions?.find((e) => e.skillName === "ww-base")
    expect(ww?.isIncompatible).toBe(false)
  })
})

describe("selectMorphSuggestions — completion", () => {
  it("returns isComplete=true and suggestions=undefined when SLP is empty", () => {
    const result = selectMorphSuggestions(defaultInput({}))
    expect(result.isComplete).toBe(true)
    expect(result.suggestions).toBeUndefined()
  })

  it("returns isComplete=true when every morphable skill is fully leveled", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: makeSkill({
              base: { name: "B", rank: 4 },
              morph1: { name: "M1", rank: 4 },
              morph2: { name: "M2", rank: 4 },
              currentMorph: 1,
              abilityIndex: 1,
            }),
          }),
        },
      })
    )
    expect(result.isComplete).toBe(true)
    expect(result.suggestions).toBeUndefined()
  })

  it("isComplete=true when caps are met by slotted leveling skills", () => {
    const skills: Record<number, SkillMorphInput> = {}
    const equipped = new Set<string>()
    for (let i = 0; i < 7; i++) {
      const name = `act${i}`
      skills[100 + i] = makeSkill({
        base: { name, rank: 1 },
        morph1: { name: `${name}-m1`, rank: 0 },
        morph2: { name: `${name}-m2`, rank: 0 },
        currentMorph: 0,
        abilityIndex: i,
      })
      equipped.add(name)
    }
    for (let i = 0; i < 2; i++) {
      const name = `ult${i}`
      skills[200 + i] = makeSkill({
        base: { name, rank: 1 },
        morph1: { name: `${name}-m1`, rank: 0 },
        morph2: { name: `${name}-m2`, rank: 0 },
        currentMorph: 0,
        abilityIndex: i,
        isUltimate: true,
      })
      equipped.add(name)
    }
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: { [DK_ARDENT_FLAME]: lineOf(skills) },
        equippedSkillNames: equipped,
      })
    )
    expect(result.isComplete).toBe(true)
  })

  it("isComplete=true when fillable pool is empty (no actionable improvement)", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: blankSkill("only", 1, false),
          }),
        },
        equippedSkillNames: new Set(["only-base"]),
      })
    )
    expect(result.isComplete).toBe(true)
  })

  it("isComplete=false when many empty slots have a fillable pool > 0", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: blankSkill("slotted", 1, false),
            20: blankSkill("a", 2, false),
            30: blankSkill("b", 3, false),
            40: blankSkill("c", 4, false),
          }),
        },
        equippedSkillNames: new Set(["slotted-base"]),
      })
    )
    expect(result.isComplete).toBe(false)
  })

  it("isComplete=true when wasted slots cross-type but stay within the 3-slot budget", () => {
    const skills: Record<number, SkillMorphInput> = {}
    const equipped = new Set<string>()
    for (let i = 0; i < 7; i++) {
      const name = `act${i}`
      skills[100 + i] = makeSkill({
        base: { name, rank: 1 },
        morph1: { name: `${name}-m1`, rank: 0 },
        morph2: { name: `${name}-m2`, rank: 0 },
        currentMorph: 0,
        abilityIndex: i,
      })
      equipped.add(name)
    }
    skills[200] = makeSkill({
      base: { name: "ult-slotted", rank: 1 },
      morph1: { name: "ult-slotted-m1", rank: 0 },
      morph2: { name: "ult-slotted-m2", rank: 0 },
      currentMorph: 0,
      abilityIndex: 0,
      isUltimate: true,
    })
    equipped.add("ult-slotted")
    skills[201] = makeSkill({
      base: { name: "ult-pool", rank: 1 },
      morph1: { name: "ult-pool-m1", rank: 0 },
      morph2: { name: "ult-pool-m2", rank: 0 },
      currentMorph: 0,
      abilityIndex: 1,
      isUltimate: true,
    })
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: { [DK_ARDENT_FLAME]: lineOf(skills) },
        equippedSkillNames: equipped,
      })
    )
    expect(result.isComplete).toBe(true)
  })

  it("isComplete=true when only impossible candidates remain (curse conflict drops them from fillable pool)", () => {
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [VAMPIRE]: lineOf({
            10: blankSkill("vamp", 1, false),
          }),
          [WEREWOLF]: lineOf({
            20: blankSkill("ww", 1, false),
          }),
        },
        equippedSkillNames: new Set(["vamp-base"]),
      })
    )
    expect(result.isComplete).toBe(true)
  })

  it("isComplete=false when ult shortfall remains and ult pool is non-empty", () => {
    const skills: Record<number, SkillMorphInput> = {}
    skills[200] = blankSkill("u1", 1, true)
    skills[201] = blankSkill("u2", 2, true)
    for (let i = 0; i < 4; i++) {
      skills[100 + i] = blankSkill(`a${i}`, i, false)
    }
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: { [DK_ARDENT_FLAME]: lineOf(skills) },
      })
    )
    expect(result.isComplete).toBe(false)
  })
})

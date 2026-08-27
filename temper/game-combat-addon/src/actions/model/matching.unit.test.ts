import { describe, expect, test } from "bun:test"

import { matchesAbility, matchesNewEffect } from "./matching"
import { EFFECT_FOLLOW_TOLERANCE_MS, STRICT_WINDOW_MS } from "./model-constants"
import type { Ability, Action, ActionFlags, Effect } from "./types"

function makeAbility(overrides: Partial<Ability> = {}): Ability {
  return {
    id: 1000,
    name: "Test Ability",
    showName: "Test Ability",
    icon: "/esoui/art/icons/ability_test_001.dds",
    description: "Test description for the ability.",
    type: 1,
    ...overrides,
  }
}

function makeFlags(overrides: Partial<ActionFlags> = {}): ActionFlags {
  return {
    forArea: false,
    forEnemy: false,
    forGround: false,
    forSelf: false,
    forTank: false,
    shifted: false,
    onlyOneTarget: false,
    ...overrides,
  }
}

function makeEffect(overrides: Partial<Effect> = {}): Effect {
  return {
    ability: makeAbility(),
    unitTag: "player",
    unitId: 1,
    startTime: 0,
    endTime: 0,
    duration: 0,
    stackCount: 0,
    level: 99,
    levelIsLow: true,
    ignored: false,
    ignorableDebuff: false,
    isCrux: false,
    activated: true,
    ...overrides,
  }
}

function makeAction(overrides: Partial<Action> = {}): Action {
  return {
    sn: 1,
    slotNum: 3,
    hotbarCategory: 0,
    ability: makeAbility(),
    relatedAbilityList: [],
    channeled: false,
    castTime: 0,
    startTime: 0,
    duration: 0,
    descriptionNums: [],
    endTime: 0,
    effectList: [],
    effectEndTimes: [],
    stackCount: 0,
    targetOut: false,
    fake: false,
    saved: false,
    flags: makeFlags(),
    data: {},
    ...overrides,
  }
}

describe("matchesAbility", () => {
  test("equal id matches regardless of icon/name", () => {
    const a = makeAbility({ id: 42, icon: "x", name: "A" })
    const b = makeAbility({ id: 42, icon: "y", name: "B" })
    expect(matchesAbility(a, b, true)).toBe(true)
  })

  test("name substring only matches non-strict via description, not strict name", () => {
    const a = makeAbility({ id: 1, name: "Flame", icon: "ic_a", description: "" })
    const b = makeAbility({ id: 2, name: "Flame Lash", icon: "ic_b" })
    expect(matchesAbility(a, b, true)).toBe(false)
  })

  test("exact name matches", () => {
    const a = makeAbility({ id: 1, name: "Flame Lash", icon: "ic_a" })
    const b = makeAbility({ id: 2, name: "Flame Lash", icon: "ic_b" })
    expect(matchesAbility(a, b, true)).toBe(true)
  })

  test("progressionName exact match", () => {
    const a = makeAbility({
      id: 1,
      name: "Morph A",
      progressionName: "Base Skill",
      icon: "ic_a",
    })
    const b = makeAbility({ id: 2, name: "Base Skill", icon: "ic_b" })
    expect(matchesAbility(a, b, true)).toBe(true)
  })

  test("description substring matches only when !strict and other name is not simple", () => {
    const a = makeAbility({
      id: 1,
      name: "Critical Surge",
      icon: "ic_a",
      description: "Grants Major Sorcery to you.",
    })
    const b = makeAbility({ id: 2, name: "Major Sorcery", icon: "ic_b" })
    expect(matchesAbility(a, b, false)).toBe(true)
    expect(matchesAbility(a, b, true)).toBe(false)
  })

  test("simple (one-word) other name does not match via description", () => {
    const a = makeAbility({
      id: 1,
      name: "Some Skill",
      icon: "ic_a",
      description: "Applies Burning to the enemy.",
    })
    const b = makeAbility({ id: 2, name: "Burning", icon: "ic_b" })
    expect(matchesAbility(a, b, false)).toBe(false)
  })
})

describe("matchesNewEffect", () => {
  test("fast-path id match against an existing effectList entry", () => {
    const shared = makeAbility({ id: 7777, icon: "ic_shared" })
    const action = makeAction({
      ability: makeAbility({ id: 1, icon: "ic_action" }),
      effectList: [makeEffect({ ability: shared })],
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 7777, icon: "ic_other", name: "Other" }),
      startTime: 100,
    })
    expect(matchesNewEffect(action, effect)).toBe(true)
  })

  test("buff effect skips the fast effectList path", () => {
    const shared = makeAbility({ id: 7777, icon: "/icons/ability_buff_major.dds" })
    const action = makeAction({
      ability: makeAbility({ id: 1, icon: "ic_action", name: "Act" }),
      effectList: [makeEffect({ ability: shared })],
    })
    const effect = makeEffect({
      ability: makeAbility({
        id: 7777,
        icon: "/icons/ability_buff_major.dds",
        name: "Buff",
      }),
      startTime: 100,
    })
    expect(matchesNewEffect(action, effect)).toBe(false)
  })

  test("strict-window boundary: just inside castTime+2000 stays non-strict", () => {
    const sharedIcon = "/icons/ability_shared_001.dds"
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 0,
      ability: makeAbility({ id: 1, icon: sharedIcon, name: "Caster", description: "" }),
    })
    const effectInside = makeEffect({
      ability: makeAbility({ id: 2, icon: sharedIcon, name: "EffectName", description: "" }),
      startTime: STRICT_WINDOW_MS,
      duration: 5000,
    })
    expect(matchesNewEffect(action, effectInside)).toBe(true)
  })

  test("strict-window boundary: just outside forces strict (icon match alone insufficient when only description-path could help)", () => {
    const sharedIcon = "/icons/ability_shared_001.dds"
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 0,
      ability: makeAbility({ id: 1, icon: sharedIcon, name: "Caster", description: "" }),
    })
    const effectOutside = makeEffect({
      ability: makeAbility({ id: 2, icon: sharedIcon, name: "EffectName", description: "" }),
      startTime: STRICT_WINDOW_MS + 1,
      duration: 5000,
    })
    expect(matchesNewEffect(action, effectOutside)).toBe(true)
  })

  test("strict outside window: description-only match is suppressed", () => {
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 0,
      ability: makeAbility({
        id: 1,
        icon: "ic_action",
        name: "Critical Surge",
        description: "Grants Major Sorcery to you.",
      }),
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 2, icon: "ic_effect", name: "Major Sorcery", description: "" }),
      startTime: STRICT_WINDOW_MS + 1,
      duration: 5000,
    })
    expect(matchesNewEffect(action, effect)).toBe(false)
    const effectInside = makeEffect({
      ability: makeAbility({ id: 2, icon: "ic_effect", name: "Major Sorcery", description: "" }),
      startTime: 0,
      duration: 5000,
    })
    expect(matchesNewEffect(action, effectInside)).toBe(true)
  })

  test("minor-debuff icon forces non-strict even outside the window", () => {
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 0,
      ability: makeAbility({
        id: 1,
        icon: "ic_action",
        name: "Critical Surge",
        description: "Grants Major Sorcery to you.",
      }),
    })
    const effect = makeEffect({
      ability: makeAbility({
        id: 2,
        icon: "/icons/ability_debuff_minor_thing.dds",
        name: "Major Sorcery",
        description: "",
      }),
      startTime: STRICT_WINDOW_MS + 5000,
      duration: 5000,
    })
    expect(matchesNewEffect(action, effect)).toBe(true)
  })

  test("effectEndTimes follow tolerance relaxes strict", () => {
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 0,
      ability: makeAbility({
        id: 1,
        icon: "ic_action",
        name: "Critical Surge",
        description: "Grants Major Sorcery to you.",
      }),
      effectEndTimes: [10000],
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 2, icon: "ic_effect", name: "Major Sorcery", description: "" }),
      startTime: 10000 + (EFFECT_FOLLOW_TOLERANCE_MS - 1),
      duration: 5000,
    })
    expect(matchesNewEffect(action, effect)).toBe(true)

    const effectFar = makeEffect({
      ability: makeAbility({ id: 2, icon: "ic_effect", name: "Major Sorcery", description: "" }),
      startTime: 10000 + EFFECT_FOLLOW_TOLERANCE_MS + 100,
      duration: 5000,
    })
    expect(matchesNewEffect(action, effectFar)).toBe(false)
  })

  test("non-integer-duration rejection clause (strict + fractional seconds + different name + different rounded seconds)", () => {
    const sharedIcon = "/icons/ability_shared_001.dds"
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 5000,
      ability: makeAbility({ id: 1, icon: sharedIcon, name: "Caster", description: "" }),
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 2, icon: sharedIcon, name: "Merciless Charge", description: "" }),
      startTime: STRICT_WINDOW_MS + 1,
      duration: 10900,
    })
    expect(matchesNewEffect(action, effect)).toBe(false)
  })

  test("non-integer-duration clause does not reject when rounded seconds agree", () => {
    const sharedIcon = "/icons/ability_shared_001.dds"
    const action = makeAction({
      startTime: 0,
      castTime: 0,
      duration: 11000,
      ability: makeAbility({ id: 1, icon: sharedIcon, name: "Caster", description: "" }),
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 2, icon: sharedIcon, name: "Other Name", description: "" }),
      startTime: STRICT_WINDOW_MS + 1,
      duration: 10900,
    })
    expect(matchesNewEffect(action, effect)).toBe(true)
  })

  test("tank quest_shield taunt match (icon byte-18 plain find + forTank)", () => {
    const action = makeAction({
      flags: makeFlags({ forTank: true }),
      ability: makeAbility({ id: 1, icon: "ic_taunt_skill", name: "Inner Fire" }),
    })
    const tauntIcon = "/esoui/art/icons/quest_shield_001.dds"
    expect(tauntIcon.indexOf("quest_shield_001")).toBeGreaterThanOrEqual(17)
    const effect = makeEffect({
      ability: makeAbility({ id: 999, icon: tauntIcon, name: "Taunt" }),
      startTime: 50,
    })
    expect(matchesNewEffect(action, effect)).toBe(true)
  })

  test("quest_shield does not taunt when not a tank action", () => {
    const action = makeAction({
      flags: makeFlags({ forTank: false }),
      ability: makeAbility({ id: 1, icon: "ic_skill", name: "Skill" }),
    })
    const effect = makeEffect({
      ability: makeAbility({
        id: 999,
        icon: "/esoui/art/icons/quest_shield_001.dds",
        name: "Taunt",
      }),
      startTime: 50,
    })
    expect(matchesNewEffect(action, effect)).toBe(false)
  })

  test("pre-filter rejects effect starting >500ms after a non-ground action ended", () => {
    const action = makeAction({
      startTime: 0,
      endTime: 1000,
      flags: makeFlags({ forGround: false }),
      ability: makeAbility({ id: 7777, icon: "ic", name: "X" }),
      effectList: [makeEffect({ ability: makeAbility({ id: 7777, icon: "ic", name: "X" }) })],
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 7777, icon: "ic", name: "X" }),
      startTime: 1000 + EFFECT_FOLLOW_TOLERANCE_MS + 1,
    })
    expect(matchesNewEffect(action, effect)).toBe(false)
  })

  test("pre-filter does not reject ground actions", () => {
    const action = makeAction({
      startTime: 0,
      endTime: 1000,
      flags: makeFlags({ forGround: true }),
      ability: makeAbility({ id: 7777, icon: "ic", name: "X" }),
      effectList: [makeEffect({ ability: makeAbility({ id: 7777, icon: "ic", name: "X" }) })],
    })
    const effect = makeEffect({
      ability: makeAbility({ id: 7777, icon: "ic", name: "X" }),
      startTime: 1000 + EFFECT_FOLLOW_TOLERANCE_MS + 1,
    })
    expect(matchesNewEffect(action, effect)).toBe(true)
  })
})

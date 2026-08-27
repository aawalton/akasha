import { describe, expect, test } from "bun:test"
import {
  parseRestoreMetricIdsFromAbilityText,
  type RestoreMetricId,
} from "./parse-restore-metrics-from-ability-text.ts"

type Fixture = {
  readonly itemId: number
  readonly name: string
  readonly ability: string
  readonly expected: readonly RestoreMetricId[]
}

const CATALOG_PROOF_SET: readonly Fixture[] = [
  {
    itemId: 27036,
    name: "health",
    ability:
      "Restore |cffffff267|r Health immediately.\nGrants Major Fortitude which increases your Health Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.",
    expected: ["health-restore"],
  },
  {
    itemId: 27037,
    name: "Magicka",
    ability:
      "Restore |cffffff238|r Magicka immediately.\nGrants you Major Intellect which increases your Magicka Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.",
    expected: ["magicka-restore"],
  },
  {
    itemId: 27038,
    name: "stamina",
    ability:
      "Restore |cffffff238|r Stamina immediately.\nGrants Major Endurance which increases your Stamina Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.",
    expected: ["stamina-restore"],
  },
  {
    itemId: 176040,
    name: "Potent Magicka",
    ability:
      "Grants Major Sorcery which increases your Spell Damage by |cffffff20|r% for |cffffff3.9|r seconds.\n\nRestore |cffffff238|r Magicka immediately.\nGrants you Major Intellect which increases your Magicka Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.",
    expected: ["magicka-restore"],
  },
  {
    itemId: 176041,
    name: "Potent Health",
    ability:
      "Restore |cffffff267|r Health immediately.\nGrants Major Fortitude which increases your Health Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.\n\nRestore |cffffff238|r Magicka immediately.\nGrants you Major Intellect which increases your Magicka Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.",
    expected: ["health-restore", "magicka-restore"],
  },
  {
    itemId: 176042,
    name: "Potent Stamina",
    ability:
      "Grants Major Brutality which increases your Weapon Damage by |cffffff20|r% for |cffffff3.9|r seconds.\n\nRestore |cffffff238|r Stamina immediately.\nGrants Major Endurance which increases your Stamina Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.",
    expected: ["stamina-restore"],
  },
  {
    itemId: 64710,
    name: "Crown Tri-Restoration Potion",
    ability:
      "Restore |cffffff8536|r Health, |cffffff7582|r Magicka, and |cffffff7582|r Stamina immediately.\nGrants Major Fortitude, Major Intellect, and Major Endurance which increase your Health Recovery, Magicka Recovery, and Stamina Recovery by |cffffff30|r% for |cffffff47.3|r seconds.\nThese effects are scaled based on your level.",
    expected: ["health-restore", "magicka-restore", "stamina-restore"],
  },
  {
    itemId: 112427,
    name: "Gold Coast Spellcaster Elixir",
    ability:
      "Restore |cffffff7582|r Magicka immediately.\nGrants Major Intellect which increases your Magicka Recovery by |cffffff30|r% for |cffffff47.3|r seconds.\nAlso grants Major Sorcery and Major Prophecy, increasing your Spell Damage by |cffffff20|r% and Spell Critical by |cffffff2629|r for |cffffff47.3|r seconds\nThese effects are scaled based on your level.",
    expected: ["magicka-restore"],
  },
  {
    itemId: 112428,
    name: "Gold Coast Warrior Elixir",
    ability:
      "Restore |cffffff7582|r Stamina immediately.\nGrants Major Endurance which increases your Stamina Recovery by |cffffff30|r% for |cffffff47.3|r seconds.\nAlso grants Major Brutality and Major Savagery, increasing your Weapon Damage by |cffffff20|r% and Weapon Critical by |cffffff2629|r for |cffffff47.3|r seconds.\nThese effects are scaled based on your level.",
    expected: ["stamina-restore"],
  },
  {
    itemId: 124674,
    name: "Gold Coast Swift Survivor Elixir",
    ability:
      "Restore |cffffff8536|r Health immediately.\nGrants Major Fortitude and Major Expedition, increasing your Health Recovery by |cffffff30|r% for |cffffff47.3|r seconds, and Movement Speed by |cffffff30|r% for |cffffff13.6|r seconds.\nAlso grants Unstoppable for |cffffff10.4|r seconds, granting you immunity to knockback and disabling effects.  \nThese effects are scaled based on your level.",
    expected: ["health-restore"],
  },
]

const EXTENDED_SET: readonly Fixture[] = [
  {
    itemId: 74728,
    name: "Roguish Stealth Draught",
    ability:
      "Restore |cffffff238|r Stamina immediately.\nGrants Major Endurance which increases your Stamina Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.\nGrants Vanish which makes you invisible for |cffffff2|r seconds.",
    expected: ["stamina-restore"],
  },
  {
    itemId: 74729,
    name: "Roguish Escape Draught",
    ability:
      "Restore |cffffff238|r Stamina immediately.\nGrants Major Endurance which increases your Stamina Regeneration by |cffffff30|r% for |cffffff3.9|r seconds.\nGrants Major Expedition which increases your movement speed by |cffffff30|r% for |cffffff2|r seconds.",
    expected: ["stamina-restore"],
  },
  {
    itemId: 54859,
    name: "Rejuvenation",
    ability:
      "Restore |cffffff336|r Health immediately.\nGrants Major Fortitude which increases your Health Regeneration by |cffffff30|r% for |cffffff13|r seconds.\nRestore |cffffff298|r Magicka immediately.\nGrants you Major Intellect which increases your Magicka Regeneration by |cffffff30|r% for |cffffff13|r seconds.\nRestore |cffffff298|r Stamina immediately.\nGrants Major Endurance which increases your Stamina Regeneration by |cffffff30|r% for |cffffff13|r seconds.",
    expected: ["health-restore", "magicka-restore", "stamina-restore"],
  },
  {
    itemId: 61028,
    name: "Crown Health Potion",
    ability:
      "Restore |cffffff9281|r Health immediately.\nGrants Major Fortitude which increases your Health Regeneration by |cffffff30|r% for |cffffff0|r seconds.\nThese effects are scaled based on your level.",
    expected: ["health-restore"],
  },
  {
    itemId: 64741,
    name: "White Tincture",
    ability:
      "Restore |cffffff336|r Health immediately.\nGrants Major Fortitude which increases your Health Recovery by |cffffff30|r% for |cffffff9|r seconds.\n\nRestore |cffffff298|r Magicka and Stamina immediately.\nGrants Major Intellect and Major Endurance which increase your Magicka and Stamina Recovery by |cffffff30|r% for |cffffff9|r seconds.",
    expected: ["health-restore", "magicka-restore", "stamina-restore"],
  },
  {
    itemId: 68350,
    name: "Cyan Tincture",
    ability:
      "Restore |cffffff298|r Magicka immediately.\nGrants Major Intellect and which increase your Magicka Recovery by |cffffff30|r% for |cffffff9|r seconds.\n\nThis effect scales from Level |cffffff0|r to Level |cffffff0|r.\n\nGrants Major Sorcery which increases your Spell Damage by |cffffff20|r% for |cffffff13|r seconds.",
    expected: ["magicka-restore"],
  },
  {
    itemId: 71071,
    name: "Alliance Health Draught",
    ability:
      "Restore |cffffff336|r Health immediately.\nGrants Major Fortitude which increases your Health Recovery by |cffffff30|r% for |cffffff47.3|r seconds.\nAlso grants Invisibility and Unstoppable for |cffffff10.4|r seconds, granting you immunity to knockback and disabling effects.",
    expected: ["health-restore"],
  },
  {
    itemId: 214314,
    name: "Tri-Restoration Potion of Vengeance",
    ability:
      "Restore |cffffff8568|r Health, |cffffff7600|r Magicka, and |cffffff7600|r Stamina immediately.\n\nThis potion always seems to refill itself…",
    expected: ["health-restore", "magicka-restore", "stamina-restore"],
  },
]

describe("parseRestoreMetricIdsFromAbilityText", () => {
  describe("byte-identical to existing catalog (POTION_ITEM_ID_TO_RESTORE_METRICS proof set)", () => {
    for (const { itemId, name, ability, expected } of CATALOG_PROOF_SET) {
      test(`${itemId} ${name} -> ${expected.join(",")}`, () => {
        expect(parseRestoreMetricIdsFromAbilityText(ability)).toEqual(expected)
      })
    }
  })

  describe("extended real-potion coverage", () => {
    for (const { itemId, name, ability, expected } of EXTENDED_SET) {
      test(`${itemId} ${name} -> ${expected.join(",")}`, () => {
        expect(parseRestoreMetricIdsFromAbilityText(ability)).toEqual(expected)
      })
    }
  })

  describe("edge cases", () => {
    test("empty string -> []", () => {
      expect(parseRestoreMetricIdsFromAbilityText("")).toEqual([])
    })

    test("non-restore damage ability -> []", () => {
      expect(parseRestoreMetricIdsFromAbilityText("Deals 1000 Flame Damage to the enemy.")).toEqual(
        []
      )
    })

    test("regen-only mention of Health (not a Restore span) -> []", () => {
      expect(
        parseRestoreMetricIdsFromAbilityText(
          "Grants Major Fortitude which increases your Health Regeneration by 30% for 5 seconds."
        )
      ).toEqual([])
    })
  })
})

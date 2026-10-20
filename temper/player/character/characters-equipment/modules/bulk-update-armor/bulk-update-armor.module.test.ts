import { expect, test } from "bun:test"
import {
  type ArmorSlotId,
  armorSlots,
} from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import type { StandardArmorWeightId } from "akasha/temper/catalog/gear/equipment/modules/armor-weight-ids/armor-weight-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import { bulkUpdateArmorSet } from "akasha/temper/player/character/characters-equipment/modules/bulk-update-armor/bulk-update-armor.module.code.ts"
import type { Loadout } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
const sets = holdSetCatalogFromCheckout()

const MEDIUM_ONLY = "undaunted-infiltrator"

function setAt(slug: string): SetTemplate {
  const found = sets.data[slug]
  if (found === undefined) throw new Error(`no set page is \`${slug}\``)
  return found
}

const LIGHT_OR_MEDIUM: SetTemplate = {
  ...setAt(MEDIUM_ONLY),
  id: "light-or-medium",
  valid: ["*:light", "*:medium"],
}

const AVAILABLE: readonly SetTemplate[] = [...sets.list, LIGHT_OR_MEDIUM]

const EMPTY = { itemType: "empty", data: null } as const

function loadoutOf(
  pieces: Partial<Record<ArmorSlotId, { set: string; weight: StandardArmorWeightId }>>
): Loadout {
  const armor = Object.fromEntries(
    armorSlots.list.map((slot) => [
      slot.id,
      {
        itemType: "armor",
        data: {
          type: slot.id,
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
          ...pieces[slot.id],
        },
      },
    ])
  ) as Loadout["armor"]
  return {
    armor,
    jewelry: { necklace: EMPTY, "ring-1": EMPTY, "ring-2": EMPTY },
    "primary-weapon-bar": { "main-hand": EMPTY, "off-hand": EMPTY },
    "backup-weapon-bar": { "main-hand": EMPTY, "off-hand": EMPTY },
  }
}

function weightAt(update: Partial<Loadout>, slot: ArmorSlotId): string | undefined {
  const item = update.armor?.[slot]
  return item?.itemType === "armor" ? item.data.weight : undefined
}

function setOf(update: Partial<Loadout>, slot: ArmorSlotId): string | undefined {
  const item = update.armor?.[slot]
  return item?.itemType === "armor" ? (item.data.set ?? undefined) : undefined
}

test("a light piece moved into a medium-only set by the bulk set change becomes medium", () => {
  const before = loadoutOf({ head: { set: "no-set", weight: "light" } })
  const after = bulkUpdateArmorSet(before, "no-set", MEDIUM_ONLY, AVAILABLE)
  expect(setOf(after, "head")).toBe(MEDIUM_ONLY)
  expect(weightAt(after, "head")).toBe("medium")
})

test("a piece whose weight the new set refuses is left with no weight", () => {
  const before = loadoutOf({ chest: { set: "no-set", weight: "heavy" } })
  const after = bulkUpdateArmorSet(before, "no-set", LIGHT_OR_MEDIUM.id, AVAILABLE)
  expect(setOf(after, "chest")).toBe(LIGHT_OR_MEDIUM.id)
  expect(weightAt(after, "chest")).toBe("no-weight")
})

test("a piece whose weight the new set allows keeps that weight", () => {
  const before = loadoutOf({ legs: { set: "no-set", weight: "light" } })
  const after = bulkUpdateArmorSet(before, "no-set", LIGHT_OR_MEDIUM.id, AVAILABLE)
  expect(weightAt(after, "legs")).toBe("light")
})

test("a piece taken out of its set keeps its weight", () => {
  const before = loadoutOf({ feet: { set: MEDIUM_ONLY, weight: "medium" } })
  const after = bulkUpdateArmorSet(before, MEDIUM_ONLY, "no-set", AVAILABLE)
  expect(setOf(after, "feet")).toBe("no-set")
  expect(weightAt(after, "feet")).toBe("medium")
})

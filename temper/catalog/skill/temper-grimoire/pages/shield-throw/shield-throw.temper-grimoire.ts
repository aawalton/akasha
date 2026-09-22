import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const shieldThrow = {
  id: "01a05fce-2956-7f43-a29a-78ffd8016e8d",
  type: "page-type/temper-grimoire",
  slug: "shield-throw",
  title: "Shield Throw",
  key: "shield-throw",
  icon: "/esoui/art/icons/item_grimoire_1hander.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  itemId: 204486,
  uespId: 3,
  skillLineId: "weapon-one-hand-and-shield",
  focusScripts: [
    "temper-focus-script/frost-damage",
    "temper-focus-script/immobilize",
    "temper-focus-script/knockback",
    "temper-focus-script/magic-damage",
    "temper-focus-script/multi-target",
    "temper-focus-script/physical-damage",
    "temper-focus-script/pull",
    "temper-focus-script/taunt",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire

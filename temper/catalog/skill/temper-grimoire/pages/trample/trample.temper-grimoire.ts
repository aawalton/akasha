import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const trample = {
  id: "01a05fce-2958-799a-a288-3c90f810712c",
  type: "page-type/temper-grimoire",
  slug: "trample",
  title: "Trample",
  key: "trample",
  icon: "/esoui/art/icons/item_grimoire_assault.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_assault.dds",
  itemId: 204495,
  uespId: 11,
  skillLineId: "temper-skill-line/alliance-war-assault",
  hashPlace: 10,
  focusScripts: [
    "temper-focus-script/dispel",
    "temper-focus-script/disease-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/knockback",
    "temper-focus-script/magic-damage",
    "temper-focus-script/physical-damage",
    "temper-focus-script/stun",
    "temper-focus-script/trauma",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
  createdAt: "2026-09-02T01:49:01.656Z",
  updatedAt: "2026-09-26T19:32:16.000Z",
} as const satisfies TemperGrimoire

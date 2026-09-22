import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const mendersBond = {
  id: "01a05fce-2956-7cb4-9f64-bd3a35a2f23b",
  type: "page-type/temper-grimoire",
  slug: "menders-bond",
  title: "Mender's Bond",
  key: "menders-bond",
  icon: "/esoui/art/icons/item_grimoire_staffresto.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  itemId: 204489,
  uespId: 6,
  skillLineId: "weapon-restoration-staff",
  focusScripts: [
    "temper-focus-script/damage-shield",
    "temper-focus-script/generate-ultimate",
    "temper-focus-script/healing",
    "temper-focus-script/immobilize",
    "temper-focus-script/magic-damage",
    "temper-focus-script/mitigation",
    "temper-focus-script/restore-resources",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire

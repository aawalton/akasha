import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const mendersBond = {
  id: "01a05fce-2956-7cb4-9f64-bd3a35a2f23b",
  pageTypeSlug: "temper-grimoire",
  slug: "menders-bond",
  title: "Mender's Bond",
  key: "menders-bond",
  icon: "/esoui/art/icons/item_grimoire_staffresto.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  itemId: 204489,
  uespId: 6,
  skillLineId: "weapon-restoration-staff",
  focusScripts: [
    "damage-shield",
    "generate-ultimate",
    "healing",
    "immobilize",
    "magic-damage",
    "mitigation",
    "restore-resources",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire

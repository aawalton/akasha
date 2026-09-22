import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const bannerBearer = {
  id: "01a05fce-2956-7821-86a3-e57677c7496c",
  type: "page-type/temper-grimoire",
  slug: "banner-bearer",
  title: "Banner Bearer",
  key: "banner-bearer",
  icon: "/esoui/art/icons/item_grimoire_support.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_support.dds",
  itemId: 204496,
  uespId: 12,
  skillLineId: "temper-skill-line/alliance-war-support",
  focusScripts: [
    "temper-focus-script/flame-damage",
    "temper-focus-script/immobilize",
    "temper-focus-script/magic-damage",
    "temper-focus-script/mitigation",
    "temper-focus-script/multi-target",
    "temper-focus-script/physical-damage",
    "temper-focus-script/restore-resources",
    "temper-focus-script/shock-damage",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire

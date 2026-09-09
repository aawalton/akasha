import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const bannerBearer = {
  id: "01a05fce-2956-7821-86a3-e57677c7496c",
  pageTypeSlug: "temper-grimoire",
  slug: "banner-bearer",
  title: "Banner Bearer",
  key: "banner-bearer",
  icon: "/esoui/art/icons/item_grimoire_support.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_support.dds",
  itemId: 204496,
  uespId: 12,
  skillLineId: "alliance-war-support",
  focusScripts: [
    "flame-damage",
    "immobilize",
    "magic-damage",
    "mitigation",
    "multi-target",
    "physical-damage",
    "restore-resources",
    "shock-damage",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire

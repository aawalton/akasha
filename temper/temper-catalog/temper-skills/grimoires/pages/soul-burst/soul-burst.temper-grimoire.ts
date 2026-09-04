import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const soulBurst = {
  id: "01a05fce-2957-7ae5-95ec-65da7a32b304",
  pageTypeSlug: "temper-grimoire",
  slug: "soul-burst",
  title: "Soul Burst",
  key: "soul-burst",
  icon: "/esoui/art/icons/item_grimoire_soulmagic2.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  itemId: 204492,
  uespId: 8,
  skillLineId: "world-soul-magic",
  focusScripts: [
    "bleed-damage",
    "damage-shield",
    "disease-damage",
    "flame-damage",
    "frost-damage",
    "healing",
    "immobilize",
    "magic-damage",
    "physical-damage",
    "pull",
    "shock-damage",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire

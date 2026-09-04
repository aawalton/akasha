import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const intellectSorceryMagickaRestoreStealthDetection = {
  id: "019e21f6-4061-7f2f-80f6-a8d7e436aefd",
  pageTypeSlug: "temper-potion-crafted",
  slug: "intellect-sorcery-magicka-restore-stealth-detection",
  title: "Essence of Spell Power",
  key: "intellect-sorcery-magicka-restore-stealth-detection",
  description: "Grants Detection, Restore Magicka, Increase Spell Power.",
  icon: "/esoui/art/icons/consumable_potion_006_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Chaurus Egg", "Corn Flower", "Lady's Smock"],
    },
    {
      names: ["Corn Flower", "Lady's Smock", "Torchbug Thorax"],
    },
    {
      names: ["Corn Flower", "Lady's Smock", "White Cap"],
    },
    {
      names: ["Corn Flower", "Lady's Smock", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

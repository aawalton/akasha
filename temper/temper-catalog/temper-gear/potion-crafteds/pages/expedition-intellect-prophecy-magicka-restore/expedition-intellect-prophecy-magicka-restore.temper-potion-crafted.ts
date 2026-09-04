import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionIntellectProphecyMagickaRestore = {
  id: "019e21f6-406d-7179-93dd-5091240957e8",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-intellect-prophecy-magicka-restore",
  title: "Essence of Spell Critical",
  key: "expedition-intellect-prophecy-magicka-restore",
  description: "Grants Restore Magicka, Speed, Spell Critical.",
  icon: "/esoui/art/icons/consumable_potion_013_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon Rheum", "Lady's Smock", "Namira's Rot"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionVitalityVanish = {
  id: "019e21f6-406a-7fbe-ac10-35674cfbae81",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-vitality-vanish",
  title: "Essence of Speed",
  key: "expedition-vitality-vanish",
  description: "Grants Invisible, Vitality, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon's Bile", "Namira's Rot", "Powdered Mother of Pearl"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

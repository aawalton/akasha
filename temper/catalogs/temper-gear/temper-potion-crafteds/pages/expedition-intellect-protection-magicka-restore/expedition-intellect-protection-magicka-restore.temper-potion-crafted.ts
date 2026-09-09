import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionIntellectProtectionMagickaRestore = {
  id: "019e21f6-406d-7fb4-aaca-8547f12a16b8",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-intellect-protection-magicka-restore",
  title: "Essence of Magicka",
  key: "expedition-intellect-protection-magicka-restore",
  description: "Grants Speed, Restore Magicka, Protection.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon Rheum", "Powdered Mother of Pearl", "Vile Coagulant"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

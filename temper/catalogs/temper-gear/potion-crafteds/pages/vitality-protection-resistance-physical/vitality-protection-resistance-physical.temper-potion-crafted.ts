import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const vitalityProtectionResistancePhysical = {
  id: "019e21f6-4045-7f82-bf12-19cb6068b0b6",
  pageTypeSlug: "temper-potion-crafted",
  slug: "vitality-protection-resistance-physical",
  title: "Essence of Vitality",
  key: "vitality-protection-resistance-physical",
  description: "Grants Vitality, Increase Physical Resistance, Protection.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Butterfly Wing", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Dragon's Bile", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Fleshfly Larva", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Imp Stool", "Powdered Mother of Pearl"],
    },
    {
      names: ["Beetle Scuttle", "Mountain Flower", "Powdered Mother of Pearl"],
    },
    {
      names: ["Beetle Scuttle", "Mudcrab Chitin", "Powdered Mother of Pearl"],
    },
    {
      names: ["Beetle Scuttle", "Mudcrab Chitin", "Torchbug Thorax"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

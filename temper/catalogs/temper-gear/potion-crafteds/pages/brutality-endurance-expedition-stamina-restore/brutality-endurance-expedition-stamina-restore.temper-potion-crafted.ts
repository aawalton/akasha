import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const brutalityEnduranceExpeditionStaminaRestore = {
  id: "019e21f6-4055-70c3-bd32-673eadc5dbe7",
  pageTypeSlug: "temper-potion-crafted",
  slug: "brutality-endurance-expedition-stamina-restore",
  title: "Essence of Weapon Power",
  key: "brutality-endurance-expedition-stamina-restore",
  description: "Grants Speed, Restore Stamina, Increase Weapon Power.",
  icon: "/esoui/art/icons/consumable_potion_005_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Dragon Rheum", "Dragonthorn"],
    },
    {
      names: ["Blessed Thistle", "Dragonthorn", "Namira's Rot"],
    },
    {
      names: ["Blessed Thistle", "Dragonthorn", "Powdered Mother of Pearl"],
    },
    {
      names: ["Blessed Thistle", "Dragonthorn", "Scrib Jelly"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceExpeditionHealthRestoreStaminaRestore = {
  id: "019e21f6-4053-7b01-941e-60c44e62ed2c",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-expedition-health-restore-stamina-restore",
  title: "Essence of Stamina",
  key: "endurance-expedition-health-restore-stamina-restore",
  description: "Grants Restore Stamina, Speed, Lingering Health.",
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Dragon's Blood", "Powdered Mother of Pearl"],
    },
    {
      names: ["Blessed Thistle", "Dragon's Blood", "Scrib Jelly"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceFortitudeIntellectHealthRestoreMagickaRestoreStaminaRestore = {
  id: "019e21f6-404e-775b-9146-bebdd4e0704b",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore",
  title: "Essence of Health",
  key: "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore",
  description: "Grants Restore Stamina, Restore Health, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Bugloss", "Columbine"],
    },
    {
      names: ["Bugloss", "Chaurus Egg", "Columbine"],
    },
    {
      names: ["Bugloss", "Columbine", "Dragon's Blood"],
    },
    {
      names: ["Bugloss", "Columbine", "Dragonthorn"],
    },
    {
      names: ["Bugloss", "Columbine", "Mountain Flower"],
    },
    {
      names: ["Columbine", "Corn Flower", "Mountain Flower"],
    },
    {
      names: ["Columbine", "Dragon Rheum", "Mountain Flower"],
    },
    {
      names: ["Columbine", "Lady's Smock", "Mountain Flower"],
    },
    {
      names: ["Columbine", "Mountain Flower", "Vile Coagulant"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

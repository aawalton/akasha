import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeIntellectHealthRestoreMagickaRestoreResistanceSpell = {
  id: "019e21f6-405a-7332-9b71-6af20ac7bfbf",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-intellect-health-restore-magicka-restore-resistance-spell",
  title: "Essence of Health",
  key: "fortitude-intellect-health-restore-magicka-restore-resistance-spell",
  description: "Grants Increase Spell Resistance, Restore Health, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Bugloss", "Clam Gall", "Columbine"],
    },
    {
      names: ["Bugloss", "Columbine", "Mudcrab Chitin"],
    },
    {
      names: ["Bugloss", "Columbine", "White Cap"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted

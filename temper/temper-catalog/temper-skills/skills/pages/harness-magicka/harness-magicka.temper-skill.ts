import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const harnessMagicka = {
  id: "019e6238-c2c4-7cf0-b15e-a52fad48e00c",
  pageTypeSlug: "temper-skill",
  slug: "harness-magicka",
  title: "Harness Magicka",
  key: "harness-magicka",
  baseName: "Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs 3718 damage for 6 seconds. Damage shield strength capped at 50% of your Max Health.\\n\\nWhile active, whenever the shield absorbs damage, you restore 229 Magicka. Each piece of Light Armor worn increases the Magicka restored by 33%. This effect can occur up to 3 times."',
  icon: "/esoui/art/icons/ability_armor_003_b.dds",
  esoSkillId: 41121,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 2,
  rank: 12,
  skillLineId: "armor-light-armor",
  skillType: "active",
  subcategoryId: "armor-light-armor",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulHarvest = {
  id: "019e6245-a739-7e88-9375-971c04c9ee52",
  pageTypeSlug: "temper-skill",
  slug: "soul-harvest",
  title: "Soul Harvest",
  key: "soul-harvest",
  baseName: "Death Stroke",
  description:
    '"Ravage an enemy with a spinning attack, dealing 3718 Magic Damage and increasing your damage against them by 20% for 8 seconds.\\n\\nAlso afflicts the enemy with Major Defile, reducing their healing received and damage shield strength by 12%.\\n\\nWhile slotted on either bar, any time you kill an enemy you gain 10 Ultimate."',
  icon: "/esoui/art/icons/ability_nightblade_007_b.dds",
  esoSkillId: 37545,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill

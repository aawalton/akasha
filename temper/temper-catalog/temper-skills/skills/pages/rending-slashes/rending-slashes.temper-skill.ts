import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rendingSlashes = {
  id: "019e6226-010d-723a-850d-924092526e23",
  pageTypeSlug: "temper-skill",
  slug: "rending-slashes",
  title: "Rending Slashes",
  key: "rending-slashes",
  baseName: "Twin Slashes",
  description:
    '"Slice an enemy with both weapons to cause deep lacerations, dealing 718 Bleed Damage with each weapon and causing them to bleed for an additional 3470 Bleed Damage over 20 seconds.\\n\\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\\n\\nYou also reduce their Movement Speed by 30% for 4 seconds."',
  icon: "/esoui/art/icons/ability_dualwield_001_a.dds",
  esoSkillId: 40675,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

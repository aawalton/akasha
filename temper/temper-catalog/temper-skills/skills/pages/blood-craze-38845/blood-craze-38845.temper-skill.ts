import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodCraze38845 = {
  id: "019e6f53-9f45-785d-822f-6fc15b780376",
  pageTypeSlug: "temper-skill",
  slug: "blood-craze-38845",
  title: "Blood Craze",
  key: "blood-craze-38845",
  baseName: "Twin Slashes",
  description:
    '"Slice an enemy with both weapons to cause deep lacerations, dealing |cffffff2018|r Bleed Damage with each weapon and causing them to bleed for an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds.\\n\\nYou heal for |cffffff1131|r Health anytime this ability deals damage."',
  icon: "/esoui/art/icons/ability_dualwield_001_b.dds",
  esoSkillId: 38845,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill

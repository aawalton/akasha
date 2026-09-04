import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hearthfire = {
  id: "019e6f53-a2fd-71ff-9e5c-fb2b99dcad3a",
  pageTypeSlug: "temper-skill",
  slug: "hearthfire",
  title: "Hearthfire",
  key: "hearthfire",
  baseName: "Hearthfire",
  description:
    '"Throw out a kindled flame, filling a large area with warmth for |cffffff15|r seconds. This fire heals you and your allies at the target location for |cffffff1369|r Health every |cffffff1|r second.\\n\\nHealed targets gain Minor Fortitude and Minor Heroism while inside, increasing Health Recovery by |cffffff15|r% and generating |cffffff1|r Ultimate every |cffffff1.5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_016.dds",
  esoSkillId: 29059,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill

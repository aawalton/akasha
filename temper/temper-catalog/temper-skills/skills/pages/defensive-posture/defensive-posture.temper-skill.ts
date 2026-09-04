import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const defensivePosture = {
  id: "019e6f53-a0ae-7584-992d-ab635c96d9fb",
  pageTypeSlug: "temper-skill",
  slug: "defensive-posture",
  title: "Defensive Posture",
  key: "defensive-posture",
  baseName: "Defensive Posture",
  description:
    '"Bolster your defenses, gaining a damage shield that absorbs up to |cffffff7026|r damage for |cffffff6|r seconds.  This portion of the ability scales off your Max Health.\\n\\nYou reflect the next harmful direct damage projectile cast at you. This effect can occur once per cast."',
  icon: "/esoui/art/icons/ability_1handed_004.dds",
  esoSkillId: 28727,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorbMissile = {
  id: "019e6226-00cb-76ab-9ada-41c2cc280f2d",
  pageTypeSlug: "temper-skill",
  slug: "absorb-missile",
  title: "Absorb Missile",
  key: "absorb-missile",
  baseName: "Defensive Posture",
  description:
    '"Bolster your defenses, gaining a damage shield that absorbs up to 4958 damage for 6 seconds.  \\n\\nWhile the shield persists, you are healed for 2560 Health the next time a harmful direct damage projectile hits you. This effect can occur once per cast.\\n\\nThis ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_1handed_004_b.dds",
  esoSkillId: 41380,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill

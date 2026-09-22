import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reverseSlash = {
  id: "019e6f53-a646-7d61-968c-aece92ac4624",
  type: "page-type/temper-skill",
  slug: "reverse-slash",
  title: "Reverse Slash",
  key: "reverse-slash",
  baseName: "Reverse Slash",
  description:
    '"Shift your grip and strike an enemy down, dealing |cffffff4036|r Physical Damage. Deals up to |cffffff300|r% more damage to enemies with less than |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_2handed_004.dds",
  esoSkillId: 28302,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill

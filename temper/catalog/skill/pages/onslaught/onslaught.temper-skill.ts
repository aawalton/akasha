import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const onslaught = {
  id: "019e6226-0100-7a7f-affb-1a3dcd4b676c",
  type: "page-type/temper-skill",
  slug: "onslaught",
  title: "Onslaught",
  key: "onslaught",
  baseName: "Berserker Strike",
  description:
    "Strike at an enemy with a vicious blow, dealing 3485 Physical Damage to them and all nearby enemies.\n\nThis attack ignores the target's Resistance and grants you Physical and Spell Penetration for your direct damage attacks equal to 100% of the amount ignored from the initial target for 5 seconds.",
  icon: "/esoui/art/icons/ability_2handed_006_a.dds",
  esoSkillId: 86284,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 863,
  createdAt: "2026-05-26T02:38:38.336Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 100% (Constant)",
    "<<3>> = 100% (Constant)",
    "<<4>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill

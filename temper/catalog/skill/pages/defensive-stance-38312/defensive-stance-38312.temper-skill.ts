import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const defensiveStance38312 = {
  id: "019e6f53-a0b4-70b8-b18c-9e172d835498",
  type: "page-type/temper-skill",
  slug: "defensive-stance-38312",
  title: "Defensive Stance",
  key: "defensive-stance-38312",
  baseName: "Defensive Posture",
  description:
    "Bolster your defenses, gaining a damage shield that absorbs up to |cffffff7027|r damage for |cffffff6|r seconds. This portion of the ability scales off your Max Health.\n\nYou reflect the next harmful direct damage projectile cast at you, once per cast.\n\nWhile slotted and you have a shield equipped, the amount of damage you can block is increased by |cffffff10|r% and the cost of blocking is reduced by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_1handed_004_a.dds",
  esoSkillId: 38312,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 349,
  createdAt: "2026-05-28T16:03:32.148Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3099 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill

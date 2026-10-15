import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shieldedAssault = {
  id: "019e6226-0112-7f37-a7e3-844ecfb5fbf0",
  type: "page-type/temper-skill",
  slug: "shielded-assault",
  title: "Shielded Assault",
  key: "shielded-assault",
  baseName: "Shield Charge",
  description:
    "Rush an enemy and ram them, dealing 1393 Physical Damage and stunning them for 3 seconds.\n\nYou gain a damage shield after the attack, absorbing 5121 damage for 6 seconds. This portion of the ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_1handed_003_a.dds",
  esoSkillId: 41526,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 1169,
  createdAt: "2026-05-26T02:38:38.354Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 0.5 seconds (Constant)",
    "<<4>> = 0.320086 Health - 0.229239 (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<5>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill

import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cephaliarchsFlail = {
  id: "019e6245-a613-7e09-9acd-4a5fb760dc4c",
  type: "page-type/temper-skill",
  slug: "cephaliarchs-flail",
  title: "Cephaliarch's Flail",
  key: "cephaliarchs-flail",
  baseName: "Abyssal Impact",
  description:
    "Infuse your arm with abyssal magic to form tentacles that lash out at your foes dealing 1939 Physical Damage and generating Crux. Enemies are immobilized for 3 seconds and marked with Abyssal Ink for 20 seconds.\n\nIf an enemy is hit, you for heal for 1000 Health, once per cast.\n\nYou deal 5% increased damage to enemies drenched in Abyssal Ink.",
  icon: "/esoui/art/icons/ability_arcanist_003_a.dds",
  esoSkillId: 40183006,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 195,
  createdAt: "2026-05-26T03:13:12.211Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.08625 MaxStat + 0.905625 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, 0.3s cooldown, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.0445071 MaxStat + 0.468441 MaxPower - 2.3715 (Ultimate, ratio = 10.53, Heal, SingleTarget, Direct, R2 = 0.999998)",
    "<<5>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill

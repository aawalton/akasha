import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cephaliarchSFlail = {
  id: "019e6f53-9fc4-7e6c-a107-763cf4dfad95",
  type: "page-type/temper-skill",
  slug: "cephaliarch-s-flail",
  title: "Cephaliarch's Flail",
  key: "cephaliarch-s-flail",
  baseName: "Abyssal Impact",
  description:
    "Infuse your arm with abyssal magic to form tentacles that lash out at your foes dealing |cffffff7125|r Physical Damage and generating Crux. Enemies are immobilized for |cffffff3|r seconds and marked with Abyssal Ink for |cffffff20|r seconds.\n\nIf an enemy is hit, you for heal for |cffffff3150|r Health, once per cast.\n\nYou deal |cffffff5|r% increased damage to enemies drenched in Abyssal Ink.",
  icon: "/esoui/art/icons/ability_arcanist_003_a.dds",
  esoAbilityId: 183006,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 194,
  createdAt: "2026-05-28T16:03:31.908Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
  equations: [
    "<<1>> = 0.08625 MaxStat + 0.905622 MaxPower (Ultimate, Dmg, Physical, AOE, Direct, Melee, 0.3s cooldown, single precision)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.04312258 MaxStat + 0.452809 MaxPower (Ultimate, Heal, SingleTarget, Direct, rank IV)",
    "<<5>> = 5% (Constant)",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every reading of the damage allows a stat coefficient from 0.086247 to 0.086255.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every reading of the damage allows a power coefficient from 0.9056215 to below 0.9056245.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The damage takes 0.08625 and 0.905622, the shortest decimals inside those ranges.",
    },
  ],
} as const satisfies TemperSkill

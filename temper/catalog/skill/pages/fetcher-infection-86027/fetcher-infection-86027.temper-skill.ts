import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fetcherInfection86027 = {
  id: "019e6f53-a1f9-7ab0-a0d5-e3f60e5c5a9c",
  type: "page-type/temper-skill",
  slug: "fetcher-infection-86027",
  title: "Fetcher Infection",
  key: "fetcher-infection-86027",
  baseName: "Swarm",
  description:
    "Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing |cffffff15730|r Magic Damage over |cffffff20|r seconds.\n\nEvery second cast of this ability deals |cffffff60|r% increased damage.\n\nThe fetcherflies rip through the enemy's flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_warden_014_a.dds",
  esoSkillId: 86027,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 510,
  createdAt: "2026-05-28T16:03:32.473Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 75% (Constant)",
    "<<4>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill

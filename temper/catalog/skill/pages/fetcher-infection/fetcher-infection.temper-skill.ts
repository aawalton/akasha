import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fetcherInfection = {
  id: "019e6245-a682-7356-9e5a-8e9f7c9356a5",
  type: "page-type/temper-skill",
  slug: "fetcher-infection",
  title: "Fetcher Infection",
  key: "fetcher-infection",
  baseName: "Swarm",
  description:
    "Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing 4785 Magic Damage over 20 seconds.\n\nEvery second cast of this ability deals 60% increased damage.\n\nThe fetcherflies rip through the enemy's flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by 5%.",
  icon: "/esoui/art/icons/ability_warden_014_a.dds",
  esoSkillId: 86030,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 509,
  createdAt: "2026-05-26T03:13:12.322Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999997)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 75% (Constant)",
    "<<4>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill

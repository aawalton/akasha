import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const growingSwarm86031 = {
  id: "019e6f53-a2bf-70ee-99f6-964f9ff360fa",
  type: "page-type/temper-skill",
  slug: "growing-swarm-86031",
  title: "Growing Swarm",
  key: "growing-swarm-86031",
  baseName: "Swarm",
  description:
    "Unleash a swarm of fetcherflies to relentlessly attack an enemy, causing them to bleed for |cffffff15730|r Bleed Damage over |cffffff20|r seconds. \n\nThe fetcherflies rip through the original enemy's flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by |cffffff5|r%.\n\nEnemies near the carrier take |cffffff1516|r Bleed Damage every |cffffff2|r seconds for the duration.\n\nYou can only have one Growing Swarm active at a time.",
  icon: "/esoui/art/icons/ability_warden_014_b.dds",
  esoSkillId: 86031,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 585,
  createdAt: "2026-05-28T16:03:32.671Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Bleed, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 0.0187221 MaxStat + 0.197107 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Bleed, AOE, DOT, 2s tick, R2 = 0.999998)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = Growing Swarm (Constant)",
  ],
} as const satisfies TemperSkill

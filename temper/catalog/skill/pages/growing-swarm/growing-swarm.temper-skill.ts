import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const growingSwarm = {
  id: "019e6245-a699-7c6f-948b-096a1dca339a",
  type: "page-type/temper-skill",
  slug: "growing-swarm",
  title: "Growing Swarm",
  key: "growing-swarm",
  baseName: "Swarm",
  description:
    "Unleash a swarm of fetcherflies to relentlessly attack an enemy, causing them to bleed for 4785 Bleed Damage over 20 seconds. \n\nThe fetcherflies rip through the original enemy's flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by 5%.\n\nEnemies near the carrier take 435 Bleed Damage every 2 seconds for the duration.\n\nYou can only have one Growing Swarm active at a time.",
  icon: "/esoui/art/icons/ability_warden_014_b.dds",
  esoSkillId: 86034,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 584,
  createdAt: "2026-05-26T03:13:12.345Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Dmg, Bleed, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999997)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Dmg, Bleed, AOE, DOT, 2s tick, R2 = 0.999997)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = Growing Swarm (Constant)",
  ],
} as const satisfies TemperSkill

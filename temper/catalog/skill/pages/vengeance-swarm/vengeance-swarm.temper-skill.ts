import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceSwarm = {
  id: "019e6f53-a99b-7d3d-8794-6502eca673d7",
  type: "page-type/temper-skill",
  slug: "vengeance-swarm",
  title: "Vengeance Swarm",
  key: "vengeance-swarm",
  baseName: "Vengeance Swarm",
  description:
    "Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing |cffffff17010|r Magic Damage over |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_warden_014.dds",
  esoSkillId: 238016,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 1573,
  createdAt: "2026-05-28T16:03:34.427Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 17010 Magic Damage (Constant)", "<<2>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill

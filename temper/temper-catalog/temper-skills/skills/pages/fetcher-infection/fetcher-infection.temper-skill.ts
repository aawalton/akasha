import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fetcherInfection = {
  id: "019e6245-a682-7356-9e5a-8e9f7c9356a5",
  pageTypeSlug: "temper-skill",
  slug: "fetcher-infection",
  title: "Fetcher Infection",
  key: "fetcher-infection",
  baseName: "Swarm",
  description:
    '"Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing 4785 Magic Damage over 20 seconds.\\n\\nEvery second cast of this ability deals 60% increased damage.\\n\\nThe fetcherflies rip through the enemy\'s flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by 5%."',
  icon: "/esoui/art/icons/ability_warden_014_a.dds",
  esoSkillId: 86030,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill

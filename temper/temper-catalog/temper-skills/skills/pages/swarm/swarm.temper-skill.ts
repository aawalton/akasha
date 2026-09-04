import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const swarm = {
  id: "019e6f53-a803-72c1-a6ca-95d20359a3d3",
  pageTypeSlug: "temper-skill",
  slug: "swarm",
  title: "Swarm",
  key: "swarm",
  baseName: "Swarm",
  description:
    '"Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds.  \\n\\nThe fetcherflies rip through the enemy\'s flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_warden_014.dds",
  esoSkillId: 86023,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill

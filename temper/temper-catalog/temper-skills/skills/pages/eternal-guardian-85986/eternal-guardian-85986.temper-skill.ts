import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eternalGuardian85986 = {
  id: "019e6f53-a1a3-74e3-97c1-322a7dc71159",
  pageTypeSlug: "temper-skill",
  slug: "eternal-guardian-85986",
  title: "Eternal Guardian",
  key: "eternal-guardian-85986",
  baseName: "Feral Guardian",
  description:
    '"Rouse a grizzly to fight by your side. The grizzly swipes an enemy, dealing |cffffff2084|r Magic Damage, and sometimes swipes all enemies in front of it, dealing |cffffff8814|r Magic Damage and stunning them for |cffffff2|r seconds.\\n\\nOnce summoned you can activate Guardian\'s Wrath for |cffffff79|r Ultimate, causing the grizzly to maul an enemy for |cffffff11681|r Magic Damage. Deals |cffffff150|r% more damage to enemies below |cffffff25|r% Health.\\n\\n The grizzly respawns when killed, once per minute."',
  icon: "/esoui/art/icons/ability_warden_018_b.dds",
  esoSkillId: 85986,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "ultimate",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill

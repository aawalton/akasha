import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wildGuardian = {
  id: "019e6245-a76b-77f4-b7fd-d6380cde5a01",
  pageTypeSlug: "temper-skill",
  slug: "wild-guardian",
  title: "Wild Guardian",
  key: "wild-guardian",
  baseName: "Feral Guardian",
  description:
    '"Rouse a grizzly to fight by your side. The grizzly swipes at an enemy, dealing 659 Bleed Damage, and sometimes swipes all enemies in front of it, dealing 2640 Bleed Damage and stunning them for 2 seconds.\\n\\nOnce summoned you can activate Guardian\'s Savagery for 75 Ultimate, to maul an enemy for 3697 Bleed Damage. Deals 100% more damage to enemies below 25% Health.\\n\\nThe damage has a higher chance to apply the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_warden_018_c.dds",
  esoSkillId: 85993,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "ultimate",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill

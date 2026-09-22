import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spellWall = {
  id: "019e6226-0116-73b1-8a13-10b5b07e150f",
  type: "page-type/temper-skill",
  slug: "spell-wall",
  title: "Spell Wall",
  key: "spell-wall",
  baseName: "Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost and reflect all projectiles cast at you for 7 seconds."',
  icon: "/esoui/art/icons/ability_1handed_006_a.dds",
  esoSkillId: 86333,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill

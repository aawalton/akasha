import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const concealedWeapon25267 = {
  id: "019e6f53-a00c-7e9e-b9d9-2da77ff44993",
  pageTypeSlug: "temper-skill",
  slug: "concealed-weapon-25267",
  title: "Concealed Weapon",
  key: "concealed-weapon-25267",
  baseName: "Veiled Strike",
  description:
    '"Slash an enemy, dealing |cffffff8885|r Magic Damage. \\n\\nIf you strike an enemy from their flank you set them Off Balance.\\n\\nWhen you leave Sneak or invisibility while in combat, increase your damage done with this ability by |cffffff10|r% for |cffffff15|r seconds.\\n\\nWhile slotted on either bar, you gain Minor Expedition, increasing your Movement Speed by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_nightblade_002_b.dds",
  esoSkillId: 25267,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill

import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const perfectScion = {
  id: "019e6251-4cd5-79c6-a7ff-0b802b7de2a0",
  pageTypeSlug: "temper-skill",
  slug: "perfect-scion",
  title: "Perfect Scion",
  key: "perfect-scion",
  baseName: "Blood Scion",
  description:
    '"Transform into a monstrous creature of the night, instantly healing to full Health.\\n\\nWhile transformed, your Max Health, Magicka, and Stamina are increased by 10000, you heal for 15% of all damage you deal, and you can see enemies through walls. \\n\\nYou also ascend to Vampire Stage 5, which grants all the benefits of Vampire Stage 4 with none of the drawbacks."',
  icon: "/esoui/art/icons/ability_u26_vampire_06_b.dds",
  esoSkillId: 41937,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "ultimate",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill

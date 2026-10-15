import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const perfectScion = {
  id: "019e6251-4cd5-79c6-a7ff-0b802b7de2a0",
  type: "page-type/temper-skill",
  slug: "perfect-scion",
  title: "Perfect Scion",
  key: "perfect-scion",
  baseName: "Blood Scion",
  description:
    "Transform into a monstrous creature of the night, instantly healing to full Health.\n\nWhile transformed, your Max Health, Magicka, and Stamina are increased by 10000, you heal for 15% of all damage you deal, and you can see enemies through walls. \n\nYou also ascend to Vampire Stage 5, which grants all the benefits of Vampire Stage 4 with none of the drawbacks.",
  icon: "/esoui/art/icons/ability_u26_vampire_06_b.dds",
  esoSkillId: 41937,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 879,
  createdAt: "2026-05-26T03:25:55.797Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10000 (Constant)", "<<2>> = 15% (Constant)"],
} as const satisfies TemperSkill

import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const perfectScion38931 = {
  id: "019e6f53-a4e9-76fd-81c6-633a51cc6ff2",
  type: "page-type/temper-skill",
  slug: "perfect-scion-38931",
  title: "Perfect Scion",
  key: "perfect-scion-38931",
  baseName: "Blood Scion",
  description:
    "Transform into a monstrous creature of the night, instantly healing to full Health.\n\nWhile transformed, your Max Health, Magicka, and Stamina are increased by |cffffff10000|r, you heal for |cffffff15|r% of all damage you deal, and you can see enemies through walls. \n\nYou also ascend to Vampire Stage 5, which grants all the benefits of Vampire Stage 4 with none of the drawbacks.",
  icon: "/esoui/art/icons/ability_u26_vampire_06_b.dds",
  esoSkillId: 38931,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 880,
  createdAt: "2026-05-28T16:03:33.225Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10000 (Constant)", "<<2>> = 15% (Constant)"],
} as const satisfies TemperSkill

import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swordAndBoard29397 = {
  id: "019e6f53-a80e-7637-8958-8072c0a1e232",
  type: "page-type/temper-skill",
  slug: "sword-and-board-29397",
  title: "Sword and Board",
  key: "sword-and-board-29397",
  baseName: "Sword and Board",
  description:
    "Increases your Weapon and Spell Damage by |cffffff3|r% and the amount of damage you can block by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_armor_014.dds",
  esoSkillId: 29397,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/passive",
  hashPlace: 1319,
  createdAt: "2026-05-28T16:03:34.030Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)", "<<2>> = 10% (Constant)"],
} as const satisfies TemperSkill

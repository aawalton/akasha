import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sacredGround = {
  id: "019e6245-a720-76c1-b776-2f3f12677730",
  type: "page-type/temper-skill",
  slug: "sacred-ground",
  title: "Sacred Ground",
  key: "sacred-ground",
  baseName: "Sacred Ground",
  description:
    "While standing in your own Cleansing Ritual, Rune Focus, or Rite of Passage area effects and for up to 4 seconds after leaving them you gain Minor Mending, increasing your healing done by 8%.\n\nAlso increases the amount of damage you can block by 10% for the duration.",
  icon: "/esoui/art/icons/ability_templar_014.dds",
  esoSkillId: 45207,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 1119,
  createdAt: "2026-05-26T03:13:12.480Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 8% (Constant)", "<<2>> = 10% (Constant)"],
} as const satisfies TemperSkill

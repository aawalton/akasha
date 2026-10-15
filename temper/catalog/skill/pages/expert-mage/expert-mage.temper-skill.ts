import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const expertMage = {
  id: "019e6245-a67a-703d-9cd0-5d7991201252",
  type: "page-type/temper-skill",
  slug: "expert-mage",
  title: "Expert Mage",
  key: "expert-mage",
  baseName: "Expert Mage",
  description:
    "Increases your Weapon and Spell Damage by 108 for each Sorcerer ability slotted.\n\nCurrent bonus: 0.",
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 45195,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 480,
  createdAt: "2026-05-26T03:13:12.314Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 108 (Constant)",
    "<<2>> = 108 Sorcerer (Sorcerer Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill

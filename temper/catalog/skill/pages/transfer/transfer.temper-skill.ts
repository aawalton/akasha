import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const transfer = {
  id: "019e6245-a755-7ac1-9bc7-34e14c111f05",
  type: "page-type/temper-skill",
  slug: "transfer",
  title: "Transfer",
  key: "transfer",
  baseName: "Transfer",
  description:
    "Casting a Siphoning ability while in combat generates 2 Ultimate. This effect can occur once every 4 seconds.",
  icon: "/esoui/art/icons/passive_sorcerer_002.dds",
  esoSkillId: 45145,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 1360,
  createdAt: "2026-05-26T03:13:12.533Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2 (Constant)", "<<2>> = 4 seconds (Constant)"],
} as const satisfies TemperSkill

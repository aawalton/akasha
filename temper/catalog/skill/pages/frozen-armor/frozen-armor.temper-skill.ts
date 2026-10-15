import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const frozenArmor = {
  id: "019e6245-a68a-7a79-8921-198435ed8a32",
  type: "page-type/temper-skill",
  slug: "frozen-armor",
  title: "Frozen Armor",
  key: "frozen-armor",
  baseName: "Frozen Armor",
  description:
    "Increases your Physical and Spell Resistance by 1240 for each Winter's Embrace ability slotted.\n\nCurrent Bonus: 0.",
  icon: "/esoui/art/icons/passive_warden_001.dds",
  esoSkillId: 86190,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 543,
  createdAt: "2026-05-26T03:13:12.330Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1240 (Constant)",
    "<<2>> = 1240 WintersEmbrace (Winter's Embrace Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill

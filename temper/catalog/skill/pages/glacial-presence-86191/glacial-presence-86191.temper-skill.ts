import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const glacialPresence86191 = {
  id: "019e6f53-a28d-7b19-8b36-3477350036d0",
  type: "page-type/temper-skill",
  slug: "glacial-presence-86191",
  title: "Glacial Presence",
  key: "glacial-presence-86191",
  baseName: "Glacial Presence",
  description:
    "Increases your chance to apply the Chilled status effect by |cffffff125|r% and increases its damage done by |cffffff209|r. The damage increasing effect scales off the higher of your Weapon or Spell Damage.",
  icon: "/esoui/art/icons/passive_warden_002.dds",
  esoSkillId: 86191,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/passive",
  hashPlace: 568,
  createdAt: "2026-05-28T16:03:32.621Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 125% (Constant)",
    "<<2>> = + 0.05275 MaxPower (Ultimate, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill

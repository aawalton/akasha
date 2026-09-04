import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const glacialPresence = {
  id: "019e6245-a692-7c7c-9ad4-f1056b665456",
  pageTypeSlug: "temper-skill",
  slug: "glacial-presence",
  title: "Glacial Presence",
  key: "glacial-presence",
  baseName: "Glacial Presence",
  description:
    '"Increases your chance to apply the Chilled status effect by 250% and increases its damage by 105. The damage increasing effect scales off the higher of your Weapon or Spell Damage."',
  icon: "/esoui/art/icons/passive_warden_002.dds",
  esoSkillId: 86192,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill

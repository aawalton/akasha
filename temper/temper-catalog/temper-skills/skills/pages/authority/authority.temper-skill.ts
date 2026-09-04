import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const authority = {
  id: "019e6251-4c89-70e9-880f-8140153f0624",
  pageTypeSlug: "temper-skill",
  slug: "authority",
  title: "Authority",
  key: "authority",
  baseName: "Authority",
  description:
    '"Increases your Ultimate generation while in your campaign, depending on how many Home Keeps you own.\\n\\n1 or less Keep: 50%\\n2 Keeps: 60%\\n3 Keeps: 70%\\n4 Keeps: 80%\\n5 Keeps: 90%\\n6 Keeps: 100%"',
  icon: "/esoui/art/icons/ability_sorcerer_056.dds",
  esoSkillId: 39630,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-emperor",
  skillType: "passive",
  subcategoryId: "alliance-war-emperor",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill

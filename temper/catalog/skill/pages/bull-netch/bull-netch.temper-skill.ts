import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bullNetch = {
  id: "019e6245-a608-7dca-b04c-efb5af257cc3",
  type: "page-type/temper-skill",
  slug: "bull-netch",
  title: "Bull Netch",
  key: "bull-netch",
  baseName: "Betty Netch",
  description:
    "Call a bull netch to your side, which restores 4416 Stamina to you over 25 seconds and grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%.\n\nEvery 5 seconds, the netch removes 1 negative effect from you. If no negative effects are removed you instead increase your damage done by 5% for 5 seconds",
  icon: "/esoui/art/icons/ability_warden_017_b.dds",
  esoSkillId: 86061,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 171,
  createdAt: "2026-05-26T03:13:12.200Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4416 (Constant)",
    "<<2>> = 25 seconds (Constant)",
    "<<3>> = 20% (Constant)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 5% (Constant)",
    "<<6>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill

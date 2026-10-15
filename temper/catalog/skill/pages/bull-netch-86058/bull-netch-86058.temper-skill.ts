import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bullNetch86058 = {
  id: "019e6f53-9f9a-7264-beba-1ee393eb884b",
  type: "page-type/temper-skill",
  slug: "bull-netch-86058",
  title: "Bull Netch",
  key: "bull-netch-86058",
  baseName: "Betty Netch",
  description:
    "Call a bull netch to your side, which restores |cffffff4992|r Stamina to you over |cffffff25|r seconds and grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%.\n\nEvery |cffffff5|r seconds, the netch removes |cffffff1|r negative effect from you. If no negative effects are removed you instead increase your damage done by |cffffff5|r% for |cffffff5|r seconds",
  icon: "/esoui/art/icons/ability_warden_017_b.dds",
  esoSkillId: 86058,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 172,
  createdAt: "2026-05-28T16:03:31.866Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4416 (Constant)",
    "<<2>> = 22 seconds (Constant)",
    "<<3>> = 20% (Constant)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 5% (Constant)",
    "<<6>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill

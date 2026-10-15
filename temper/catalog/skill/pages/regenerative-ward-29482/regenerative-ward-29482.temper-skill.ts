import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const regenerativeWard29482 = {
  id: "019e6f53-a5e2-7d81-b624-e8191e2aea19",
  type: "page-type/temper-skill",
  slug: "regenerative-ward-29482",
  title: "Regenerative Ward",
  key: "regenerative-ward-29482",
  baseName: "Conjured Ward",
  description:
    "Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs |cffffff7729|r damage for |cffffff10|r seconds, heals you for |cffffff1038|r Health, and grants Minor Intellect and Minor Endurance to you and nearby allies for |cffffff10|r seconds.\n\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at |cffffff55|r% of your Max Health.",
  icon: "/esoui/art/icons/ability_sorcerer_tempest.dds",
  esoSkillId: 29482,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1012,
  createdAt: "2026-05-28T16:03:33.474Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.34089 Stat + 0.34089 Power (Health of Magicka Capped, ratio = 1.00, DmgShield, SingleTarget, Direct, 10s duration, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = 0.0515092 Health + 7.85023 (Health, Heal, SingleTarget, Direct, R2 = 0.95717)",
    "<<4>> = Minor Intellect (Constant)",
    "<<5>> = Minor Endurance (Constant)",
    "<<6>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill

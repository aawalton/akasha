import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const conjuredWard = {
  id: "019e6f53-a015-7189-a4df-3773295059b5",
  type: "page-type/temper-skill",
  slug: "conjured-ward",
  title: "Conjured Ward",
  key: "conjured-ward",
  baseName: "Conjured Ward",
  description:
    "Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs |cffffff7728|r damage for |cffffff6|r seconds.\n\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at |cffffff55|r% of your Max Health.",
  icon: "/esoui/art/icons/ability_sorcerer_hurricane.dds",
  esoSkillId: 28418,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 240,
  createdAt: "2026-05-28T16:03:31.989Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.33 Stat + 0.33 Power (Health of Magicka Capped, ratio = 1.00, RankMod(1), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill

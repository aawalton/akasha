import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hardenedWard = {
  id: "019e6245-a69a-7c6c-bc84-7ac46cc494d0",
  type: "page-type/temper-skill",
  slug: "hardened-ward",
  title: "Hardened Ward",
  key: "hardened-ward",
  baseName: "Conjured Ward",
  description:
    "Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs 7323 damage for 6 seconds.\n\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at 72% of your Max Health.",
  icon: "/esoui/art/icons/ability_sorcerer_typhoon.dds",
  esoSkillId: 30474,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 590,
  createdAt: "2026-05-26T03:13:12.346Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.456301 Health + 75.7641 (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 0.957238)",
    "<<2>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill

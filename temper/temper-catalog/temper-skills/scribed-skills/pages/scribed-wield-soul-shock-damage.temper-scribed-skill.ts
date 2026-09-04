import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulShockDamage = {
  id: "019e6471-15fb-7e99-9d5f-7228c66fbe50",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-shock-damage",
  title: "Shocking Soul",
  key: "scribed-wield-soul-shock-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Shock Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 215731,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "shock-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

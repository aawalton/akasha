import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedWieldSoulShockDamage = {
  id: "019e6471-15fb-7e99-9d5f-7228c66fbe50",
  type: "page-type/temper-scribed-skill",
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
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/shock-damage",
  grimoireId: "temper-grimoire/wield-soul",
} as const satisfies TemperScribedSkill

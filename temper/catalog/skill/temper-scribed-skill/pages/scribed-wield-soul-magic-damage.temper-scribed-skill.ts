import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedWieldSoulMagicDamage = {
  id: "019e6471-15f9-74b7-b101-e289707f4a6a",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-wield-soul-magic-damage",
  title: "Magical Soul",
  key: "scribed-wield-soul-magic-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Magic Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 215731,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/magic-damage",
  grimoireId: "temper-grimoire/wield-soul",
} as const satisfies TemperScribedSkill

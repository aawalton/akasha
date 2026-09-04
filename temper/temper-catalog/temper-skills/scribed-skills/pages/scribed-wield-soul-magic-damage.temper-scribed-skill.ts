import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulMagicDamage = {
  id: "019e6471-15f9-74b7-b101-e289707f4a6a",
  pageTypeSlug: "temper-scribed-skill",
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
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "magic-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

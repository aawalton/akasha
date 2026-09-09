import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulDiseaseDamage = {
  id: "019e6471-15f5-7c97-8c12-f6e1517d6186",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-disease-damage",
  title: "Pestilent Soul",
  key: "scribed-wield-soul-disease-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Disease Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 219780,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "disease-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

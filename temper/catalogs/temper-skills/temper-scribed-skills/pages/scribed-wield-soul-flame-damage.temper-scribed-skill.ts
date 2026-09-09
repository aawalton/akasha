import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulFlameDamage = {
  id: "019e6471-15f6-7a6e-bc6f-d82bbb4c3291",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-flame-damage",
  title: "Fiery Soul",
  key: "scribed-wield-soul-flame-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Flame Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "flame-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

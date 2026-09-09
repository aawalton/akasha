import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulPhysicalDamage = {
  id: "019e6471-15fa-72c6-bd05-1b1d05c03e0d",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-physical-damage",
  title: "Sundering Soul",
  key: "scribed-wield-soul-physical-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Physical Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "physical-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

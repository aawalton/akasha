import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSoulBurstPhysicalDamage = {
  id: "019e6471-15ca-77cf-8414-54c4f1ecbd9a",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-soul-burst-physical-damage",
  title: "Sundering Burst",
  key: "scribed-soul-burst-physical-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Physical Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217465,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "temper-skill-type/active",
  subcategoryId: "scribed",
  focusScriptId: "temper-focus-script/physical-damage",
  grimoireId: "temper-grimoire/soul-burst",
} as const satisfies TemperScribedSkill

import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSoulBurstDiseaseDamage = {
  id: "019e6471-15c4-7ec0-8e41-4206c141d937",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-soul-burst-disease-damage",
  title: "Pestilent Burst",
  key: "scribed-soul-burst-disease-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Disease Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217465,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/disease-damage",
  grimoireId: "temper-grimoire/soul-burst",
} as const satisfies TemperScribedSkill

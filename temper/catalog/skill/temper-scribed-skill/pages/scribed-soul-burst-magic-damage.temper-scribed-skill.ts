import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSoulBurstMagicDamage = {
  id: "019e6471-15c9-7861-a50a-2309d2ac0578",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-soul-burst-magic-damage",
  title: "Magical Burst",
  key: "scribed-soul-burst-magic-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Magic Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217459,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/magic-damage",
  grimoireId: "temper-grimoire/soul-burst",
} as const satisfies TemperScribedSkill

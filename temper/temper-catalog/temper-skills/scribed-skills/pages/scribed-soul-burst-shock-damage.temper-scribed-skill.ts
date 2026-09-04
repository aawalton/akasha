import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstShockDamage = {
  id: "019e6471-15cc-7744-a5d0-5839f283cf0f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-shock-damage",
  title: "Shocking Burst",
  key: "scribed-soul-burst-shock-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Shock Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217459,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "shock-damage",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill

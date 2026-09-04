import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstDamageShield = {
  id: "019e6471-15c4-70cd-9003-322118903a72",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-damage-shield",
  title: "Warding Burst",
  key: "scribed-soul-burst-damage-shield",
  baseName: "Soul Burst",
  description:
    "Grants you and your allies a damage shield that absorbs 3718 damage for 6 seconds, scaling off the higher of your Max Health or Magicka and capped at 55% of your Max Health. Beneficial Signature and Affix scripts apply to you or an ally.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217460,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "damage-shield",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill

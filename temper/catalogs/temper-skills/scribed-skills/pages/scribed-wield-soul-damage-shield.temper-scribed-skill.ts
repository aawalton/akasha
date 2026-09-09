import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulDamageShield = {
  id: "019e6471-15f4-7eae-94c2-845edb3ca7ab",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-damage-shield",
  title: "Warding Soul",
  key: "scribed-wield-soul-damage-shield",
  baseName: "Wield Soul",
  description:
    "Grants you or an ally a damage shield that absorbs 4958 damage for 6 seconds, scaling off the higher of your Max Health or Magicka and capped at 55% of your Max Health. Beneficial Signature and Affix scripts apply to you or an ally.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 216802,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "damage-shield",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

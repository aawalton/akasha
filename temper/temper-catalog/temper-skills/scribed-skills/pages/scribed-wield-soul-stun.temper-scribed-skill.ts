import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulStun = {
  id: "019e6471-15fc-7ca6-8de4-666e0c1cd00f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-stun",
  title: "Dazing Soul",
  key: "scribed-wield-soul-stun",
  baseName: "Wield Soul",
  description:
    "Deals 1045 Magic Damage to an enemy and stuns for 3 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 221930,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "stun",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill

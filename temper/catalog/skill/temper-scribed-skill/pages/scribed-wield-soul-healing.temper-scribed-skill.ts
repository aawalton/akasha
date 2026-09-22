import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedWieldSoulHealing = {
  id: "019e6471-15f8-761d-8644-82b002f8cb86",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-wield-soul-healing",
  title: "Healing Soul",
  key: "scribed-wield-soul-healing",
  baseName: "Wield Soul",
  description:
    "Heals you or an ally for 3485 Health. Beneficial Signature and Affix scripts apply to you or an ally.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 216813,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/healing",
  grimoireId: "temper-grimoire/wield-soul",
} as const satisfies TemperScribedSkill

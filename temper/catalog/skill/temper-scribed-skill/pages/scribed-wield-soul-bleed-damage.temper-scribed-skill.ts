import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedWieldSoulBleedDamage = {
  id: "019e6471-15f4-70ba-98d6-f7391c61239e",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-wield-soul-bleed-damage",
  title: "Bloody Soul",
  key: "scribed-wield-soul-bleed-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Bleed Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoAbilityId: 219780,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/bleed-damage",
  grimoireId: "temper-grimoire/wield-soul",
  hashPlace: 1729,
  createdAt: "2026-05-26T13:19:53.332Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill

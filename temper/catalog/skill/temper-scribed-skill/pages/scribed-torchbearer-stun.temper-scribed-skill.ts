import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedTorchbearerStun = {
  id: "019e6471-15d4-715d-92f9-31e7853df28e",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-torchbearer-stun",
  title: "Dazing Torch",
  key: "scribed-torchbearer-stun",
  baseName: "Torchbearer",
  description:
    "Reduces the Movement Speed of enemies by 40% for 4 seconds on the first sweep, immobilizes for 3 seconds on the second sweep, and stuns for 3 seconds on the third sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoAbilityId: 217633,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/stun",
  grimoireId: "temper-grimoire/torchbearer",
  hashPlace: 1695,
  createdAt: "2026-05-26T13:19:53.300Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill

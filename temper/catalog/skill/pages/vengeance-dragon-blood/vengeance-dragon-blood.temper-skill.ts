import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDragonBlood = {
  id: "019e6f53-a8f1-7844-8875-25e74a3653be",
  type: "page-type/temper-skill",
  slug: "vengeance-dragon-blood",
  title: "Vengeance Dragon Blood",
  key: "vengeance-dragon-blood",
  baseName: "Vengeance Dragon Blood",
  description:
    "Draw on your draconic blood to heal for |cffffff5028|r Health, increasing by up to |cffffff50|r% additional healing based on your missing Health. This ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_dragonknight_011.dds",
  esoSkillId: 237638,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 1454,
  createdAt: "2026-05-28T16:03:34.257Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.25 Health (Health, Heal, SingleTarget, Direct, 1s duration, R2 = 1)",
    "<<2>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill

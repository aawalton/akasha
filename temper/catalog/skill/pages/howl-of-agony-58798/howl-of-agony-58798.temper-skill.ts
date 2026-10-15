import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const howlOfAgony58798 = {
  id: "019e6f53-a328-7b8a-bb3d-25a9962ddcb3",
  type: "page-type/temper-skill",
  slug: "howl-of-agony-58798",
  title: "Bloody Gnash",
  key: "howl-of-agony-58798",
  baseName: "Gnash",
  description:
    "Bare your fangs and gnash your teeth into an enemy while ripping back, dealing |cffffff4085|r Physical Damage on the initial lunge and |cffffff4174|r Bleed Damage while ripping out. \n\nConsumes a stack of Blood Hunger to increase the initial damage done by |cffffff25|r%. There is a |cffffff50|r% chance to retain Blood Hunger each cast.\n\nThe second hit deals up to |cffffff200|r% more damage to enemies with less than |cffffff25|r% Health and applies the Hemorrhaging status effect.",
  icon: "/esoui/art/icons/ability_werewolf_002_rend_b.dds",
  esoSkillId: 58798,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/active",
  hashPlace: 640,
  createdAt: "2026-05-28T16:03:32.776Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.067145 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 8.08, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0670852 MaxStat + 0.542535 MaxPower - 0.593525 (Ultimate, ratio = 8.09, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = Blood Hunger (Constant)",
    "<<4>> = 25% (Constant)",
    "<<5>> = 50% (Constant)",
    "<<6>> = 200 (Constant)",
    "<<7>> = 25 (Constant)",
    "<<8>> = Hemorrhaging (Constant)",
  ],
} as const satisfies TemperSkill

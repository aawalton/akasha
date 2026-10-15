import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reconstructiveDomain = {
  id: "019e6245-a701-7078-a5d8-a363f96d4381",
  type: "page-type/temper-skill",
  slug: "reconstructive-domain",
  title: "Reconstructive Domain",
  key: "reconstructive-domain",
  baseName: "Arcanist's Domain",
  description:
    "Draw forth your tome and invoke the leviathanum of the Abyssal Sea to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by 215 and your Health, Magicka, and Stamina Recovery by 15%.\n\nThe vortex also heals you and your allies for 4631 Health over 20 seconds.",
  icon: "/esoui/art/icons/ability_arcanist_017_b.dds",
  esoSkillId: 40186234,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 998,
  createdAt: "2026-05-26T03:13:12.449Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Courage (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = 215 (Constant)",
    "<<6>> = 15% (Constant)",
    "<<7>> = 0.018782006 MaxStat + 0.19721003 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, DOT, 20s duration, 2s tick, R2 = 1)",
    "<<8>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill

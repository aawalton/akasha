import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reconstructiveDomain186234 = {
  id: "019e6f53-a5cb-7329-bbd5-7c582d80623c",
  type: "page-type/temper-skill",
  slug: "reconstructive-domain-186234",
  title: "Reconstructive Domain",
  key: "reconstructive-domain-186234",
  baseName: "Arcanist's Domain",
  description:
    "Draw forth your tome and invoke the leviathanum of the Abyssal Sea to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by |cffffff215|r and your Health, Magicka, and Stamina Recovery by |cffffff15|r%.\n\nThe vortex also heals you and your allies for |cffffff14597|r Health over |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_arcanist_017_b.dds",
  esoSkillId: 186234,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 999,
  createdAt: "2026-05-28T16:03:33.451Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Courage (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = 215 (Constant)",
    "<<6>> = 15% (Constant)",
    "<<7>> = 0.018182 MaxStat + 0.19091 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 20s duration, 2s tick, R2 = 1)",
    "<<8>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill

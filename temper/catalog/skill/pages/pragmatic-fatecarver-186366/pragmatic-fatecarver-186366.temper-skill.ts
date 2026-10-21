import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pragmaticFatecarver186366 = {
  id: "019e6f53-a53c-7a32-bd87-185d937986ab",
  type: "page-type/temper-skill",
  slug: "pragmatic-fatecarver-186366",
  title: "Pragmatic Fatecarver",
  key: "pragmatic-fatecarver-186366",
  baseName: "Fatecarver",
  description:
    "Channel a beam of energy in front of you for up to |cffffff4|r seconds, dealing |cffffff3229|r Magic Damage every |cffffff0.3|r seconds to up to 6 enemies, and gain a damage shield that absorbs up to |cffffff9859|r damage and grants interrupt immunity.\n\nCasting Pragmatic Fatecarver consumes all Crux and increases damage done by |cffffff33|r%, and decreases cost by |cffffff16|r% per Crux spent.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_arcanist_002_b.dds",
  esoSkillId: 186366,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 924,
  createdAt: "2026-05-28T16:03:33.308Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.039059255 MaxStat + 0.41012218 MaxPower (Ultimate, Dmg, Magic, AOE, Direct, Melee)",
    "<<3>> = 0.3 seconds (Constant)",
    "<<4>> = 0.139455 MaxStat + 1.46428 MaxPower (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 4.5s duration, R2 = 1)",
    "<<5>> = Pragmatic Fatecarver (Constant)",
    "<<6>> = 33% (Constant)",
    "<<7>> = 13% (Constant)",
  ],
} as const satisfies TemperSkill

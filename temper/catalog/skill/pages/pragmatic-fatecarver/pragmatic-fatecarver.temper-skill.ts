import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pragmaticFatecarver = {
  id: "019e6245-a6ee-7afc-b7b9-715ef9480a4d",
  type: "page-type/temper-skill",
  slug: "pragmatic-fatecarver",
  title: "Pragmatic Fatecarver",
  key: "pragmatic-fatecarver",
  baseName: "Fatecarver",
  description:
    "Channel a beam of energy in front of you for up to 4 seconds, dealing 879 Magic Damage every 0.3 seconds to up to 6 enemies, and gain a damage shield that absorbs up to 3137 damage and grants interrupt immunity.\n\nCasting Pragmatic Fatecarver consumes all Crux and increases damage done by 33%, and decreases cost by 16% per Crux spent.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_arcanist_002_b.dds",
  esoSkillId: 193398,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 923,
  createdAt: "2026-05-26T03:13:12.430Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.039097929 MaxStat + 0.41052826 MaxPower (Ultimate, Dmg, Magic, AOE, Direct, Melee)",
    "<<3>> = 0.3 seconds (Constant)",
    "<<4>> = 0.139474 MaxStat + 1.46406 MaxPower (Ultimate, DmgShield, SingleTarget, Direct, 4.5s duration, at most half Health)",
    "<<5>> = Pragmatic Fatecarver (Constant)",
    "<<6>> = 33% (Constant)",
    "<<7>> = 16% (Constant)",
  ],
} as const satisfies TemperSkill

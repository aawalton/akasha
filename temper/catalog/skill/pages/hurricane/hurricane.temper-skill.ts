import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hurricane = {
  id: "019e6245-a6a9-7288-8059-e2f2372561d8",
  type: "page-type/temper-skill",
  slug: "hurricane",
  title: "Hurricane",
  key: "hurricane",
  baseName: "Lightning Form",
  description:
    "Manifest yourself as pure air, buffeting nearby enemies with wind dealing 478 Physical Damage every 2 seconds for 20 seconds. The winds grow in damage and size, increasing up to 120% more damage and up to 9 meters in size.\n\nWhile in this form you gain Major Resolve and Minor Expedition, increasing your Physical and Spell Resistance by 5948 and your Movement Speed by 15%.",
  icon: "/esoui/art/icons/ability_sorcerer_thundering_presence.dds",
  esoSkillId: 30244,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 646,
  createdAt: "2026-05-26T03:13:12.361Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, DOT, 2s tick, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill

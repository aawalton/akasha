import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const grimFocus = {
  id: "019e6f53-a2b2-7810-973d-e5d5f6f167f6",
  type: "page-type/temper-skill",
  slug: "grim-focus",
  title: "Grim Focus",
  key: "grim-focus",
  baseName: "Grim Focus",
  description:
    "When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.\n\nYour Light and Heavy Attacks now generate a stack of Grim Focus, up to |cffffff10|r times. Fully-charged Heavy Attacks grant two stacks.\n\nWhen at |cffffff5|r or more stacks, you can consume |cffffff5|r to fire a spectral arrow to deal |cffffff14539|r Magic Damage and heal for |cffffff34|r% of the damage dealt, if you are in melee range.",
  icon: "/esoui/art/icons/ability_nightblade_005.dds",
  esoSkillId: 61902,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 581,
  createdAt: "2026-05-28T16:03:32.658Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Savagery (Constant)",
    "<<2>> = 12% (Constant)",
    "<<3>> = Grim Focus (Constant)",
    "<<4>> = 10 (Constant)",
    "<<5>> = 5 (Constant)",
    "<<6>> = 0.18 MaxStat + 1.89 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<7>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill

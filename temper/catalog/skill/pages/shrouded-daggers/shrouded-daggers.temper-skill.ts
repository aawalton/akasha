import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shroudedDaggers = {
  id: "019e6226-0113-7c15-a033-70d1a37324ba",
  type: "page-type/temper-skill",
  slug: "shrouded-daggers",
  title: "Shrouded Daggers",
  key: "shrouded-daggers",
  baseName: "Hidden Blade",
  description:
    "Fire a secret dagger from your sleeve that bounces up to 3 times to nearby enemies, dealing 1799 Physical Damage per hit.  \n\nIf enemies hit are casting they are interrupted, set Off Balance, and stunned for 3 seconds.\n\nYou also gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 20 seconds.",
  icon: "/esoui/art/icons/ability_dualwield_003_b.dds",
  esoSkillId: 40619,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1179,
  createdAt: "2026-05-26T02:38:38.355Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = Major Brutality (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill

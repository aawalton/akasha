import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const inevitableDetonation61491 = {
  id: "019e6f53-a371-72f9-af00-93f96a87f6c9",
  type: "page-type/temper-skill",
  slug: "inevitable-detonation-61491",
  title: "Inevitable Detonation",
  key: "inevitable-detonation-61491",
  baseName: "Magicka Detonation",
  description:
    "Curse an enemy with a magical bomb that explodes after |cffffff4|r seconds, dealing |cffffff1652|r Magic Damage to all enemies in the area.\n\nIf the bomb is dispelled or removed early, the explosion is triggered immediately.\n\nEach enemy within the bomb's radius increases the damage by |cffffff100|r%.",
  icon: "/esoui/art/icons/ability_ava_inevitable_detonation.dds",
  esoSkillId: 61491,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 7,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 681,
  createdAt: "2026-05-28T16:03:32.849Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.019369 MaxStat + 0.203372 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 100% (Constant)",
  ],
} as const satisfies TemperSkill

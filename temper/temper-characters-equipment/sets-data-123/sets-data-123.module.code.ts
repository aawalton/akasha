import type { SetTemplate } from "@akasha/temper-equipment/set-template"

export const SETS_DATA_123: readonly SetTemplate[] = [
  {
    id: "zens-redress",
    name: "Z'en's Redress",
    esoSetId: 455,
    subcategoryId: "dungeon",
    valid: ["*:light"],
    bonuses: [
      {
        count: 2,
        status: "supported",
        effects: [{ metricId: "magicka-recovery", effectType: "integer", effectValue: 129 }],
        description: "Adds 129 Magicka Recovery",
      },
      {
        count: 3,
        status: "supported",
        effects: [{ metricId: "power", effectType: "integer", effectValue: 129 }],
        description: "Adds 129 Weapon and Spell Damage",
      },
      {
        count: 4,
        status: "supported",
        effects: [{ metricId: "magicka-maximum", effectType: "integer", effectValue: 1096 }],
        description: "Adds 1096 Maximum Magicka",
      },
      {
        count: 5,
        status: "unsupported",
        effects: [],
        description:
          "Your Light Attacks apply the Touch of Z'en on enemies for 20 seconds. Enemies with the Touch of Z'en take an additional 1% more damage for each damage over time effect you've placed on them, up to 5%. Enemies can only be affected by one Touch of Z'en at a time.",
      },
    ],
    icons: {
      "axe": "/esoui/art/icons/gear_stagszen_axe_a.dds",
      "battleaxe": "/esoui/art/icons/gear_stagszen_2haxe_a.dds",
      "bow": "/esoui/art/icons/gear_stagszen_bow_a.dds",
      "chest:*": "/esoui/art/icons/gear_stagzenlgt_robe_a.dds",
      "dagger": "/esoui/art/icons/gear_stagszen_dagger_a.dds",
      "feet:*": "/esoui/art/icons/gear_stagzenlgt_feet_a.dds",
      "greatsword": "/esoui/art/icons/gear_stagszen_2hsword_a.dds",
      "hands:*": "/esoui/art/icons/gear_stagzenlgt_hands_a.dds",
      "head:*": "/esoui/art/icons/gear_stagzenlgt_helmet_a.dds",
      "ice-staff": "/esoui/art/icons/gear_stagszen_staff_a.dds",
      "inferno-staff": "/esoui/art/icons/gear_stagszen_staff_a.dds",
      "legs:*": "/esoui/art/icons/gear_stagzenlgt_legs_a.dds",
      "lightning-staff": "/esoui/art/icons/gear_stagszen_staff_a.dds",
      "mace": "/esoui/art/icons/gear_stagszen_mace_a.dds",
      "maul": "/esoui/art/icons/gear_stagszen_2hmace_a.dds",
      "necklace": "/esoui/art/icons/gear_breton_neck_a.dds",
      "restoration-staff": "/esoui/art/icons/gear_stagszen_staff_a.dds",
      "ring": "/esoui/art/icons/gear_breton_ring_a.dds",
      "shield": "/esoui/art/icons/gear_stagszen_shield_a.dds",
      "shoulders:*": "/esoui/art/icons/gear_stagzenlgt_shoulder_a.dds",
      "sword": "/esoui/art/icons/gear_stagszen_sword_a.dds",
      "waist:*": "/esoui/art/icons/gear_stagzenlgt_waist_a.dds",
    },
  },
  {
    id: "zoal-the-ever-wakeful",
    name: "Zoal the Ever-Wakeful",
    esoSetId: 598,
    subcategoryId: "monster",
    valid: ["monster"],
    bonuses: [
      {
        count: 1,
        status: "supported",
        effects: [{ metricId: "stamina-maximum", effectType: "integer", effectValue: 1096 }],
        description: "Adds 1096 Maximum Stamina",
      },
      {
        count: 2,
        status: "unsupported",
        effects: [],
        description:
          "When you Break Free, you release a wave of Watcher energy, causing enemies within 8 meters of you to become Feared for 3 seconds. You also gain 34 Weapon and Spell Damage for each enemy hit, up to 6 enemies, for 7 seconds.",
      },
    ],
    icons: {
      "head:heavy": "/esoui/art/icons/gear_undwatcher_head_a.dds",
      "head:light": "/esoui/art/icons/gear_undwatcher_head_a.dds",
      "head:medium": "/esoui/art/icons/gear_undwatcher_head_a.dds",
      "shoulders:heavy": "/esoui/art/icons/gear_undwatcher_shoulders_a.dds",
      "shoulders:light": "/esoui/art/icons/gear_undwatcher_shoulders_a.dds",
      "shoulders:medium": "/esoui/art/icons/gear_undwatcher_shoulders_a.dds",
    },
  },
]

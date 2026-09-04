import type { CompanionSkillTemplate } from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"

export const COMPANION_SKILLS_04 = {
  "mirri-impeccable-shot": {
    id: "mirri-impeccable-shot" as const,
    abilityId: 157259,
    name: "Impeccable Shot",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri" as const,
    skillType: "ultimate" as const,
    description:
      "Your Companion marks an enemy and exposes their weakness, causing them to take 20% more damage for $$2 seconds. While the enemy is exposed they build up to a single killing shot, unleashing a massive bolt that deals $1 Physical Damage.",
    icon: "/esoui/art/icons/ability_companion_ultimate_mirri_001.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "range": 28, "scope": "single" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 9,
        },
        "damageType": "physical",
      },
      {
        "type": "apply-debuff",
        "debuff": {
          "value": 0.2,
          "debuff": "damage-taken-increase",
          "duration": 3,
          "valueType": "fractional-change",
        },
        "target": { "type": "enemy", "range": 28, "scope": "single" },
      },
      { "type": "resource-cost", "amount": 200, "resource": "ultimate" },
      { "type": "cast-time", "duration": 3 },
    ] as const,
    validRoles: ["dps", "support"] as const,
  },
  "mirri-life-absorption": {
    id: "mirri-life-absorption" as const,
    abilityId: 154790,
    name: "Life Absorption",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-soul-thief" as const,
    skillType: "active" as const,
    description:
      "Your Companion steals an enemy's life force, dealing $1 Magic Damage and healing themselves or an ally around them for $2 Health.",
    icon: "/esoui/art/icons/ability_companion_nightblade_012.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "range": 28, "scope": "single" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 1.5,
        },
        "damageType": "magic",
      },
      {
        "type": "heal",
        "target": { "type": "self-or-ally", "scope": "area" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 3,
        },
      },
      { "type": "cast-time", "duration": 0.2 },
      { "type": "cooldown", "duration": 12 },
    ] as const,
    validRoles: ["dps", "healer", "tank"] as const,
  },
  "mirri-life-siphon": {
    id: "mirri-life-siphon" as const,
    abilityId: 157207,
    name: "Life Siphon",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-soul-thief" as const,
    skillType: "active" as const,
    description:
      "Your Companion siphons the vigor from the blood of enemies nearby, dealing $1 Magic Damage and healing themselves and their allies for $2 Health.",
    icon: "/esoui/art/icons/ability_companion_nightblade_013.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "scope": "area", "radius": 8 },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 1.5,
        },
        "damageType": "magic",
      },
      {
        "type": "heal",
        "target": { "type": "self-and-ally", "scope": "area", "radius": 8 },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 1.5,
        },
      },
      { "type": "cast-time", "duration": 0.566 },
      { "type": "cooldown", "duration": 16 },
    ] as const,
    validRoles: ["dps", "healer", "tank"] as const,
  },
  "mirri-masque-of-torment": {
    id: "mirri-masque-of-torment" as const,
    abilityId: 153856,
    name: "Masque of Torment",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-living-shade" as const,
    skillType: "active" as const,
    description:
      "Your Companion terrifies nearby enemies, causing them to cower in fear for $$1 seconds.",
    icon: "/esoui/art/icons/ability_companion_nightblade_016.dds",
    effects: [
      {
        "type": "apply-status",
        "status": { "status": "fear", "duration": 4 },
        "target": { "type": "enemy", "scope": "area", "radius": 6 },
      },
      { "type": "cast-time", "duration": 0.5 },
      { "type": "cooldown", "duration": 8 },
    ] as const,
    validRoles: [] as const,
  },
  "mirri-shadow-slash": {
    id: "mirri-shadow-slash" as const,
    abilityId: 156182,
    name: "Shadow Slash",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-deadly-assassin" as const,
    skillType: "active" as const,
    description:
      "Your Companion slashes an enemy, dealing $1 Magic Damage and setting them Off Balance for $$2 seconds.",
    icon: "/esoui/art/icons/ability_companion_nightblade_002.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "range": 7, "scope": "single" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 3,
        },
        "damageType": "magic",
      },
      {
        "type": "apply-status",
        "status": { "status": "off-balance", "duration": 7 },
        "target": { "type": "enemy", "range": 7, "scope": "single" },
      },
      { "type": "cast-time", "duration": 0.266 },
      { "type": "cooldown", "duration": 12 },
    ] as const,
    validRoles: ["dps"] as const,
  },
  "mirri-slayers-blade": {
    id: "mirri-slayers-blade" as const,
    abilityId: 153855,
    name: "Slayer's Blade",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-deadly-assassin" as const,
    skillType: "active" as const,
    description:
      "Your Companion thrusts a magic blade with lethal precision to finish off an enemy, dealing $1 Magic Damage.",
    icon: "/esoui/art/icons/ability_companion_nightblade_017.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "scope": "single" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 9,
        },
        "damageType": "magic",
      },
      { "type": "cast-time", "duration": 0.233 },
      { "type": "cooldown", "duration": 8 },
    ] as const,
    validRoles: ["dps"] as const,
    castConditions: [{ "type": "health-threshold", "below": 25, "targetType": "enemy" }] as const,
  },
  "mirri-twilight-mantle": {
    id: "mirri-twilight-mantle" as const,
    abilityId: 157201,
    name: "Twilight Mantle",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-living-shade" as const,
    skillType: "active" as const,
    description:
      "Your Companion shrouds themselves in refreshing shadows, healing for 25% of their Max Health and becoming invisible for $$2 seconds.",
    icon: "/esoui/art/icons/ability_companion_nightblade_004.dds",
    effects: [
      {
        "type": "heal",
        "target": { "type": "self", "scope": "single" },
        "formula": {
          "type": "metric-percent",
          "percent": 25,
          "metricId": "companion-health-maximum",
        },
      },
      {
        "type": "apply-status",
        "status": { "status": "invisible", "duration": 3 },
        "target": { "type": "self", "scope": "single" },
      },
      { "type": "cast-time", "duration": 0.333 },
      { "type": "cooldown", "duration": 16 },
    ] as const,
    validRoles: ["tank"] as const,
    castConditions: [{ "type": "health-threshold", "below": 50, "targetType": "self" }] as const,
  },
  "mirri-warp-strike": {
    id: "mirri-warp-strike" as const,
    abilityId: 153853,
    name: "Warp Strike",
    companionId: "mirri" as const,
    skillLineId: "companion-mirri-deadly-assassin" as const,
    skillType: "active" as const,
    description:
      "Your Companion flashes through the shadows and ambushes an enemy, dealing $1 Magic Damage.",
    icon: "/esoui/art/icons/ability_companion_nightblade_008.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "range": 22, "scope": "single" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 3,
        },
        "damageType": "magic",
      },
      { "type": "cast-time", "duration": 0.4 },
      { "type": "cooldown", "duration": 16 },
    ] as const,
    validRoles: ["dps"] as const,
  },
  "shared-arcane-nova": {
    id: "shared-arcane-nova" as const,
    abilityId: 157230,
    name: "Arcane Nova",
    companionId: "all" as const,
    skillLineId: "weapon-destruction-staff" as const,
    skillType: "active" as const,
    description:
      "Your Companion releases a surge of magic to enemies around them, dealing $1 Magic Damage. Fire Nova applies the Burning status effect for $$2 seconds. Frost Nova applies the Chill status effect for $$3 seconds. Shock Nova applies the Concussion status effect for $$4 seconds.",
    icon: "/esoui/art/icons/ability_companion_destructionstaff_008.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "scope": "area", "radius": 6 },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 3,
        },
        "damageType": "magic",
      },
      {
        "type": "apply-status",
        "status": { "status": "burning", "duration": 4 },
        "target": { "type": "enemy", "scope": "area", "radius": 6 },
        "conditions": [{ "type": "weapon-type", "weaponType": "flame" }],
      },
      {
        "type": "apply-status",
        "status": { "status": "chilled", "duration": 4 },
        "target": { "type": "enemy", "scope": "area", "radius": 6 },
        "conditions": [{ "type": "weapon-type", "weaponType": "frost" }],
      },
      {
        "type": "apply-status",
        "status": { "status": "concussed", "duration": 4 },
        "target": { "type": "enemy", "scope": "area", "radius": 6 },
        "conditions": [{ "type": "weapon-type", "weaponType": "shock" }],
      },
      { "type": "cooldown", "duration": 12 },
    ] as const,
    validRoles: ["dps"] as const,
    tags: ["elemental-variant"] as const,
  },
  "shared-bashing-bulwark": {
    id: "shared-bashing-bulwark" as const,
    abilityId: 155326,
    name: "Bashing Bulwark",
    companionId: "all" as const,
    skillLineId: "weapon-one-hand-shield" as const,
    skillType: "active" as const,
    description: "Your Companion rushes an enemy and rams them, stunning them for $$1 seconds.",
    icon: "/esoui/art/icons/ability_companion_1handed_003.dds",
    effects: [
      {
        "type": "apply-status",
        "status": { "status": "stun", "duration": 4 },
        "target": { "type": "enemy", "range": 22, "scope": "single" },
      },
      { "type": "cooldown", "duration": 16 },
    ] as const,
    validRoles: [] as const,
    castConditions: [{ "type": "range", "minDistance": 7 }] as const,
  },
  "shared-biting-trap": {
    id: "shared-biting-trap" as const,
    abilityId: 157747,
    name: "Biting Trap",
    companionId: "all" as const,
    skillLineId: "guild-fighters" as const,
    skillType: "active" as const,
    description:
      "Your Companion sets a sharpened blade trap in front of them, which takes 1.5 seconds to arm and lasts for $$1 seconds. When an enemy triggers the trap, they are immobilized for $$2 seconds. If the enemy is an Undead, Daedra, or Werewolf they take $1 Physical Damage.",
    icon: "/esoui/art/icons/ability_companion_fightersguild_004.dds",
    effects: [
      {
        "type": "delayed",
        "delay": 6.5,
        "effect": {
          "type": "apply-status",
          "status": { "status": "immobilize", "duration": 4 },
          "target": { "type": "enemy", "scope": "single" },
        },
        "augmentDelay": true,
      },
      {
        "type": "delayed",
        "delay": 6.5,
        "effect": {
          "type": "damage",
          "target": { "type": "enemy", "scope": "single" },
          "formula": {
            "type": "metric-scaling",
            "metricId": "companion-weapon-damage",
            "coefficient": 1.5,
          },
          "conditions": [{ "type": "enemy-type", "enemyTypes": ["undead", "daedra", "werewolf"] }],
          "damageType": "physical",
        },
      },
      { "type": "cast-time", "duration": 0.366 },
      { "type": "cooldown", "duration": 8 },
    ] as const,
    validRoles: ["dps"] as const,
    tags: ["trap", "arm-time-1.5s", "trap-duration-6.5s", "target-self"] as const,
  },
  "shared-bulwark": {
    id: "shared-bulwark" as const,
    abilityId: 156599,
    name: "Bulwark",
    companionId: "all" as const,
    skillLineId: "armor-heavy" as const,
    skillType: "active" as const,
    description:
      "Your Companion becomes an unstoppable defender, blocking and reflecting all attacks for $$1 seconds.",
    icon: "/esoui/art/icons/ability_companion_armor_heavy.dds",
    effects: [
      { "type": "special", "effect": "block-all", "duration": 5 },
      { "type": "special", "effect": "reflect-all", "duration": 5 },
      { "type": "cast-time", "duration": 0.6 },
      { "type": "cooldown", "duration": 36 },
    ] as const,
    validRoles: [] as const,
    castConditions: [
      { "type": "health-threshold", "below": 75, "targetType": "self" },
      { "type": "enemy-type", "enemyTypes": ["difficult-monster"] },
    ] as const,
  },
} as const satisfies Record<string, CompanionSkillTemplate>

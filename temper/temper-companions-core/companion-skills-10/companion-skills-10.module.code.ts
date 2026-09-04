import type { CompanionSkillTemplate } from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"

export const COMPANION_SKILLS_10 = {
  "zerith-var-sepulchral-chill": {
    id: "zerith-var-sepulchral-chill" as const,
    abilityId: 213158,
    name: "Sepulchral Chill",
    companionId: "zerith-var" as const,
    skillLineId: "companion-zerith-var-warriors-banishment" as const,
    skillType: "active" as const,
    description:
      "Your Companion sanctifies the ground at the target location, dealing $1 Frost Damage every 2 seconds over 8 seconds and applying Major Breach to enemies within, reducing their Spell and Physical Resistance by 5948 for $$2 seconds.",
    icon: "/esoui/art/icons/ability_companion_necromancer_boneyard.dds",
    effects: [
      {
        "type": "dot",
        "target": { "type": "enemy", "range": 28, "scope": "area", "radius": 6 },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 3,
        },
        "duration": 8,
        "damageType": "frost",
        "displayMode": "per-tick",
        "initialTick": true,
        "tickInterval": 2,
      },
      {
        "type": "apply-debuff",
        "debuff": {
          "value": 5948,
          "debuff": "major-breach",
          "duration": 6,
          "valueType": "integer",
        },
        "target": { "type": "enemy", "range": 28, "scope": "area", "radius": 6 },
      },
      { "type": "cast-time", "duration": 0.33 },
      { "type": "cooldown", "duration": 16 },
    ] as const,
    validRoles: ["dps", "support"] as const,
  },
  "zerith-var-strands-of-the-lattice": {
    id: "zerith-var-strands-of-the-lattice" as const,
    abilityId: 216057,
    name: "Strands of the Lattice",
    companionId: "zerith-var" as const,
    skillLineId: "companion-zerith-var-warriors-banishment" as const,
    skillType: "active" as const,
    description:
      "Your Companion dislodges a spirit's ties to a corpse, releasing spiritual energy and dealing $1 Disease Damage every 2 seconds over 10 seconds. Damage is done within 5m to enemies around the corpse, within 5m to enemies around them, and in a line between them and the corpse. After 10 seconds the corpse explodes, dealing an additional $3 Disease Damage to all enemies around the corpse.",
    icon: "/esoui/art/icons/ability_companion_necromancer_detonatingsiphon.dds",
    effects: [
      {
        "type": "dot",
        "target": { "type": "enemy", "scope": "area", "radius": 5 },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 4.5,
        },
        "duration": 10,
        "damageType": "disease",
        "displayMode": "per-tick",
        "initialTick": true,
        "tickInterval": 2,
      },
      {
        "type": "dot",
        "target": { "type": "enemy", "scope": "line" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 4.5,
        },
        "duration": 10,
        "damageType": "disease",
        "displayMode": "per-tick",
        "initialTick": true,
        "tickInterval": 2,
      },
      {
        "type": "delayed",
        "delay": 10,
        "effect": {
          "type": "damage",
          "target": { "type": "enemy", "scope": "area", "radius": 5 },
          "formula": {
            "type": "metric-scaling",
            "metricId": "companion-weapon-damage",
            "coefficient": 3,
          },
          "damageType": "disease",
        },
      },
      { "type": "cast-time", "duration": 0.2 },
      { "type": "cooldown", "duration": 12 },
    ] as const,
    validRoles: ["dps"] as const,
  },
  "zerith-var-third-moons-chosen": {
    id: "zerith-var-third-moons-chosen" as const,
    abilityId: 214162,
    name: "Third Moon's Chosen",
    companionId: "zerith-var" as const,
    skillLineId: "companion-zerith-var" as const,
    skillType: "passive" as const,
    description: "Decreases ability cooldowns by 3% and increases Health by 3%.",
    icon: "/esoui/art/icons/ability_companion_zerith_passive.dds",
    effects: [
      {
        "type": "passive",
        "value": -0.03,
        "metricId": "companion-ability-cooldown",
        "modifierType": "fractional-change",
      },
      {
        "type": "passive",
        "value": 0.03,
        "metricId": "companion-health-maximum",
        "modifierType": "fractional-change",
      },
    ] as const,
    validRoles: [] as const,
  },
  "zerith-var-varmiinas-visage": {
    id: "zerith-var-varmiinas-visage" as const,
    abilityId: 213157,
    name: "Varmiina's Visage",
    companionId: "zerith-var" as const,
    skillLineId: "companion-zerith-var-warriors-banishment" as const,
    skillType: "active" as const,
    description:
      "Your Companion launches a nightmarish exploding skull at an enemy, dealing $1 Flame Damage.",
    icon: "/esoui/art/icons/ability_companion_necromancer_flameskull.dds",
    effects: [
      {
        "type": "damage",
        "target": { "type": "enemy", "range": 28, "scope": "single" },
        "formula": {
          "type": "metric-scaling",
          "metricId": "companion-weapon-damage",
          "coefficient": 3,
        },
        "damageType": "flame",
      },
      { "type": "cast-time", "duration": 0.3 },
      { "type": "cooldown", "duration": 8 },
    ] as const,
    validRoles: ["dps"] as const,
  },
} as const satisfies Record<string, CompanionSkillTemplate>

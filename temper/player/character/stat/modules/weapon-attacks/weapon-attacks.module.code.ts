import type { WeaponSlot } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"

export type WeaponAttack = { readonly light: number; readonly heavy: number }

export type WeaponStats = {
  readonly magickaMaximum: number
  readonly staminaMaximum: number
  readonly powerWeapon: number
  readonly powerSpell: number
}

type Equation = { readonly stat: number; readonly power: number; readonly plus: number }

type Attacks = { readonly light: readonly Equation[]; readonly heavy: readonly Equation[] }

const MELEE_LIGHT: Equation = { stat: 0.05, power: 0.525, plus: 0 }

const RANGED_LIGHT: Equation = { stat: 0.045, power: 0.4725, plus: 0 }

const DESTRUCTION_HEAVY: Equation = { stat: 0.0714039, power: 0.749735, plus: 0.269411 }

const DUAL_WIELD_HEAVY: Equation = { stat: 0.0238667, power: 0.249732, plus: -1.11937 }

const ATTACKS = {
  "one-hand": {
    light: [MELEE_LIGHT],
    heavy: [{ stat: 0.0665825, power: 0.700291, plus: -0.315486 }],
  },
  "dual-wield": { light: [MELEE_LIGHT], heavy: [DUAL_WIELD_HEAVY, DUAL_WIELD_HEAVY] },
  "two-handed": { light: [MELEE_LIGHT], heavy: [DESTRUCTION_HEAVY] },
  bow: { light: [RANGED_LIGHT], heavy: [{ stat: 0.0952325, power: 1.00025, plus: -1.07371 }] },
  "inferno-staff": { light: [RANGED_LIGHT], heavy: [DESTRUCTION_HEAVY] },
  "ice-staff": { light: [RANGED_LIGHT], heavy: [DESTRUCTION_HEAVY] },
  "lightning-staff": {
    light: [RANGED_LIGHT],
    heavy: [
      { stat: 0.021905, power: 0.23, plus: 0 },
      { stat: 0.0656395, power: 0.690629, plus: -1.2514 },
    ],
  },
  "restoration-staff": {
    light: [RANGED_LIGHT],
    heavy: [{ stat: 0.01369, power: 0.14375, plus: 0 }],
  },
} as const satisfies Record<string, Attacks>

export type WeaponStyle = keyof typeof ATTACKS

const TWO_HANDED: ReadonlySet<string> = new Set(["greatsword", "battleaxe", "maul"])

const ONE_HANDED: ReadonlySet<string> = new Set(["sword", "axe", "mace", "dagger"])

const RANGED: ReadonlySet<string> = new Set([
  "bow",
  "inferno-staff",
  "ice-staff",
  "lightning-staff",
  "restoration-staff",
])

function isRanged(type: string): type is WeaponStyle {
  return RANGED.has(type)
}

export function weaponStyleOf(bar: WeaponSlot): WeaponStyle | undefined {
  const main = bar["main-hand"]
  if (main.itemType !== "weapon") return undefined
  const type: string = main.data.type
  if (TWO_HANDED.has(type)) return "two-handed"
  if (isRanged(type)) return type
  if (!ONE_HANDED.has(type)) return undefined
  const off = bar["off-hand"]
  return off.itemType === "weapon" && ONE_HANDED.has(off.data.type) ? "dual-wield" : "one-hand"
}

function dealt(equations: readonly Equation[], stat: number, power: number): number {
  return equations.reduce((sum, one) => sum + one.stat * stat + one.power * power + one.plus, 0)
}

export function weaponAttackOf(style: WeaponStyle | undefined, stats: WeaponStats): WeaponAttack {
  if (style === undefined) return { light: 0, heavy: 0 }
  const stat = Math.max(stats.magickaMaximum, stats.staminaMaximum)
  const power = Math.max(stats.powerWeapon, stats.powerSpell)
  const attacks: Attacks = ATTACKS[style]
  return { light: dealt(attacks.light, stat, power), heavy: dealt(attacks.heavy, stat, power) }
}

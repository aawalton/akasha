export const PLAYER_WEAPON_TYPE_TO_ESO = {
  "no-type": 0,
  "axe": 1,
  "mace": 2,
  "sword": 3,
  "greatsword": 4,
  "battleaxe": 5,
  "maul": 6,
  "bow": 8,
  "restoration-staff": 9,
  "dagger": 11,
  "inferno-staff": 12,
  "ice-staff": 13,
  "lightning-staff": 15,
} as const

export const PLAYER_ARMOR_TYPE_TO_ESO = {
  "no-weight": 0,
  "light": 1,
  "medium": 2,
  "heavy": 3,
  "shield": 0,
} as const

export const PLAYER_QUALITY_TO_ESO = {
  "normal": 1,
  "fine": 2,
  "superior": 3,
  "epic": 4,
  "legendary": 5,
  "mythic": 5,
} as const satisfies Record<string, number>

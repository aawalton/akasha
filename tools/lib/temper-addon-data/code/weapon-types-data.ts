import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  weaponTypes: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly esoWeaponType: string; readonly validSlots: readonly string[]; readonly weaponPower: number; readonly isTwoHanded: boolean; readonly enchantmentMultiplier: number; readonly skillLineId: string }>; readonly ids: readonly string[] }
}>("@temper/game-characters-equipment/weapons/weapon-types-data")

export const weaponTypes = held.weaponTypes

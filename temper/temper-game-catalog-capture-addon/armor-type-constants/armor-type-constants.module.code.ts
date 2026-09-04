import "@akasha/temper-eso-types/eso-enums-07"

export function buildArmorTypes(): Record<string, number> {
  return {
    ARMORTYPE_NONE: ARMORTYPE_NONE,
    ARMORTYPE_LIGHT: ARMORTYPE_LIGHT,
    ARMORTYPE_MEDIUM: ARMORTYPE_MEDIUM,
    ARMORTYPE_HEAVY: ARMORTYPE_HEAVY,
  }
}

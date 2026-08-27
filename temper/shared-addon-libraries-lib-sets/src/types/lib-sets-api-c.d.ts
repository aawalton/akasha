interface LibSetsLib {
  IsArmorTypeSet: (
    this: void,
    setId: number | undefined,
    armorType: number | undefined
  ) => boolean | undefined
  IsLightArmorSet: (this: void, setId: number | undefined) => boolean
  IsMediumArmorSet: (this: void, setId: number | undefined) => boolean
  IsHeavyArmorSet: (this: void, setId: number | undefined) => boolean
  IsAllArmorSet: (this: void, setId: number | undefined) => boolean
  IsArmorSet: (this: void, setId: number | undefined) => boolean
  IsJewelrySet: (this: void, setId: number | undefined) => boolean
  IsWeaponSet: (this: void, setId: number | undefined) => boolean
  IsWeaponTypeSet: (
    this: void,
    setId: number | undefined,
    weaponType: number | undefined
  ) => boolean
  IsEquipTypeSet: (this: void, setId: number | undefined, equipType: number | undefined) => boolean

  GetAllArmorTypeSets: (this: void, armorType: number | undefined) => unknown
  GetAllArmorSets: (this: void) => unknown
  GetAllJewelrySets: (this: void) => unknown
  GetAllWeaponSets: (this: void) => unknown
  GetAllWeaponTypeSets: (this: void, weaponType: number | undefined) => unknown
  GetAllEquipTypeSets: (this: void, equipType: number | undefined) => unknown
}

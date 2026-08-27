import { asNumberOpt, asPresent } from "../casts"

const lib = LibSets

const equipTypes: number[] = [
  EQUIP_TYPE_HEAD,
  EQUIP_TYPE_NECK,
  EQUIP_TYPE_CHEST,
  EQUIP_TYPE_SHOULDERS,
  EQUIP_TYPE_ONE_HAND,
  EQUIP_TYPE_TWO_HAND,
  EQUIP_TYPE_OFF_HAND,
  EQUIP_TYPE_WAIST,
  EQUIP_TYPE_LEGS,
  EQUIP_TYPE_FEET,
  EQUIP_TYPE_COSTUME,
  EQUIP_TYPE_RING,
  EQUIP_TYPE_HAND,
  EQUIP_TYPE_MAIN_HAND,
  EQUIP_TYPE_POISON,
]
const equipTypeIcons: { [equipType: number]: string } = {}

function getEquipSlotTexture(
  this: void,
  equipSlot: number
): LuaMultiReturn<[string | undefined, string, string]> {
  if (ZO_IsTableEmpty(equipTypeIcons)) {
    for (const [, equipType] of ipairs(equipTypes)) {
      const equipTypeIcon = ITEM_FILTER_UTILS.GetEquipTypeFilterIcons(equipType)
      if (equipTypeIcon !== undefined && equipTypeIcon.up !== undefined) {
        equipTypeIcons[equipType] = equipTypeIcon.up
      } else {
        const equipmentTypeToEquipmentFilterTypesMissingIcons: { [k: number]: number } = {
          [EQUIP_TYPE_ONE_HAND]: EQUIPMENT_FILTER_TYPE_ONE_HANDED,
          [EQUIP_TYPE_TWO_HAND]: EQUIPMENT_FILTER_TYPE_TWO_HANDED,
        }
        const equipmentFilterType = equipmentTypeToEquipmentFilterTypesMissingIcons[equipType]
        if (equipmentFilterType !== undefined) {
          const equipmentTypeData =
            ITEM_FILTER_UTILS.GetEquipmentFilterTypeFilterDisplayInfo(equipmentFilterType)
          if (
            equipmentTypeData !== undefined &&
            equipmentTypeData.icons !== undefined &&
            equipmentTypeData.icons.up !== undefined
          ) {
            equipTypeIcons[equipType] = equipmentTypeData.icons.up
          }
        }
      }
    }
  }
  const equipTypeName = GetString("SI_EQUIPTYPE", equipSlot)
  let equipTypeNameStr = equipTypeName
  const equipTypeTexture = equipTypeIcons[equipSlot]
  if (equipTypeTexture !== undefined) {
    equipTypeNameStr = zo_iconTextFormat(equipTypeTexture, 24, 24, equipTypeName, undefined)
  }
  return $multi(equipTypeTexture, equipTypeNameStr, equipTypeName)
}
lib.GetEquipSlotTexture = getEquipSlotTexture

const twoHandWeaponTypes: { [weaponType: number]: boolean } = {
  [WEAPONTYPE_TWO_HANDED_AXE]: true,
  [WEAPONTYPE_TWO_HANDED_HAMMER]: true,
  [WEAPONTYPE_TWO_HANDED_SWORD]: true,
}

function getWeaponTypeText(this: void, weaponType: number | undefined): string | undefined {
  if (weaponType === undefined) {
    return undefined
  }
  const weaponTypeText = GetString("SI_WEAPONTYPE", weaponType)
  if (twoHandWeaponTypes[weaponType] !== true) {
    return weaponTypeText
  } else {
    return "2HD " + weaponTypeText
  }
}
lib.GetWeaponTypeText = getWeaponTypeText

const weaponTypes: number[] = [
  WEAPONTYPE_AXE,
  WEAPONTYPE_HAMMER,
  WEAPONTYPE_SWORD,
  WEAPONTYPE_TWO_HANDED_SWORD,
  WEAPONTYPE_TWO_HANDED_AXE,
  WEAPONTYPE_TWO_HANDED_HAMMER,
  WEAPONTYPE_BOW,
  WEAPONTYPE_HEALING_STAFF,
  WEAPONTYPE_RUNE,
  WEAPONTYPE_DAGGER,
  WEAPONTYPE_FIRE_STAFF,
  WEAPONTYPE_FROST_STAFF,
  WEAPONTYPE_LIGHTNING_STAFF,
  WEAPONTYPE_SHIELD,
]
const weaponTypeIcons: { [weaponType: number]: string } = {}

function getWeaponTypeTexture(
  this: void,
  pWeaponType: number
): LuaMultiReturn<[string | undefined, string | undefined, string | undefined]> {
  if (ZO_IsTableEmpty(weaponTypeIcons)) {
    for (const [, weaponType] of ipairs(weaponTypes)) {
      const weaponTypeIcon = ITEM_FILTER_UTILS.GetWeaponTypeFilterIcons(weaponType)
      if (weaponTypeIcon !== undefined && weaponTypeIcon.up !== undefined) {
        weaponTypeIcons[weaponType] = weaponTypeIcon.up
      } else {
        const equipmentTypeToWeaponTypesMissingIcons: { [k: number]: number } = {
          [WEAPONTYPE_BOW]: EQUIPMENT_FILTER_TYPE_BOW,
          [WEAPONTYPE_HEALING_STAFF]: EQUIPMENT_FILTER_TYPE_RESTO_STAFF,
        }
        const equipmentFilterType = equipmentTypeToWeaponTypesMissingIcons[weaponType]
        if (equipmentFilterType !== undefined) {
          const equipmentTypeData =
            ITEM_FILTER_UTILS.GetEquipmentFilterTypeFilterDisplayInfo(equipmentFilterType)
          if (
            equipmentTypeData !== undefined &&
            equipmentTypeData.icons !== undefined &&
            equipmentTypeData.icons.up !== undefined
          ) {
            weaponTypeIcons[weaponType] = equipmentTypeData.icons.up
          }
        }
      }
    }
  }
  const weaponTypeName = getWeaponTypeText(pWeaponType)
  let weaponTypeNameStr = weaponTypeName
  const weaponTypeTexture = weaponTypeIcons[pWeaponType]
  if (weaponTypeTexture !== undefined) {
    weaponTypeNameStr = zo_iconTextFormat(
      weaponTypeTexture,
      24,
      24,
      weaponTypeName ?? "",
      undefined
    )
  }
  return $multi(weaponTypeTexture, weaponTypeNameStr, weaponTypeName)
}
lib.GetWeaponTypeTexture = getWeaponTypeTexture

const armorEquipmentTypes: number[] = [
  EQUIPMENT_FILTER_TYPE_LIGHT,
  EQUIPMENT_FILTER_TYPE_MEDIUM,
  EQUIPMENT_FILTER_TYPE_HEAVY,
  EQUIPMENT_FILTER_TYPE_NECK,
  EQUIPMENT_FILTER_TYPE_ONE_HANDED,
  EQUIPMENT_FILTER_TYPE_RING,
  EQUIPMENT_FILTER_TYPE_SHIELD,
  EQUIPMENT_FILTER_TYPE_TWO_HANDED,
  EQUIPMENT_FILTER_TYPE_DESTRO_STAFF,
  EQUIPMENT_FILTER_TYPE_RESTO_STAFF,
  EQUIPMENT_FILTER_TYPE_BOW,
]
const armorTypeIcons: { [armorEquipmentType: number]: string } = {}

function getArmorTypeTexture(
  this: void,
  pArmorType: number
): LuaMultiReturn<[string | undefined, string, string]> {
  if (ZO_IsTableEmpty(armorTypeIcons)) {
    for (const [, armorEquipmentType] of ipairs(armorEquipmentTypes)) {
      const equipmentTypeData =
        ITEM_FILTER_UTILS.GetEquipmentFilterTypeFilterDisplayInfo(armorEquipmentType)
      if (
        equipmentTypeData !== undefined &&
        equipmentTypeData.icons !== undefined &&
        equipmentTypeData.icons.up !== undefined
      ) {
        armorTypeIcons[armorEquipmentType] = equipmentTypeData.icons.up
      }
    }
  }
  const armorTypeName = GetString("SI_ARMORTYPE", pArmorType)
  let armorTypeNameStr = armorTypeName
  const armorTypeTexture = armorTypeIcons[pArmorType]
  if (armorTypeTexture !== undefined) {
    armorTypeNameStr = zo_iconTextFormat(armorTypeTexture, 24, 24, armorTypeName, undefined)
  }
  return $multi(armorTypeTexture, armorTypeNameStr, armorTypeName)
}
lib.GetArmorTypeTexture = getArmorTypeTexture

function libSets_GetSetTypeTexture(
  this: void,
  setType: number | undefined,
  setId?: number,
  classId?: number
): string | undefined {
  let setTypeResolved = setType
  const classData = lib.classData
  const setTypeToTexture = lib.setTypeToTexture
  if (setTypeResolved === undefined && setId === undefined) {
    return undefined
  }
  if (setTypeResolved === undefined) {
    setTypeResolved = lib.GetSetType(asPresent(setId))
  }

  let setTypeTexture: string | undefined
  let classIdResolved = classId
  if (setTypeResolved !== undefined) {
    if (setTypeResolved === LIBSETS_SETTYPE_CLASS) {
      if (classIdResolved === undefined) {
        const setInfoForClassId = lib.GetSetInfo(asPresent(setId))
        classIdResolved =
          setInfoForClassId !== undefined ? asNumberOpt(setInfoForClassId["classId"]) : undefined
      }
      if (classIdResolved !== undefined) {
        setTypeTexture = asPresent(classData.icons)[classIdResolved]
      }
    }
    if (setTypeTexture === undefined) {
      setTypeTexture = setTypeToTexture[setTypeResolved]
    }
  }
  return setTypeTexture
}
lib.GetSetTypeTexture = libSets_GetSetTypeTexture

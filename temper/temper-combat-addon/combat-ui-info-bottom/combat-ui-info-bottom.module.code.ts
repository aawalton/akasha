import {
  getFoodDrinkItemLinkFromAbilityId,
  getFormattedAbilityIcon,
  getFormattedAbilityName,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import { ARMOR_COLORS, getEnchantQuality } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { getFightData } from "@akasha/temper-combat-addon/combat-ui-state"
import type { GearItemControl } from "@akasha/temper-combat-addon/combat-ui-tooltips"

const EQUIP_SLOTS: Array<[number, string]> = [
  [EQUIP_SLOT_MAIN_HAND, "EsoUI/Art/CharacterWindow/gearslot_mainhand.dds"],
  [EQUIP_SLOT_OFF_HAND, "EsoUI/Art/CharacterWindow/gearslot_offhand.dds"],
  [EQUIP_SLOT_BACKUP_MAIN, "EsoUI/Art/CharacterWindow/gearslot_mainhand.dds"],
  [EQUIP_SLOT_BACKUP_OFF, "EsoUI/Art/CharacterWindow/gearslot_offhand.dds"],
  [EQUIP_SLOT_HEAD, "EsoUI/Art/CharacterWindow/gearslot_head.dds"],
  [EQUIP_SLOT_SHOULDERS, "EsoUI/Art/CharacterWindow/gearslot_shoulders.dds"],
  [EQUIP_SLOT_CHEST, "EsoUI/Art/CharacterWindow/gearslot_chest.dds"],
  [EQUIP_SLOT_HAND, "EsoUI/Art/CharacterWindow/gearslot_hands.dds"],
  [EQUIP_SLOT_WAIST, "EsoUI/Art/CharacterWindow/gearslot_belt.dds"],
  [EQUIP_SLOT_LEGS, "EsoUI/Art/CharacterWindow/gearslot_legs.dds"],
  [EQUIP_SLOT_FEET, "EsoUI/Art/CharacterWindow/gearslot_feet.dds"],
  [EQUIP_SLOT_NECK, "EsoUI/Art/CharacterWindow/gearslot_neck.dds"],
  [EQUIP_SLOT_RING1, "EsoUI/Art/CharacterWindow/gearslot_ring.dds"],
  [EQUIP_SLOT_RING2, "EsoUI/Art/CharacterWindow/gearslot_ring.dds"],
]

export function updateBottomInfoPanel(this: void, panel: Control): undefined {
  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const charData = fightData.charData
  if (charData == null) {
    return undefined
  }

  const equipdata = charData.equip ?? {}

  const poison1 = equipdata[EQUIP_SLOT_POISON] ?? ""
  const poison2 = equipdata[EQUIP_SLOT_BACKUP_POISON] ?? ""

  for (const [i, slotData] of ipairs(EQUIP_SLOTS)) {
    const slot = slotData[0]
    const texture = slotData[1]

    const equipline = panel.GetNamedChild(`EquipLine${i}`)
    if (equipline == null) {
      continue
    }
    const label = equipline.GetNamedChild<LabelControl & GearItemControl>("ItemLink")
    const icon = equipline.GetNamedChild<TextureControl>("Icon")
    const icon2 = equipline.GetNamedChild<TextureControl>("Icon2")
    const trait = equipline.GetNamedChild<LabelControl>("Trait")
    const enchant = equipline.GetNamedChild<LabelControl & GearItemControl>("Enchant")

    const item = equipdata[slot] ?? ""

    const armortype = GetItemLinkArmorType(item)
    const color: [number, number, number, number] = (item.length > 0
      ? ARMOR_COLORS[armortype]
      : undefined) ?? [0, 0, 0, 1]
    const color2: [number, number, number, number] =
      item.length > 0 ? [1, 1, 1, 1] : [0.5, 0.5, 0.5, 1]

    label?.SetText(item)

    if (label != null) {
      label.itemLink = item === "" ? undefined : item
    }

    icon?.SetTexture(texture)
    icon?.SetColor(...color)
    icon?.SetBlendMode(TEX_BLEND_MODE_ADD)

    icon2?.SetTexture(texture)
    icon2?.SetColor(...color2)
    icon2?.SetBlendMode(TEX_BLEND_MODE_ADD)

    const [traitType] = GetItemLinkTraitInfo(item)
    const traitName = traitType > 0 ? GetString("SI_ITEMTRAITTYPE", traitType) : ""

    trait?.SetText(traitName)

    let enchantString: string
    let enchantColor: [number, number, number, number] = [1, 1, 1, 1]

    if ((slot === EQUIP_SLOT_MAIN_HAND || slot === EQUIP_SLOT_OFF_HAND) && poison1.length > 0) {
      enchantString = poison1
      if (enchant != null) {
        enchant.itemLink = poison1
      }
    } else if (
      (slot === EQUIP_SLOT_BACKUP_MAIN || slot === EQUIP_SLOT_BACKUP_OFF) &&
      poison2.length > 0
    ) {
      enchantString = poison2
      if (enchant != null) {
        enchant.itemLink = poison2
      }
    } else {
      const [, enchantHeader, enchantDescription] = GetItemLinkEnchantInfo(item)
      const [trimmedHeader] = string.gsub(
        enchantHeader,
        GetString(SI_TEMPER_COMBAT_ENCHANTMENT_TRIM),
        ""
      )
      enchantString = trimmedHeader
      if (enchant != null) {
        enchant.enchantDescription = enchantDescription
        enchant.itemLink = ""
      }
      const quality = getEnchantQuality(item)
      const [r, g, b, a] = GetItemQualityColor(quality).UnpackRGBA()
      enchantColor = [r, g, b, a]
    }

    enchant?.SetText(enchantString)
    enchant?.SetColor(...enchantColor)
  }
  return undefined
}

function valueOrder(
  this: void,
  t: Record<string | number, number>,
  a: string | number,
  b: string | number
): boolean {
  return (t[a] ?? 0) < (t[b] ?? 0)
}

function updateMiscPanelItem(
  this: void,
  control: Control,
  data: Record<string | number, number>,
  childName: "Mundus" | "DrinkFood" | "Potions"
): undefined {
  const numItems = NonContiguousCount(data)

  if (numItems === 0) {
    control.SetHidden(true)
    return undefined
  }

  let num = 0
  for (const [key] of spairs(data, valueOrder)) {
    num = num + 1
    let label: string
    let texture: string
    if (typeof key === "number") {
      if (childName === "Mundus") {
        label = getFormattedAbilityName(key)
        texture = getFormattedAbilityIcon(key)
      } else {
        label = getFoodDrinkItemLinkFromAbilityId(key) ?? ""
        texture = GetItemLinkIcon(label)
      }
    } else {
      label = key
      texture = GetItemLinkIcon(label)
    }
    control.GetNamedChild<LabelControl>(`Name${num}`)?.SetText(label)
    control.GetNamedChild<TextureControl>(`Icon${num}`)?.SetTexture(texture)
    if (num >= 2) {
      break
    }
  }

  const icon1 = control.GetNamedChild("Icon1")
  const iconSize = control.GetNamedChild("Icon2")?.GetWidth() ?? 0
  icon1?.ClearAnchors()
  if (numItems === 1) {
    icon1?.SetDimensions(1.3 * iconSize, 1.3 * iconSize)
    icon1?.SetAnchor(LEFT)
    control.GetNamedChild("Name2")?.SetHidden(true)
    control.GetNamedChild("Icon2")?.SetHidden(true)
  } else {
    icon1?.SetDimensions(iconSize, iconSize)
    icon1?.SetAnchor(TOPLEFT)
    control.GetNamedChild("Name2")?.SetHidden(false)
    control.GetNamedChild("Icon2")?.SetHidden(false)
  }
  control.SetHidden(false)
  return undefined
}

export function updateMiscInfoPanel(this: void, panel: Control): undefined {
  const mundusControl = panel.GetNamedChild("Mundus")
  const drinksFoodsControl = panel.GetNamedChild("DrinkFood")
  const potionsControl = panel.GetNamedChild("Potions")
  if (mundusControl == null || drinksFoodsControl == null || potionsControl == null) {
    return undefined
  }

  const fightData = getFightData()
  const buildInfo = fightData?.calculated?.buildInfo

  if (buildInfo == null) {
    mundusControl.SetHidden(true)
    drinksFoodsControl.SetHidden(true)
    potionsControl.SetHidden(true)
    return undefined
  }

  updateMiscPanelItem(mundusControl, buildInfo.mundus, "Mundus")
  updateMiscPanelItem(drinksFoodsControl, buildInfo.drinkFood, "DrinkFood")
  updateMiscPanelItem(potionsControl, buildInfo.potions, "Potions")
  return undefined
}

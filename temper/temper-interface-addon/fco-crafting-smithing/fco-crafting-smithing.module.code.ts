import { smithingImproveBlockImprovement } from "../fco-crafting-smithing-improve/fco-crafting-smithing-improve.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import { createOrGet } from "../fco-utils/fco-utils.module.code.ts"

interface HorizontalScrollListControl extends Control {
  GetSelectedIndex: (this: HorizontalScrollListControl) => number | undefined
  SetSelectedIndex: (this: HorizontalScrollListControl, index: number) => void
  onSelectedDataChangedCallback?: unknown
}

interface SmithingPatternListControl extends Control {
  horizontalScrollList?: HorizontalScrollListControl
}

interface ChangeArmorTypeButtonControl extends ButtonControl {
  armorType?: number
  tooltip?: string
  updateTextureAndText: (this: void, self: ChangeArmorTypeButtonControl, armorType?: number) => void
}

function isChangeArmorTypeButton(
  this: void,
  value: unknown
): value is ChangeArmorTypeButtonControl {
  return typeof value === "object" && value !== undefined
}

function isControl(this: void, value: unknown): value is Control {
  return typeof value === "object" && value !== undefined
}

function asControlOrUndefined(this: void, value: unknown): Control | undefined {
  return isControl(value) ? value : undefined
}

function isSmithingPatternListControl(
  this: void,
  value: unknown
): value is SmithingPatternListControl {
  return typeof value === "object" && value !== undefined
}

let craftingCreateChangeArmorTypeButton: ChangeArmorTypeButtonControl | undefined

let armorTypeIdsCache: { light: number; medium: number } | undefined
function armorTypeIds(this: void): { light: number; medium: number } {
  if (armorTypeIdsCache === undefined) {
    const apiVersionSmaller100026 = GetAPIVersion() < 100026
    armorTypeIdsCache = {
      light: apiVersionSmaller100026
        ? SI_TRADING_HOUSE_BROWSE_ARMOR_TYPE_LIGHT
        : SI_ARMORTYPE_TRADINGHOUSECATEGORY1,
      medium: apiVersionSmaller100026
        ? SI_TRADING_HOUSE_BROWSE_ARMOR_TYPE_MEDIUM
        : SI_ARMORTYPE_TRADINGHOUSECATEGORY2,
    }
  }
  return armorTypeIdsCache
}

export function setArmorTypeSwitchButtonHiddenForCraftType(
  this: void,
  tradeskillType: unknown
): undefined {
  if (craftingCreateChangeArmorTypeButton !== undefined) {
    if (tradeskillType === CRAFTING_TYPE_CLOTHIER) {
      craftingCreateChangeArmorTypeButton.SetHidden(false)
    } else {
      craftingCreateChangeArmorTypeButton.SetHidden(true)
    }
  }
}

export function smithingModifications(this: void): undefined {
  smithingCreate()
  smithingImprove()
}

function getHorizontalScrollList(this: void): HorizontalScrollListControl | undefined {
  const ctrlVars = STATE.ctrlVars
  const patternListListRaw = ctrlVars.smithingCreatePanelPatternListList
  if (!isSmithingPatternListControl(patternListListRaw)) {
    return undefined
  }
  if (patternListListRaw.horizontalScrollList === undefined) {
    return undefined
  }
  return patternListListRaw.horizontalScrollList
}

function onCraftingCreateChangeArmorTypeButtonClicked(
  this: void,
  buttonCtrl: ChangeArmorTypeButtonControl | undefined
): undefined {
  const isShiftKeyPressed = IsShiftKeyDown()
  const horizontalScrollList = getHorizontalScrollList()
  if (horizontalScrollList === undefined) {
    return
  }
  if (buttonCtrl === undefined || buttonCtrl.armorType === undefined) {
    return
  }
  ZO_Tooltips_HideTextTooltip()
  const nextArmorTypes: Record<number, number> = {
    [armorTypeIds().light]: armorTypeIds().medium,
    [armorTypeIds().medium]: armorTypeIds().light,
  }
  const currentArmorType = buttonCtrl.armorType
  const nextArmorType = nextArmorTypes[currentArmorType]
  if (nextArmorType === undefined) {
    return
  }
  const currentSelectedIndex = horizontalScrollList.GetSelectedIndex()
  const minIndex = 0
  const maxIndex = -14
  const armorPartCount = 8
  const armorsData: Record<number, { startIndex: number; endIndex: number }> = {
    [armorTypeIds().light]: { startIndex: minIndex, endIndex: -7 },
    [armorTypeIds().medium]: { startIndex: -8, endIndex: maxIndex },
  }
  let armorData: { startIndex: number; endIndex: number } | undefined
  if (isShiftKeyPressed || currentSelectedIndex === undefined) {
    armorData = armorsData[nextArmorType]
  } else {
    armorData = armorsData[currentArmorType]
  }
  if (armorData === undefined) {
    return
  }
  if (armorData.startIndex === undefined) {
    return
  }
  let newIndex: number | undefined
  if (isShiftKeyPressed || currentSelectedIndex === undefined) {
    newIndex = armorData.startIndex
  } else {
    let correctionIndex = 0
    if (currentArmorType === armorTypeIds().light) {
      if (
        currentSelectedIndex !== minIndex &&
        currentSelectedIndex <= minIndex - 1 &&
        currentSelectedIndex >= armorPartCount * -1
      ) {
        correctionIndex = 1
      }
      newIndex = currentSelectedIndex - (armorPartCount - correctionIndex)
    } else if (currentArmorType === armorTypeIds().medium) {
      if (
        currentSelectedIndex !== minIndex &&
        currentSelectedIndex <= minIndex - 1 &&
        currentSelectedIndex <= armorPartCount * -1
      ) {
        let correctionVar = 1
        if (currentSelectedIndex === minIndex - armorPartCount) {
          correctionVar = 0
        }
        correctionIndex = correctionVar
      }
      newIndex = currentSelectedIndex + (armorPartCount - correctionIndex)
    }
  }
  if (newIndex !== undefined && newIndex !== minIndex && newIndex * -1 < minIndex) {
    newIndex = minIndex
  }
  if (
    newIndex !== undefined &&
    newIndex !== minIndex &&
    newIndex !== maxIndex &&
    newIndex * -1 > maxIndex * -1
  ) {
    newIndex = maxIndex
  }
  if (newIndex === undefined) {
    return
  }
  buttonCtrl.updateTextureAndText(buttonCtrl, nextArmorType)
  horizontalScrollList.SetSelectedIndex(newIndex)
}

export function smithingCreateOnLeftOrRight(this: void): undefined {
  zo_callLater(() => {
    const horizontalScrollList = getHorizontalScrollList()
    if (horizontalScrollList === undefined) {
      return
    }
    const currentSelectedIndex = horizontalScrollList.GetSelectedIndex()
    if (currentSelectedIndex === undefined) {
      return
    }
    const selectedScrollListIndices2AmorType: Record<number, number> = {
      [0]: armorTypeIds().light,
      [-1]: armorTypeIds().light,
      [-2]: armorTypeIds().light,
      [-3]: armorTypeIds().light,
      [-4]: armorTypeIds().light,
      [-5]: armorTypeIds().light,
      [-6]: armorTypeIds().light,
      [-7]: armorTypeIds().light,
      [-8]: armorTypeIds().medium,
      [-9]: armorTypeIds().medium,
      [-10]: armorTypeIds().medium,
      [-11]: armorTypeIds().medium,
      [-12]: armorTypeIds().medium,
      [-13]: armorTypeIds().medium,
      [-14]: armorTypeIds().medium,
    }
    const armorType = selectedScrollListIndices2AmorType[currentSelectedIndex]
    if (craftingCreateChangeArmorTypeButton !== undefined) {
      craftingCreateChangeArmorTypeButton.updateTextureAndText(
        craftingCreateChangeArmorTypeButton,
        armorType
      )
    }
  }, 50)
}

let SMITHING_HORIZONTAL_SCROLL_LIST_MOVE_HOOKED = false

export function smithingCreateAddArmorTypeSwitchButton(this: void): undefined {
  if (STATE.settingsVars.settings.smithingCreationAddArmorTypeSwitchButton !== true) {
    if (craftingCreateChangeArmorTypeButton !== undefined) {
      craftingCreateChangeArmorTypeButton.SetHidden(true)
    }
    return
  }
  if (craftingCreateChangeArmorTypeButton !== undefined) {
    craftingCreateChangeArmorTypeButton.SetHidden(false)
  }
  if (craftingCreateChangeArmorTypeButton === undefined) {
    const ctrlVars = STATE.ctrlVars

    const baseButton = createOrGet(
      "FCOCS_ChangeArmorTypeButton",
      ZO_SmithingTopLevelCreationPanel,
      CT_BUTTON
    )
    if (!isChangeArmorTypeButton(baseButton)) {
      return
    }
    const button = baseButton
    craftingCreateChangeArmorTypeButton = button
    button.SetDimensions(32, 32)
    button.SetAnchor(
      RIGHT,
      asControlOrUndefined(ctrlVars.smithingCreatePanelPatternListTitle),
      LEFT,
      -16,
      0
    )
    button.updateTextureAndText = (
      self: ChangeArmorTypeButtonControl,
      armorType?: number
    ): undefined => {
      const effectiveArmorType = armorType ?? armorTypeIds().light
      const updateValues: Record<
        number,
        {
          armorType: number
          tooltip: string
          NormalTexture: string
          PressedTexture: string
          MouseOverTexture: string
        }
      > = {
        [armorTypeIds().light]: {
          armorType: armorTypeIds().light,
          tooltip: GetString(armorTypeIds().medium),
          NormalTexture: "/esoui/art/icons/crafting_medium_armor_component_005.dds",
          PressedTexture: "/esoui/art/icons/crafting_medium_armor_component_005.dds",
          MouseOverTexture: "/esoui/art/buttons/checkbox_mouseover.dds",
        },
        [armorTypeIds().medium]: {
          armorType: armorTypeIds().medium,
          tooltip: GetString(armorTypeIds().light),
          NormalTexture: "/esoui/art/icons/crafting_light_armor_component_006.dds",
          PressedTexture: "/esoui/art/icons/crafting_light_armor_component_006.dds",
          MouseOverTexture: "/esoui/art/buttons/checkbox_mouseover.dds",
        },
      }
      const updateValue = updateValues[effectiveArmorType]
      if (updateValue === undefined) {
        return
      }
      self.armorType = updateValue.armorType
      self.tooltip = updateValue.tooltip
      self.SetNormalTexture(updateValue.NormalTexture)
      self.SetPressedTexture(updateValue.PressedTexture)
      self.SetMouseOverTexture(updateValue.MouseOverTexture)
    }
    button.updateTextureAndText(button, armorTypeIds().light)
    button.SetHandler("OnClicked", (self: unknown) => {
      if (isChangeArmorTypeButton(self)) {
        onCraftingCreateChangeArmorTypeButtonClicked(self)
      }
    })
    button.SetHandler("OnMouseEnter", (self: unknown) => {
      if (isChangeArmorTypeButton(self)) {
        ZO_Tooltips_ShowTextTooltip(self, LEFT, self.tooltip)
      }
    })
    button.SetHandler("OnMouseExit", () => {
      ZO_Tooltips_HideTextTooltip()
    })
    button.SetHidden(false)

    const horizontalScrollList = getHorizontalScrollList()
    if (horizontalScrollList === undefined) {
      return
    }
    if (
      horizontalScrollList.onSelectedDataChangedCallback === undefined ||
      horizontalScrollList.onSelectedDataChangedCallback === false
    ) {
      return
    }
    if (!SMITHING_HORIZONTAL_SCROLL_LIST_MOVE_HOOKED) {
      ZO_PreHook(horizontalScrollList, "MoveLeft", smithingCreateOnLeftOrRight)
      ZO_PreHook(horizontalScrollList, "MoveRight", smithingCreateOnLeftOrRight)
      SMITHING_HORIZONTAL_SCROLL_LIST_MOVE_HOOKED = true
    }
  }
}

export function smithingCreate(this: void): undefined {
  smithingCreateAddArmorTypeSwitchButton()
}

export function smithingImprove(this: void): undefined {
  smithingImproveBlockImprovement()
}

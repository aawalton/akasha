import {
  COLOR_USEABLE,
  TEXTURE_REAGENTUNKNOWN,
} from "akasha/temper/crafting-addon/potion-constants/potion-constants.module.code.ts"
import { asFields } from "akasha/temper/crafting-addon/potion-controls-helpers/potion-controls-helpers.module.code.ts"
import {
  asControlHandler,
  xPosMustNotFilter,
} from "akasha/temper/crafting-addon/potion-controls-layout/potion-controls-layout.module.code.ts"
import { getAccountSettings } from "akasha/temper/crafting-addon/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/crafting-addon/potion-state/potion-state.module.code.ts"
import { isScreenRightHalf } from "akasha/temper/crafting-addon/potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type { IngredientView } from "akasha/temper/crafting-addon/potion-types/potion-types.module.code.ts"

type TooltipTextSetter = (
  this: void,
  tooltip: TooltipControl,
  text: string,
  color: ZoColorDef
) => undefined

function asTooltipTextSetter(value: unknown): TooltipTextSetter {
  return value as TooltipTextSetter
}

const xPosSolventFilter = xPosMustNotFilter + 196

function solventTipEnter(this: void, sender: Control): undefined {
  const solvent = asFields(sender).solvent
  if (solvent === undefined) {
    return
  }
  for (const p of solvent.pack) {
    const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
    if (stack > 0) {
      if (isScreenRightHalf(sender)) {
        InitializeTooltip(ItemTooltip, sender, TOPRIGHT, -10, -96, TOPLEFT)
      } else {
        InitializeTooltip(ItemTooltip, sender, TOPLEFT, 10, -96, TOPRIGHT)
      }
      ItemTooltip.SetBagItem(p.bagId, p.slotIndex)
      return
    }
  }
  if (isScreenRightHalf(sender)) {
    InitializeTooltip(InformationTooltip, sender, TOPRIGHT, -10, 0, TOPLEFT)
  } else {
    InitializeTooltip(InformationTooltip, sender, TOPLEFT, 10, 0, TOPRIGHT)
  }
  asTooltipTextSetter(SetTooltipText)(
    InformationTooltip,
    solvent.name,
    ZO_TOOLTIP_INSTRUCTIONAL_COLOR
  )
}
function solventTipExit(this: void): undefined {
  ClearTooltip(ItemTooltip)
  ClearTooltip(InformationTooltip)
}
function reagentTipEnter(this: void, sender: Control): undefined {
  PotMaker.showReagentTip(sender, true)
}
function reagentTipExit(this: void, sender: Control): undefined {
  PotMaker.showReagentTip(sender, false)
}

function updateControls(this: void): undefined {
  for (const v of PotMaker.SolventFilterControls) {
    v.SetHidden(true)
  }

  const solventOrder: IngredientView[] = []
  for (const [, solvent] of pairs(PotMaker.Inventory.solvents)) {
    if (solvent.stack > 0) {
      solventOrder[solventOrder.length] = solvent
    }
  }
  table.sort(solventOrder, function (this: void, a: IngredientView, b: IngredientView): boolean {
    if (a.level === b.level) {
      return a.itemId < b.itemId
    }
    return a.level < b.level
  })

  for (let index = 1; index <= solventOrder.length; index++) {
    let control = PotMaker.SolventFilterControls[index - 1]
    if (control === undefined) {
      const controlName = "TemperPotionsSolvent" + tostring(index)
      control = CreateControlFromVirtual(
        controlName,
        TemperPotionsSearchBG,
        "TemperPotionsToggleButton"
      )
      control.SetHandler("OnMouseEnter", asControlHandler(solventTipEnter))
      control.SetHandler("OnMouseExit", asControlHandler(solventTipExit))
      control.EnableMouseButton(MOUSE_BUTTON_INDEX_RIGHT, true)
      control.SetHandler("OnClicked", asControlHandler(PotMaker.SolventClicked))
      PotMaker.SolventFilterControls[index - 1] = control
    } else {
      control.SetHidden(false)
    }
    const solvent = solventOrder[index - 1]
    if (solvent === undefined) {
      continue
    }
    const iconControl = control.GetNamedChild<TextureControl>("Texture")
    if (iconControl !== undefined) {
      iconControl.SetTexture(solvent.icon)
      const [r, g, b] = (solvent.protected === true ? STAT_LOWER_COLOR : COLOR_USEABLE).UnpackRGB()
      iconControl.SetColor(r, g, b)
    }
    const numControl = control.GetNamedChild<LabelControl>("Number")
    if (numControl !== undefined) {
      numControl.SetText(solvent.stack)
    }
    const fields = asFields(control)
    fields.text = solvent.name
    fields.solvent = solvent
    const height = control.GetHeight() + 4
    const pos = index - 1
    control.SetSimpleAnchorParent(
      xPosSolventFilter + height * (pos % 3),
      8 + height * math.floor(pos / 3)
    )
  }

  const saveSelection: Record<number, boolean> = {}
  const numChildren = TemperPotionsReagentBG.GetNumChildren()
  for (let i = 1; i <= numChildren; i++) {
    const checkBox = TemperPotionsReagentBG.GetChild<TemperCraftingControl>(i)
    if (checkBox !== undefined) {
      const reagent = asFields(checkBox).reagent
      if (
        !checkBox.IsControlHidden() &&
        PotMaker.ToggleButtonIsChecked(checkBox) &&
        reagent !== undefined
      ) {
        saveSelection[reagent.itemId] = true
      }
      checkBox.SetHidden(true)
    }
  }

  const reagentOrder: IngredientView[] = []
  for (const [, ingredient] of pairs(PotMaker.Inventory.reagents)) {
    reagentOrder[reagentOrder.length] = ingredient
  }
  const accountSettings = getAccountSettings()
  if (accountSettings.reagentStackOrder) {
    table.sort(reagentOrder, function (this: void, a: IngredientView, b: IngredientView): boolean {
      if (a.stack === b.stack) {
        return a.name < b.name
      }
      return a.stack > b.stack
    })
  } else {
    table.sort(reagentOrder, function (this: void, a: IngredientView, b: IngredientView): boolean {
      return a.name < b.name
    })
  }

  for (let index = 1; index <= reagentOrder.length; index++) {
    let control = PotMaker.ReagentFilterControls[index - 1]
    if (control === undefined) {
      const controlName = "TemperPotionsReagent" + tostring(index)
      control = CreateControlFromVirtual(
        controlName,
        TemperPotionsReagentBG,
        "TemperPotionsReagent"
      )
      control.SetHandler("OnMouseEnter", asControlHandler(reagentTipEnter))
      control.SetHandler("OnMouseExit", asControlHandler(reagentTipExit))
      control.EnableMouseButton(MOUSE_BUTTON_INDEX_RIGHT, true)
      control.SetHandler("OnClicked", asControlHandler(PotMaker.ReagentClicked))
      PotMaker.ReagentFilterControls[index - 1] = control
    } else {
      control.SetHidden(false)
    }
    const ingredient = reagentOrder[index - 1]
    if (ingredient === undefined) {
      continue
    }
    control.SetSimpleAnchorParent(
      16 + 40 * ((index - 1) % 12),
      5 + (control.GetHeight() + 2) * math.floor((index - 1) / 12)
    )
    asFields(control).reagent = ingredient
    const iconControl = control.GetNamedChild<TextureControl>("Texture")
    if (iconControl !== undefined) {
      iconControl.SetTexture(ingredient.stack > 0 ? ingredient.icon : TEXTURE_REAGENTUNKNOWN)
      const [r, g, b] = (
        ingredient.protected === true ? STAT_LOWER_COLOR : COLOR_USEABLE
      ).UnpackRGB()
      iconControl.SetColor(r, g, b)
    }
    const numControl = control.GetNamedChild<LabelControl>("Number")
    if (numControl !== undefined) {
      numControl.SetText(ingredient.stack)
    }
    PotMaker.SetToggleButton(
      control,
      saveSelection[ingredient.itemId] === true
        ? TRISTATE_CHECK_BUTTON_CHECKED
        : TRISTATE_CHECK_BUTTON_UNCHECKED
    )
  }
}
PotMaker.updateControls = updateControls

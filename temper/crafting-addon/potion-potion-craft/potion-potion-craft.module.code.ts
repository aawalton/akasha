import { getPlayerSettings } from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import { isThirdAlchemySlotUnlocked } from "../potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type { Potion } from "../potion-types/potion-types.module.code.ts"

function swapSound(
  this: void,
  slot: Record<string, unknown>,
  source: string,
  destination: string
): undefined {
  slot[destination] = slot[source]
  slot[source] = undefined
}
function muteSlot(this: void, slot: Record<string, unknown>): undefined {
  swapSound(slot, "placeSound", "placeSoundBackup")
  swapSound(slot, "removeSound", "removeSoundBackup")
}
function restoreSlot(this: void, slot: Record<string, unknown>): undefined {
  swapSound(slot, "placeSoundBackup", "placeSound")
  swapSound(slot, "removeSoundBackup", "removeSound")
}

interface AlchemyClass {
  ResetSelectedTab: (this: void, ...args: unknown[]) => unknown
  ClearSelections: (
    this: void,
    self: unknown,
    suppressSound?: boolean,
    ignoreUsabilityRequirement?: boolean,
    ...rest: unknown[]
  ) => unknown
}
function asAlchemyClass(value: unknown): AlchemyClass {
  return value as AlchemyClass
}
const ZO_AlchemyClass = asAlchemyClass(ZO_Alchemy)
const orgResetSelectedTab = ZO_AlchemyClass.ResetSelectedTab
ZO_AlchemyClass.ResetSelectedTab = function (this: void, ...args: unknown[]): unknown {
  const orgClearSelections = ZO_AlchemyClass.ClearSelections
  ZO_AlchemyClass.ClearSelections = function (
    this: void,
    self: unknown,
    _suppressSound?: boolean,
    _ignoreUsabilityRequirement?: boolean,
    ...rest: unknown[]
  ): unknown {
    ZO_AlchemyClass.ClearSelections = orgClearSelections
    return orgClearSelections(self, true, true, ...rest)
  }
  return orgResetSelectedTab(...args)
}

function addToCraftTable(this: void, potion: Potion): undefined {
  const playerSettings = getPlayerSettings()
  const hasThreeSlots = playerSettings.fakeThirdSlot || isThirdAlchemySlotUnlocked()
  if (
    potion !== undefined &&
    PotMaker.atAlchemyStation &&
    (hasThreeSlots || potion.ingredients.length < 3)
  ) {
    const negativeClick = SOUNDS.NEGATIVE_CLICK ?? ""
    if (CRAFTING_RESULTS.craftingProcessCompleted === false) {
      PlaySound(negativeClick)
      return
    }

    interface AlchemyControllerInventory {
      dirty: boolean
      PerformFullRefresh: (this: AlchemyControllerInventory) => undefined
    }
    interface AlchemyController {
      solventSlot: Record<string, unknown>
      inventory: AlchemyControllerInventory
      HasSelections: (this: AlchemyController) => boolean
      ClearSelections: (
        this: AlchemyController,
        suppressSound: boolean,
        ignoreUsabilityRequirement: boolean
      ) => undefined
      SetSolventItem: (this: AlchemyController, bagId: number, slotIndex: number) => undefined
      AddItemToCraft: (this: AlchemyController, bagId: number, slotIndex: number) => undefined
      OnWorkbenchUpdated: (this: AlchemyController) => undefined
    }
    function asAlchemyController(value: unknown): AlchemyController {
      return value as AlchemyController
    }
    const alchemy: AlchemyController = asAlchemyController(
      IsInGamepadPreferredMode() ? GAMEPAD_ALCHEMY : ALCHEMY
    )
    muteSlot(alchemy.solventSlot)

    if (alchemy.HasSelections()) {
      alchemy.ClearSelections(true, true)
    }
    if (PotMaker.atAlchemyStation && alchemy.inventory.dirty) {
      alchemy.inventory.PerformFullRefresh()
    }

    let wasProtected = false
    const solvent = potion.solvent
    if (solvent !== undefined && solvent.pack !== undefined) {
      for (const p of solvent.pack) {
        if (p === undefined) {
          continue
        }
        const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
        if (stack > 0) {
          if (!PotMaker.IsProtected(p.bagId, p.slotIndex)) {
            alchemy.SetSolventItem(p.bagId, p.slotIndex)
            wasProtected = false
            break
          } else {
            wasProtected = true
          }
        }
      }
    }
    for (const v of potion.ingredients) {
      if (v === undefined) {
        continue
      }
      let itemProtected = false
      for (const p of v.pack) {
        if (p === undefined) {
          continue
        }
        const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
        if (stack > 0) {
          if (!PotMaker.IsProtected(p.bagId, p.slotIndex)) {
            itemProtected = false
            alchemy.AddItemToCraft(p.bagId, p.slotIndex)
            break
          } else {
            itemProtected = true
          }
        }
      }
      wasProtected = wasProtected || itemProtected
    }

    restoreSlot(alchemy.solventSlot)

    if (wasProtected) {
      ZO_Alert(UI_ALERT_CATEGORY_ALERT, negativeClick, PotMaker.language.item_saver_protected)
    }
    if (IsInGamepadPreferredMode()) {
      alchemy.OnWorkbenchUpdated()
    }
    CRAFT_ADVISOR_MANAGER.FireCallbacks("SelectedQuestConditionsUpdated")
  }
}

function resetCheckboxes(this: void, list: Control[]): undefined {
  const setToggleButton = PotMaker.SetToggleButton
  for (const checkBox of list) {
    if (checkBox !== undefined) {
      setToggleButton(checkBox, TRISTATE_CHECK_BUTTON_INDETERMINATE)
    }
  }
}

function clearFilter(this: void): undefined {
  resetCheckboxes(PotMaker.PositiveTraitControls)
  resetCheckboxes(PotMaker.NegativeTraitControls)
  resetCheckboxes(PotMaker.SolventFilterControls)
  ZO_CheckButton_SetCheckState(TemperPotionsAllMustNotCheckBox, false)
}

PotMaker.AddToCraftTable = addToCraftTable
PotMaker.ClearFilter = clearFilter

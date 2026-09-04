import { STATE } from "../fco-state/fco-state.module.code.ts"

const houseBankMenuBar = ZO_HouseBankMenuBar

const BANKING_BAG_ID_TO_MENU_BAR: Readonly<Record<number, BankMenuBar | undefined>> = {
  [BAG_BACKPACK]: ZO_PlayerInventoryMenuBar,
  [BAG_BANK]: ZO_PlayerBankMenuBar,
  [BAG_GUILDBANK]: ZO_GuildBankMenuBar,
  [BAG_HOUSE_BANK_ONE]: houseBankMenuBar,
  [BAG_HOUSE_BANK_TWO]: houseBankMenuBar,
  [BAG_HOUSE_BANK_THREE]: houseBankMenuBar,
  [BAG_HOUSE_BANK_FOUR]: houseBankMenuBar,
  [BAG_HOUSE_BANK_FIVE]: houseBankMenuBar,
  [BAG_HOUSE_BANK_SIX]: houseBankMenuBar,
  [BAG_HOUSE_BANK_SEVEN]: houseBankMenuBar,
  [BAG_HOUSE_BANK_EIGHT]: houseBankMenuBar,
  [BAG_HOUSE_BANK_NINE]: houseBankMenuBar,
  [BAG_HOUSE_BANK_TEN]: houseBankMenuBar,
}

const HOUSE_BANK_DESCRIPTORS: Readonly<Record<number, number>> = {
  [SI_BANK_DEPOSIT]: SI_BANK_WITHDRAW,
  [SI_BANK_WITHDRAW]: SI_BANK_DEPOSIT,
}

const BANKING_BAG_ID_TO_DESCRIPTORS: Readonly<Record<number, Readonly<Record<number, number>>>> = {
  [BAG_BACKPACK]: {
    [SI_BANK_DEPOSIT]: SI_BANK_WITHDRAW,
    [SI_BANK_WITHDRAW]: SI_BANK_DEPOSIT,
  },
  [BAG_BANK]: {
    [SI_BANK_DEPOSIT]: SI_BANK_WITHDRAW,
    [SI_BANK_WITHDRAW]: SI_BANK_DEPOSIT,
  },
  [BAG_GUILDBANK]: {
    [SI_BANK_DEPOSIT]: SI_BANK_WITHDRAW,
    [SI_BANK_WITHDRAW]: SI_BANK_DEPOSIT,
  },
  [BAG_HOUSE_BANK_ONE]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_TWO]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_THREE]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_FOUR]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_FIVE]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_SIX]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_SEVEN]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_EIGHT]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_NINE]: HOUSE_BANK_DESCRIPTORS,
  [BAG_HOUSE_BANK_TEN]: HOUSE_BANK_DESCRIPTORS,
}

const SM = SCENE_MANAGER

const SCENE_HOOKS_DONE_AT: Record<string, boolean> = {}

export function enableCharacterFragment(this: void, where: string | undefined): undefined {
  if (where === undefined || where === "") {
    return
  }
  const settings = STATE.settingsVars.settings

  const whereToSceneByName: Readonly<Record<string, string>> = {
    bank: "bank",
    guildbank: "guildBank",
  }

  const bankFragments: readonly SceneFragment[] = [
    CHARACTER_WINDOW_FRAGMENT,
    CHARACTER_WINDOW_STATS_FRAGMENT,
    LEFT_PANEL_BG_FRAGMENT,
  ]
  const whereToAddNewFragments: Readonly<Record<string, readonly SceneFragment[]>> = {
    bank: bankFragments,
    guildbank: bankFragments,
  }

  const sceneToHookName = whereToSceneByName[where]
  if (sceneToHookName === undefined || sceneToHookName === "") {
    return
  }
  const sceneToHook = SM.GetScene(sceneToHookName)
  if (sceneToHook === undefined) {
    return
  }
  const fragmentsToAddNew = whereToAddNewFragments[where]
  if (fragmentsToAddNew === undefined) {
    return
  }

  const removeFragments = (): undefined => {
    for (const fragmentToAddNew of fragmentsToAddNew) {
      sceneToHook.RemoveFragment(fragmentToAddNew)
    }
  }

  const sceneStateChange = (
    _oldState: number,
    newState: number,
    whereWasItDone: string | undefined
  ): undefined => {
    if (whereWasItDone !== undefined && SCENE_HOOKS_DONE_AT[whereWasItDone] === true) {
      if (whereWasItDone === "bank" && settings.showCharacterPanelAtBank !== true) {
        removeFragments()
        return
      }
      if (whereWasItDone === "guildbank" && settings.showCharacterPanelAtGuildBank !== true) {
        removeFragments()
        return
      }
    }
    if (newState === SCENE_SHOWN) {
      for (const fragmentToAddNew of fragmentsToAddNew) {
        sceneToHook.AddFragment(fragmentToAddNew)
      }
    } else if (newState === SCENE_HIDDEN) {
      removeFragments()
    }
  }

  if (
    (where === "bank" && settings.showCharacterPanelAtBank === true) ||
    (where === "guildbank" && settings.showCharacterPanelAtGuildBank === true)
  ) {
    SCENE_HOOKS_DONE_AT[where] = true
    sceneToHook.RegisterCallback("StateChange", function (this: void, oldState, newState) {
      sceneStateChange(oldState, newState, where)
    })
  }
}

function getMenuBar(this: void, bankBagId: number): BankMenuBar | undefined {
  return BANKING_BAG_ID_TO_MENU_BAR[bankBagId]
}

function getMenuBarAndNotSelectedDescriptor(
  this: void,
  bankBagId: number
): LuaMultiReturn<[BankMenuBar | undefined, number | undefined]> {
  const menuBar = getMenuBar(bankBagId)
  if (menuBar === undefined) {
    return $multi(undefined, undefined)
  }
  const selectedDescriptor = menuBar.m_object.m_clickedButton.m_buttonData.descriptor
  if (selectedDescriptor === undefined) {
    return $multi(undefined, undefined)
  }
  const descriptorsForBag = BANKING_BAG_ID_TO_DESCRIPTORS[bankBagId]
  const nonSelectedDescriptor =
    descriptorsForBag !== undefined ? descriptorsForBag[selectedDescriptor] : undefined
  return $multi(menuBar, nonSelectedDescriptor)
}

function getMenuBarAndDescriptor(
  this: void
): LuaMultiReturn<[BankMenuBar | undefined, number | undefined]> {
  let bankBagId: number | undefined
  if (IsBankOpen()) {
    bankBagId = GetBankingBag()
  } else if (IsGuildBankOpen()) {
    if (ZO_SelectGuildBankDialog.IsHidden()) {
      bankBagId = BAG_GUILDBANK
    }
  }
  if (bankBagId === undefined || bankBagId <= 0) {
    return $multi(undefined, undefined)
  }
  const [menuBar, descriptorNew] = getMenuBarAndNotSelectedDescriptor(bankBagId)
  if (menuBar === undefined || descriptorNew === undefined) {
    return $multi(undefined, undefined)
  }
  return $multi(menuBar, descriptorNew)
}

export function switchBankMenuBarDescriptor(this: void): undefined {
  const [categoryBar, category] = getMenuBarAndDescriptor()
  if (categoryBar === undefined || category === undefined) {
    return
  }
  ZO_MenuBar_SelectDescriptor(categoryBar, category, true)
}

export function bankChanges(this: void): undefined {
  enableCharacterFragment("bank")
  enableCharacterFragment("guildbank")
}

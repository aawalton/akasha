import { STATE } from "../fco-state/fco-state.module.code.ts"

const ENTRIES_PER_PAGE = 100
const MAX_PAGES = 400

let SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_INIT_WAS_DONE = false
let SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_SET_SELECTED_EVENT_CATEGORY_WAS_DONE = false
let SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_PREV_AND_NEXT_PAGE_WAS_DONE = false
let SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_GET_MORE_KEYBIND_WAS_DONE = false
let REFRESH_LOADING_SPINNER_CHECK = false

const guildHistoryKB = GUILD_HISTORY_KEYBOARD

interface GuildHistoryNavButton extends ButtonControl {
  data?: { tooltip?: string }
  SetDisabledTexture: (this: GuildHistoryNavButton, texture: string) => void
}
let guildHistoryNavFirstButton: GuildHistoryNavButton | undefined
let guildHistoryNavLastButton: GuildHistoryNavButton | undefined

function isGuildHistoryNavButton(this: void, ctrl: Control): ctrl is GuildHistoryNavButton {
  return "SetDisabledTexture" in ctrl
}

function parseHookArgs(this: void, args: never[]): unknown[] {
  return args
}

function isGuildHistoryKeyboard(this: void, value: unknown): value is GuildHistoryKeyboard {
  return type(value) === "table"
}

function getGuildHistoryCurrentCategoryListPages(this: void): number {
  if (guildHistoryKB !== undefined && guildHistoryKB.SetCurrentPage !== undefined) {
    const masterList = guildHistoryKB.masterList
    const numEntriesTotal = masterList !== undefined ? masterList.length : 1
    if (numEntriesTotal <= 1) {
      return 1
    }
    let numEntriesOfSubcategory = 0

    const selectedSubcategoryIndex = guildHistoryKB.selectedSubcategoryIndex
    for (let i = 1; i <= numEntriesTotal; i = i + 1) {
      const data = masterList?.[i - 1]
      if (data !== undefined && selectedSubcategoryIndex === data.GetUISubcategoryIndex()) {
        numEntriesOfSubcategory = numEntriesOfSubcategory + 1
      }
    }
    if (numEntriesOfSubcategory < 1) {
      numEntriesOfSubcategory = 1
    }

    const lastPageVal = numEntriesOfSubcategory / ENTRIES_PER_PAGE
    let lastPage = zo_ceil(lastPageVal)
    if (lastPage === 0) {
      lastPage = 1
    }
    return lastPage
  }
  return 1
}

function showFirstPage(this: void): undefined {
  if (guildHistoryKB !== undefined && guildHistoryKB.SetCurrentPage !== undefined) {
    if (guildHistoryKB.currentPage === 1) {
      return
    }
    guildHistoryKB.SetCurrentPage(1, false)
  }
}

function showLastPage(this: void): undefined {
  if (guildHistoryKB !== undefined && guildHistoryKB.SetCurrentPage !== undefined) {
    const lastPage = getGuildHistoryCurrentCategoryListPages()
    if (guildHistoryKB.currentPage === lastPage) {
      return
    }
    guildHistoryKB.SetCurrentPage(lastPage, false)
  }
}

let AUTO_JUMP_TO_NEXT_GUILD_HISTORY_PAGE = false
export function recursivelyAutoNavigateToLastGuildHistoryPage(this: void): undefined {
  AUTO_JUMP_TO_NEXT_GUILD_HISTORY_PAGE = false
  if (
    guildHistoryKB === undefined ||
    guildHistoryKB.hasNextPage === undefined ||
    guildHistoryKB.ShowNextPage === undefined
  ) {
    return
  }
  let lastPage = getGuildHistoryCurrentCategoryListPages()
  if (lastPage > MAX_PAGES) {
    lastPage = MAX_PAGES
  }

  const currentPage = guildHistoryKB.currentPage
  if (currentPage === undefined) {
    return
  }
  if (lastPage <= currentPage) {
    return
  }

  if (currentPage < lastPage && guildHistoryKB.hasNextPage === true) {
    AUTO_JUMP_TO_NEXT_GUILD_HISTORY_PAGE = true
    guildHistoryKB.ShowNextPage()
  }
}

function updateFirstAndLastNavButtonsVisibleState(
  this: void,
  _comingFromSetPage?: boolean,
  currentPageArg?: number,
  advanceToLastPage?: boolean
): undefined {
  if (guildHistoryKB === undefined || guildHistoryKB.initialized !== true) {
    return
  }

  if (guildHistoryNavFirstButton !== undefined || guildHistoryNavLastButton !== undefined) {
    const doHide = STATE.settingsVars.settings.addGuildHistoryNavigationFirstAndLastPage !== true
    guildHistoryNavFirstButton?.SetHidden(doHide)
    guildHistoryNavLastButton?.SetHidden(doHide)

    if (doHide === true) {
      return
    }

    let lastPage = getGuildHistoryCurrentCategoryListPages()
    if (lastPage === undefined) {
      lastPage = 1
    }
    const currentPage = currentPageArg ?? guildHistoryKB.currentPage

    if (guildHistoryNavFirstButton !== undefined) {
      if (currentPage !== undefined && currentPage === 1) {
        guildHistoryNavFirstButton.SetEnabled(false)
      } else {
        guildHistoryNavFirstButton.SetEnabled(true)
      }
    }
    if (guildHistoryNavLastButton !== undefined) {
      if (
        guildHistoryKB.hasNextPage !== true ||
        (currentPage !== undefined && currentPage >= lastPage)
      ) {
        guildHistoryNavLastButton.SetEnabled(false)
      } else {
        guildHistoryNavLastButton.SetEnabled(true)
        guildHistoryNavLastButton.data = {
          tooltip: `Last page: ${lastPage}`,
        }

        if (advanceToLastPage === true) {
          showLastPage()
        }
      }
    }
  }
}

function showTooltip(
  this: void,
  ctrl: GuildHistoryNavButton | undefined,
  isFirstButton: boolean
): undefined {
  ZO_Tooltips_HideTextTooltip()
  if (ctrl === undefined || ctrl.data === undefined || ctrl.data.tooltip === undefined) {
    return
  }
  ZO_Tooltips_ShowTextTooltip(ctrl, isFirstButton ? LEFT : RIGHT, ctrl.data.tooltip)
}

function createGuildHistoryFirstAndLastNavigationButtons(this: void): undefined {
  if (STATE.settingsVars.settings.addGuildHistoryNavigationFirstAndLastPage !== true) {
    return
  }

  const guildHistoryCtrl = guildHistoryKB?.control
  if (guildHistoryCtrl === undefined) {
    return
  }
  const footerCtrl = guildHistoryCtrl.GetNamedChild("Footer")
  if (footerCtrl === undefined) {
    return
  }
  const prevButton = footerCtrl.GetNamedChild("PreviousButton")
  if (prevButton === undefined) {
    return
  }
  const nextButton = footerCtrl.GetNamedChild("NextButton")
  if (nextButton === undefined) {
    return
  }
  const firstPageButton = CreateControl(
    "FCOChangeStuff_GuildHistory_Nav_FirstPageButton",
    footerCtrl,
    CT_BUTTON
  )
  if (isGuildHistoryNavButton(firstPageButton)) {
    guildHistoryNavFirstButton = firstPageButton
  }
  if (guildHistoryNavFirstButton !== undefined) {
    const firstBtn = guildHistoryNavFirstButton
    firstBtn.SetHidden(true)
    firstBtn.SetDimensions(64, 64)
    firstBtn.ClearAnchors()
    firstBtn.SetHandler("OnClicked", () => {
      showFirstPage()
    })
    firstBtn.data = {
      tooltip: "First page",
    }
    firstBtn.SetHandler("OnMouseEnter", () => {
      showTooltip(firstBtn, true)
    })
    firstBtn.SetHandler("OnMouseExit", () => {
      ZO_Tooltips_HideTextTooltip()
    })
    firstBtn.SetNormalTexture("EsoUI/Art/Buttons/large_leftArrow_up.dds")
    firstBtn.SetPressedTexture("EsoUI/Art/Buttons/large_leftArrow_down.dds")
    firstBtn.SetMouseOverTexture("EsoUI/Art/Buttons/large_leftArrow_over.dds")
    firstBtn.SetDisabledTexture("EsoUI/Art/Buttons/large_leftArrow_disabled.dds")
    firstBtn.SetAnchor(RIGHT, prevButton, LEFT, -10, 0)
  }
  const lastPageButton = CreateControl(
    "FCOChangeStuff_GuildHistory_Nav_LastPageButton",
    footerCtrl,
    CT_BUTTON
  )
  if (isGuildHistoryNavButton(lastPageButton)) {
    guildHistoryNavLastButton = lastPageButton
  }
  if (guildHistoryNavLastButton !== undefined) {
    const lastBtn = guildHistoryNavLastButton
    lastBtn.SetHidden(true)
    lastBtn.SetDimensions(64, 64)
    lastBtn.ClearAnchors()
    lastBtn.SetHandler("OnClicked", () => {
      showLastPage()
    })
    lastBtn.SetHandler("OnMouseEnter", () => {
      showTooltip(lastBtn, false)
    })
    lastBtn.SetHandler("OnMouseExit", () => {
      ZO_Tooltips_HideTextTooltip()
    })
    lastBtn.SetNormalTexture("EsoUI/Art/Buttons/large_rightArrow_up.dds")
    lastBtn.SetPressedTexture("EsoUI/Art/Buttons/large_rightArrow_down.dds")
    lastBtn.SetMouseOverTexture("EsoUI/Art/Buttons/large_rightArrow_over.dds")
    lastBtn.SetDisabledTexture("EsoUI/Art/Buttons/large_rightArrow_disabled.dds")
    lastBtn.SetAnchor(LEFT, nextButton, RIGHT, 10, 0)
  }
}

function addFirstAndLastPageControlsToGuildHistoryNavigation(this: void): undefined {
  if (guildHistoryKB === undefined || guildHistoryKB.initialized !== true) {
    return
  }
  if (guildHistoryNavFirstButton === undefined && guildHistoryNavLastButton === undefined) {
    createGuildHistoryFirstAndLastNavigationButtons()
  }
  updateFirstAndLastNavButtonsVisibleState()
}

function callDelayedUpdateOfFirstAndLastNavButtonsVisibleState(
  this: void,
  delay?: number,
  currentPage?: number,
  advanceToLastPage?: boolean
): undefined {
  const resolvedDelay = delay ?? 25
  zo_callLater(() => {
    updateFirstAndLastNavButtonsVisibleState(undefined, currentPage, advanceToLastPage)
  }, resolvedDelay)
}

export function guildHistoryNavigationHelper(this: void): undefined {
  if (STATE.settingsVars.settings.addGuildHistoryNavigationFirstAndLastPage === true) {
    if (guildHistoryKB !== undefined && guildHistoryKB.initialized === true) {
      addFirstAndLastPageControlsToGuildHistoryNavigation()
    }

    if (!SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_INIT_WAS_DONE) {
      SecurePostHook(ZO_GuildHistory_Shared, "OnDeferredInitialize", () => {
        addFirstAndLastPageControlsToGuildHistoryNavigation()
      })
      SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_INIT_WAS_DONE = true
    }

    if (!SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_SET_SELECTED_EVENT_CATEGORY_WAS_DONE) {
      SecurePostHook(ZO_GuildHistory_Shared, "SetSelectedEventCategory", () => {
        REFRESH_LOADING_SPINNER_CHECK = false
        callDelayedUpdateOfFirstAndLastNavButtonsVisibleState(25)
      })
      SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_SET_SELECTED_EVENT_CATEGORY_WAS_DONE = true
    }

    if (!SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_PREV_AND_NEXT_PAGE_WAS_DONE) {
      SecurePostHook(ZO_GuildHistory_Shared, "ShowPreviousPage", () => {
        callDelayedUpdateOfFirstAndLastNavButtonsVisibleState(25)
      })
      SecurePostHook(ZO_GuildHistory_Shared, "ShowNextPage", () => {
        callDelayedUpdateOfFirstAndLastNavButtonsVisibleState(25)

        if (AUTO_JUMP_TO_NEXT_GUILD_HISTORY_PAGE === true) {
          recursivelyAutoNavigateToLastGuildHistoryPage()
        }
      })
      SecurePostHook(ZO_GuildHistory_Shared, "SetCurrentPage", (...args) => {
        const hookArgs = parseHookArgs(args)
        const newCurrentPage = tonumber(hookArgs[1])
        callDelayedUpdateOfFirstAndLastNavButtonsVisibleState(50, newCurrentPage)
      })
      SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_PREV_AND_NEXT_PAGE_WAS_DONE = true
    }

    if (!SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_GET_MORE_KEYBIND_WAS_DONE) {
      const updateHandlerName = "FCOCS_GuildHistory_TryAdvanceToLastPage"
      let triesExecuted = 0

      function tryAdvanceToLastPage(
        this: void,
        selfVar: GuildHistoryKeyboard,
        maxTries: number
      ): undefined {
        if (!REFRESH_LOADING_SPINNER_CHECK || triesExecuted >= maxTries) {
          EVENT_MANAGER.UnregisterForUpdate(updateHandlerName)
          REFRESH_LOADING_SPINNER_CHECK = false
          return
        }
        triesExecuted = triesExecuted + 1

        let showLoadingSpinner = false
        if (
          selfVar.guildId !== undefined &&
          selfVar.selectedEventCategory !== undefined &&
          selfVar.GetRequestForSelection !== undefined
        ) {
          const requestLoadingSpinner = selfVar.GetRequestForSelection()
          if (
            requestLoadingSpinner.IsRequestQueued() ||
            requestLoadingSpinner.IsRequestQueuedFromAddon() ||
            requestLoadingSpinner.IsRequestResponsePending()
          ) {
            showLoadingSpinner = true
          }
        }
        if (showLoadingSpinner === false) {
          EVENT_MANAGER.UnregisterForUpdate(updateHandlerName)
          callDelayedUpdateOfFirstAndLastNavButtonsVisibleState(50, undefined, true)
          REFRESH_LOADING_SPINNER_CHECK = false
        }

        if (triesExecuted === maxTries) {
          EVENT_MANAGER.UnregisterForUpdate(updateHandlerName)
          REFRESH_LOADING_SPINNER_CHECK = false
        }
      }

      function tryAdvancedToLastPageSetup(
        this: void,
        selfVar: GuildHistoryKeyboard,
        maxTries?: number,
        delay?: number
      ): undefined {
        const resolvedMaxTries = maxTries ?? 5
        const resolvedDelay = delay ?? 500

        triesExecuted = 0
        EVENT_MANAGER.UnregisterForUpdate(updateHandlerName)
        EVENT_MANAGER.RegisterForUpdate(updateHandlerName, resolvedDelay, () => {
          tryAdvanceToLastPage(selfVar, resolvedMaxTries)
        })
      }

      SecurePostHook(ZO_GuildHistory_Shared, "TryShowMore", (...args) => {
        const selfVar = parseHookArgs(args)[0]
        REFRESH_LOADING_SPINNER_CHECK = false
        if (!isGuildHistoryKeyboard(selfVar) || selfVar.GetRequestForSelection === undefined) {
          return
        }
        const request = selfVar.GetRequestForSelection()
        const readyState = request.RequestMoreEvents()
        if (readyState === undefined || readyState === GUILD_HISTORY_DATA_READY_STATE_ON_COOLDOWN) {
          EVENT_MANAGER.UnregisterForUpdate(updateHandlerName)
          return
        }
        REFRESH_LOADING_SPINNER_CHECK = true

        tryAdvancedToLastPageSetup(selfVar, 20, 500)
      })
      SECURE_POSTHOOK_OF_GUILD_HISTORY_KEYBOARD_GET_MORE_KEYBIND_WAS_DONE = true
    }
  } else {
    updateFirstAndLastNavButtonsVisibleState()
  }
}

export function guildHistoryChanges(this: void): undefined {
  guildHistoryNavigationHelper()
}

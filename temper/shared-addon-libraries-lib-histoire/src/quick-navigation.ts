import { internal } from "./state"
import type { LibHistoireInternal } from "./types"

const ENTRIES_PER_PAGE = 100

interface HistoryRef {
  autoRequestEnabled: boolean
  guildId: number
  selectedEventCategory: number
  selectedSubcategoryIndex: number | undefined
  cachedEventIndicesByPage: Record<number, { startIndex: number; endIndex: number }>
  SetCurrentPage: (this: HistoryRef, page: number) => void
}

interface EventCategoryDataRef {
  CanHaveRedactedEvents: (this: EventCategoryDataRef) => boolean
  GetStartingIndexForPage: (
    this: EventCategoryDataRef,
    page: number,
    entriesPerPage: number,
    subcategoryIndex: number | undefined
  ) => number | undefined
  GetStartingAndEndingIndexForPage: (
    this: EventCategoryDataRef,
    page: number,
    entriesPerPage: number,
    subcategoryIndex: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
}
interface GuildDataRef {
  GetEventCategoryData: (this: GuildDataRef, category: number) => EventCategoryDataRef
}
function asGuildDataRef(value: unknown): GuildDataRef {
  return value as GuildDataRef
}

type PreHookHandler = (this: void, ...args: unknown[]) => unknown
function asPreHookHandler(value: unknown): PreHookHandler {
  return value as PreHookHandler
}

function SwitchPageWithoutRequest(this: void, history: HistoryRef, page: number): undefined {
  const wasAutoRequestEnabled = history.autoRequestEnabled
  history.autoRequestEnabled = false
  history.SetCurrentPage(page)
  history.autoRequestEnabled = wasAutoRequestEnabled
}

function HasSubcategories(this: void, category: number): boolean {
  const info = GUILD_HISTORY_MANAGER.GetEventCategoryInfo(category)
  return info != null && info.subcategories.length > 1
}

function GetFirstPageWithGaps(
  this: void,
  history: HistoryRef
): LuaMultiReturn<[number, number | undefined, number | undefined]> {
  const numVisibleEvents =
    GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
      history.guildId,
      history.selectedEventCategory
    ) ?? 1
  let page = zo_ceil(numVisibleEvents / ENTRIES_PER_PAGE)

  let startIndex: number | undefined = (page - 1) * ENTRIES_PER_PAGE + 1
  let endIndex: number | undefined = startIndex + ENTRIES_PER_PAGE - 1

  const guildData = asGuildDataRef(GUILD_HISTORY_MANAGER.GetGuildData(history.guildId))
  const eventCategoryData = guildData.GetEventCategoryData(history.selectedEventCategory)
  if (
    eventCategoryData.CanHaveRedactedEvents() ||
    HasSubcategories(history.selectedEventCategory)
  ) {
    if (page > 1) {
      let exactStartIndex = eventCategoryData.GetStartingIndexForPage(
        page,
        ENTRIES_PER_PAGE,
        history.selectedSubcategoryIndex
      )
      const stopAtLastPage = exactStartIndex == null
      while (page > 1 && (exactStartIndex == null || exactStartIndex > startIndex)) {
        page = page - 1
        exactStartIndex = eventCategoryData.GetStartingIndexForPage(
          page,
          ENTRIES_PER_PAGE,
          history.selectedSubcategoryIndex
        )
        if (exactStartIndex != null && stopAtLastPage) {
          break
        }
      }
    }
    ;[startIndex, endIndex] = eventCategoryData.GetStartingAndEndingIndexForPage(
      page,
      ENTRIES_PER_PAGE,
      history.selectedSubcategoryIndex
    )
  }

  return $multi(page, startIndex, endIndex)
}

function OnShowPreviousPage(this: void, history: HistoryRef): boolean | undefined {
  if (IsShiftKeyDown()) {
    SwitchPageWithoutRequest(history, 1)
    return true
  }
  return undefined
}

function OnShowNextPage(this: void, history: HistoryRef): boolean | undefined {
  if (IsShiftKeyDown()) {
    const [page, startIndex, endIndex] = GetFirstPageWithGaps(history)

    if (startIndex != null && endIndex != null) {
      history.cachedEventIndicesByPage[page] = {
        startIndex,
        endIndex,
      }
    }

    SwitchPageWithoutRequest(history, page)
    return true
  }
  return undefined
}

internal.InitializeQuickNavigation = function (this: LibHistoireInternal) {
  ZO_PreHook(ZO_GuildHistory_Shared, "ShowPreviousPage", asPreHookHandler(OnShowPreviousPage))
  ZO_PreHook(ZO_GuildHistory_Shared, "ShowNextPage", asPreHookHandler(OnShowNextPage))
}

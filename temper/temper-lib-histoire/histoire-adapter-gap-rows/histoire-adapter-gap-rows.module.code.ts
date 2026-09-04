import { GuildHistoryAdapter } from "../histoire-adapter/histoire-adapter.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

interface GapEventDataRef {
  GetEventId: (this: GapEventDataRef) => number
}
interface GapScrollEntry {
  typeId: number
  data: GapEventDataRef
  GetEventIndex: (this: GapScrollEntry) => number
  SetupAsScrollListDataEntry: (this: GapScrollEntry, typeId: number) => void
}

interface GapEntryDataPool {
  AcquireObject: (this: GapEntryDataPool) => GapScrollEntry
}

interface GapSortFilterList {
  list: Control
  guildId: number
  selectedEventCategory: number
  entryDataPool: GapEntryDataPool
}

type AddDataType6 = (
  this: void,
  listControl: Control,
  typeId: number,
  templateName: string,
  height: number,
  setupCallback: undefined,
  resetControlCallback: unknown
) => void

function asAddDataType6(value: unknown): AddDataType6 {
  return value as AddDataType6
}
type GapScrollEntryArray = GapScrollEntry[]
function asGapScrollEntryArray(value: unknown): GapScrollEntryArray {
  return value as GapScrollEntryArray
}

GuildHistoryAdapter.InitializeGapRows = function (this) {
  logger.Info("Initializing gap row marker feature")
  const guildEventData = 1
  const guildEventGapData = 2

  const systemDisabled = internal.IsGuildHistorySystemDisabled()
  const addDataType = asAddDataType6(ZO_ScrollList_AddDataType)
  SecurePostHook(
    ZO_GuildHistory_Shared,
    "InitializeSortFilterList",
    function (
      this: void,
      sortFilterList: GapSortFilterList,
      rowTemplate: string,
      rowHeight: number
    ) {
      if (rowTemplate === "ZO_GuildHistoryRow_Keyboard") {
        rowTemplate = systemDisabled
          ? "LibHistoire_GuildHistoryDisabledGapRow_Keyboard"
          : "LibHistoire_GuildHistoryGapRow_Keyboard"
      } else if (rowTemplate === "ZO_GuildHistoryRow_Gamepad") {
        rowTemplate = systemDisabled
          ? "LibHistoire_GuildHistoryDisabledGapRow_Gamepad"
          : "LibHistoire_GuildHistoryGapRow_Gamepad"
      } else {
        return
      }
      addDataType(
        sortFilterList.list,
        guildEventGapData,
        rowTemplate,
        rowHeight,
        undefined,
        ZO_ObjectPool_DefaultResetControl
      )

      const dataType = ZO_ScrollList_GetDataTypeTable(sortFilterList.list, guildEventData)
      if (dataType != null) {
        dataType.hideCallback = ZO_ObjectPool_DefaultResetControl
      }
    }
  )

  SecurePostHook(
    ZO_GuildHistory_Shared,
    "FilterScrollList",
    function (this: void, sortFilterList: GapSortFilterList) {
      const scrollData = asGapScrollEntryArray(ZO_ScrollList_GetDataList(sortFilterList.list))
      const gapIndices: number[] = []

      if (scrollData.length >= 2) {
        const guildId = sortFilterList.guildId
        const category = sortFilterList.selectedEventCategory
        const hasGaplessRange =
          GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(guildId, category) != null

        for (let i = 1; i <= scrollData.length; i = i + 1) {
          const entryData = scrollData[i]
          if (entryData != null && (!hasGaplessRange || entryData.GetEventIndex() > 1)) {
            const eventId = entryData.data.GetEventId()
            const rangeIndex = GetGuildHistoryEventRangeIndexForEventId(guildId, category, eventId)
            if (rangeIndex != null) {
              const [, , newestEventId] = GetGuildHistoryEventRangeInfo(
                guildId,
                category,
                rangeIndex
              )
              if (
                newestEventId != null &&
                (eventId === newestEventId ||
                  IsGuildHistoryEventRedacted(guildId, category, newestEventId))
              ) {
                gapIndices[gapIndices.length] = i
              }
            }
          }
        }
      }

      if (systemDisabled && gapIndices[1] !== 1) {
        gapIndices.unshift(1)
      }
      for (let i = gapIndices.length; i >= 1; i = i - 1) {
        const gapIndex = gapIndices[i]
        if (gapIndex != null) {
          const prev = scrollData[gapIndex - 1]
          if (gapIndex === 1 || (prev != null && prev.typeId !== guildEventGapData)) {
            const gapData = sortFilterList.entryDataPool.AcquireObject()
            gapData.SetupAsScrollListDataEntry(guildEventGapData)
            scrollData.splice(gapIndex - 1, 0, gapData)
          }
        }
      }
    }
  )
}

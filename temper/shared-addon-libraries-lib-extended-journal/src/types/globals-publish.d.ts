declare global {
  var LibExtendedJournal: import("../shape").PublicTable
  var LibExtendedJournalInternal: import("../shape").InternalTable
  var ExtendedJournalSortFilterList: ZoSortFilterListSubclass
  var ExtendedJournalTooltipExtension: import("../tooltip-extension").TooltipExtensionClass
  var LibExtendedJournalTooltipColors:
    | Record<number, Record<number, number | undefined>>
    | undefined
}

export {}

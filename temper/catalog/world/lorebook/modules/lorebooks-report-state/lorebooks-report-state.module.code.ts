import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

interface LoreBooksReportState {
  reportShown: boolean
  copyReport: string
  eideticModeAsked: number | undefined
  loreLibraryReportKeybind: KeybindButtonGroupDescriptor[] | undefined
}

export const REPORT_STATE: LoreBooksReportState = {
  reportShown: false,
  copyReport: "",
  eideticModeAsked: undefined,
  loreLibraryReportKeybind: undefined,
}

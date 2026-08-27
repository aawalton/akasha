export interface LoreBooksReportState {
  reportShown: boolean
  copyReport: string
  eideticModeAsked: number | undefined
  loreLibraryReportKeybind: KeybindButtonGroupDescriptor[] | undefined
}

export const reportState: LoreBooksReportState = {
  reportShown: false,
  copyReport: "",
  eideticModeAsked: undefined,
  loreLibraryReportKeybind: undefined,
}

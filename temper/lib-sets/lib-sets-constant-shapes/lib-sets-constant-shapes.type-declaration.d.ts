type LibSetsLangMap<V> = { [lang: string]: V }

interface LibSetsDlcEntry {
  collectibleId?: number
  achievementCategoryId?: number
  name?: string
  type: number
  releaseDate?: number
}

interface LibSetsClassData {
  index2Id: { [classIndex: number]: number }
  id2Index: { [classId: number]: number }
  names: { [classId: number]: string }
  icons: { [classId: number]: string }
  colors: { [classId: number]: unknown }
  setsList: { [classId: number]: unknown }
}

interface LibSetsMoreOptionsButton extends ButtonControl {
  upTexture?: string
  mouseOver?: string
  clickedTexture?: string
  tooltipText?: string
  tooltipAlign?: number
}

interface LibSetsDebugLibZone {
  GetAllZoneData?: (this: LibSetsDebugLibZone) => { [lang: string]: { [zoneId: number]: string } }
  givenZoneData?: { [lang: string]: { [zoneId: number]: string } }
}

interface LibAddonMenu2Surface {
  panelId?: unknown
  OpenToPanel: (this: LibAddonMenu2Surface, panel: unknown) => void
  RegisterAddonPanel: (
    this: LibAddonMenu2Surface,
    panelName: string,
    panelData: { [key: string]: unknown }
  ) => unknown
  RegisterOptionControls: (
    this: LibAddonMenu2Surface,
    panelName: string,
    optionsTable: unknown[]
  ) => void
}

interface LibSlashCommanderAutoCompleteProvider {
  Subclass: (this: LibSlashCommanderAutoCompleteProvider) => LibSlashCommanderAutoCompleteProvider
  New: (
    this: void,
    self: LibSlashCommanderAutoCompleteProvider
  ) => LibSlashCommanderAutoCompleteProvider
  [slot: string]: unknown
}

interface LibSlashCommanderCommand {
  SetCallback: (
    this: LibSlashCommanderCommand,
    callback: (this: void, input: string) => void
  ) => void
  SetDescription: (this: LibSlashCommanderCommand, description: string) => void
  AddAlias: (this: LibSlashCommanderCommand, alias: string) => void
  HasSubCommandAlias: (this: LibSlashCommanderCommand, alias: string) => boolean
  RegisterSubCommand: (this: LibSlashCommanderCommand) => LibSlashCommanderCommand
  SetAutoComplete: (
    this: LibSlashCommanderCommand,
    provider: LibSlashCommanderAutoCompleteProvider
  ) => void
}

interface LibSlashCommanderLib {
  Register: (
    this: LibSlashCommanderLib,
    aliases: string | string[],
    callback: ((this: void, input: string) => void) | undefined,
    description: string
  ) => LibSlashCommanderCommand
  AutoCompleteProvider: LibSlashCommanderAutoCompleteProvider
}

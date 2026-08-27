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

interface LibSetsLib {
  commandsLsp?: { [langKey: string]: LibSlashCommanderCommand }
  buildLSCSetSearchAutoComplete: (this: void) => void
}

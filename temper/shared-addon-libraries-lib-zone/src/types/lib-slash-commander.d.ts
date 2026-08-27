interface LscAutoCompleteProvider {
  resultList: Record<string, string>
  lookupList: Record<string, string>
  lang: string
  GetResultList: (this: LscAutoCompleteProvider) => Record<string, string>
  GetResultFromLabel: (this: LscAutoCompleteProvider, label: string) => string
  [key: string]: unknown
}

interface LscAutoCompleteProviderClass {
  Subclass: (this: LscAutoCompleteProviderClass) => LscAutoCompleteProviderClass
  New: (this: void, parent: object) => LscAutoCompleteProvider
  [key: string]: unknown
}

interface LscSubCommand {
  AddAlias: (this: LscSubCommand, alias: string) => void
  SetDescription: (this: LscSubCommand, description: string) => void
  SetCallback: (this: LscSubCommand, callback: (this: void, input: string) => void) => void
  SetAutoComplete: (this: LscSubCommand, provider: LscAutoCompleteProvider) => void
  [key: string]: unknown
}

interface LscCommand {
  HasSubCommandAlias: (this: LscCommand, alias: string) => boolean
  RegisterSubCommand: (this: LscCommand) => LscSubCommand
  [key: string]: unknown
}

interface LibSlashCommander {
  Register: (
    this: LibSlashCommander,
    aliases: string | string[],
    callback: ((this: void) => void) | undefined,
    description: string
  ) => LscCommand
  AutoCompleteProvider: LscAutoCompleteProviderClass
  [key: string]: unknown
}

declare const LibSlashCommander: LibSlashCommander | undefined

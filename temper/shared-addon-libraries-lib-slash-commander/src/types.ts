export type CommandCallback = (this: void, input?: string) => void

export type DescriptionValue = string | ((this: void) => string) | undefined

export interface AutoCompleteProvider {
  results: Record<string, string>
  lookup: Record<string, string>
  prefix?: string
  command?: Command
  Initialize: (this: AutoCompleteProvider, data?: unknown) => void
  SetPrefix: (this: AutoCompleteProvider, prefix?: string) => void
  CanComplete: (this: AutoCompleteProvider, token: string) => boolean
  GetResultList: (this: AutoCompleteProvider) => Record<string, string>
  GetResultFromLabel: (this: AutoCompleteProvider, label: string) => string
}

export interface AutoCompleteProviderClass {
  Subclass: <T = AutoCompleteProviderClass>(this: AutoCompleteProviderClass) => T
  New: (this: void, self: object, data?: unknown) => AutoCompleteProvider
  Initialize: AutoCompleteProvider["Initialize"]
  SetPrefix: AutoCompleteProvider["SetPrefix"]
  CanComplete: AutoCompleteProvider["CanComplete"]
  GetResultList: AutoCompleteProvider["GetResultList"]
  GetResultFromLabel: AutoCompleteProvider["GetResultFromLabel"]
}

export interface AutoCompleteSlashCommandsProviderClass {
  Subclass: (this: AutoCompleteSlashCommandsProviderClass) => AutoCompleteSlashCommandsProviderClass
  New: (this: AutoCompleteSlashCommandsProviderClass) => AutoCompleteProvider
  GetResultList: (this: AutoCompleteProvider) => Record<string, string>
}

export interface AutoCompleteSubCommandsProvider extends AutoCompleteProvider {
  FormatLabel: (
    this: AutoCompleteSubCommandsProvider,
    alias: string,
    description?: string
  ) => string
}

export interface AutoCompleteSubCommandsProviderClass {
  New: (this: AutoCompleteSubCommandsProviderClass, command: Command) => AutoCompleteProvider
  FormatLabel: (
    this: AutoCompleteSubCommandsProvider,
    alias: string,
    description?: string
  ) => string
  GetResultList: (this: AutoCompleteSubCommandsProvider) => Record<string, string>
}

export interface Command {
  callback?: CommandCallback
  description?: string
  parent?: Command
  aliases: Record<string, Command | undefined>
  subCommands: LuaSet<Command>
  subCommandAliases: Record<string, Command | undefined>
  autocomplete?: AutoCompleteProvider
  Initialize: (this: Command) => void
  SetDescription: (this: Command, description?: string) => void
  GetDescription: (this: Command, alias?: string) => string | undefined
  SetCallback: (this: Command, callback?: CommandCallback) => void
  GetCallback: (this: Command) => CommandCallback | undefined
  AddAlias: (this: Command, alias: string) => void
  HasAlias: (this: Command, alias: string) => boolean
  RemoveAlias: (this: Command, alias: string) => void
  HasAncestor: (this: Command, parent?: Command) => boolean
  SetParentCommand: (this: Command, command?: Command) => void
  RegisterSubCommand: (this: Command, command?: Command) => Command
  HasSubCommand: (this: Command, command: Command) => boolean
  UnregisterSubCommand: (this: Command, command: Command) => void
  RegisterSubCommandAlias: (this: Command, alias: string, command: Command) => void
  HasSubCommandAlias: (this: Command, alias: string) => boolean
  GetSubCommandByAlias: (this: Command, alias: string) => Command | undefined
  UnregisterSubCommandAlias: (this: Command, alias: string) => void
  SetAutoComplete: (this: Command, provider?: unknown) => AutoCompleteProvider | undefined
  ShouldAutoComplete: (this: Command, token: string) => boolean
  GetAutoCompleteResults: (this: Command) => Record<string, string>
  GetAutoCompleteResultFromDisplayText: (this: Command, label: string) => string
}

export interface CommandClass {
  Subclass: (this: CommandClass) => CommandClass
  New: (this: CommandClass) => Command
  Initialize: Command["Initialize"]
  SetDescription: Command["SetDescription"]
  GetDescription: Command["GetDescription"]
  SetCallback: Command["SetCallback"]
  GetCallback: Command["GetCallback"]
  AddAlias: Command["AddAlias"]
  HasAlias: Command["HasAlias"]
  RemoveAlias: Command["RemoveAlias"]
  HasAncestor: Command["HasAncestor"]
  SetParentCommand: Command["SetParentCommand"]
  RegisterSubCommand: Command["RegisterSubCommand"]
  HasSubCommand: Command["HasSubCommand"]
  UnregisterSubCommand: Command["UnregisterSubCommand"]
  RegisterSubCommandAlias: Command["RegisterSubCommandAlias"]
  HasSubCommandAlias: Command["HasSubCommandAlias"]
  GetSubCommandByAlias: Command["GetSubCommandByAlias"]
  UnregisterSubCommandAlias: Command["UnregisterSubCommandAlias"]
  SetAutoComplete: Command["SetAutoComplete"]
  ShouldAutoComplete: Command["ShouldAutoComplete"]
  GetAutoCompleteResults: Command["GetAutoCompleteResults"]
  GetAutoCompleteResultFromDisplayText: Command["GetAutoCompleteResultFromDisplayText"]
}

export interface Lib {
  loadedFiles: Record<string, number>

  ERROR_INVALID_TYPE: string
  ERROR_HAS_NO_PARENT: string
  ERROR_ALREADY_HAS_PARENT: string
  ERROR_CIRCULAR_HIERARCHY: string
  ERROR_AUTOCOMPLETE_NOT_ACTIVE: string
  ERROR_AUTOCOMPLETE_RESULT_NOT_VALID: string
  ERROR_CALLED_WITHOUT_CALLBACK: string
  WARNING_ALREADY_HAS_ALIAS: string

  COMMAND_TYPE_BUILT_IN: number
  COMMAND_TYPE_CHAT_SWITCH: number
  COMMAND_TYPE_EMOTE: number
  COMMAND_TYPE_ADDON: number
  typeColor: Record<number, string>
  types: Record<string, number>
  descriptions: Record<string, DescriptionValue>

  Command: CommandClass
  AutoCompleteProvider: AutoCompleteProviderClass
  AutoCompleteSlashCommandsProvider: AutoCompleteSlashCommandsProviderClass
  AutoCompleteSubCommandsProvider: AutoCompleteSubCommandsProviderClass

  globalCommand?: Command
  currentCommand?: Command
  lastInput?: string
  hasCustomResults?: Command
  ignoreTextEntryChangedEvent?: boolean
  maxResults?: number

  Log: (this: void, message: string, ...args: unknown[]) => void
  IsCallable: (this: void, func: unknown) => boolean
  HasBaseClass: (this: void, baseClass: unknown, object: unknown) => boolean
  AssertIsType: (
    this: void,
    value: unknown,
    typeNameClassOrValidator: unknown,
    errorMessage?: string
  ) => void
  WrapFunction: (this: void, object: unknown, functionName: unknown, wrapper?: unknown) => void

  IsCommand: (this: void, command: unknown) => boolean
  IsAutoCompleteProvider: (this: void, provider: unknown) => boolean
  IsAutoCompleteSlashCommandsProvider: (this: void, provider: unknown) => boolean
  IsAutoCompleteSubCommandsProvider: (this: void, provider: unknown) => boolean

  AddFile: (this: Lib, file: string, version: number, callback: (lib: Lib) => void) => void
  Register: (
    this: Lib,
    aliases: string | string[] | undefined,
    callback?: CommandCallback,
    description?: string
  ) => Command
  Unregister: (this: Lib, command: Command) => void
  FormatLabel: (this: Lib, alias: string, description?: string, type?: number) => string
  GenerateLabel: (this: Lib, alias: string, description?: string) => string

  SafeStartChatInput: (this: void, text: string, channel?: number, target?: string) => void
  GetCurrentCommandAndToken: (
    this: void,
    command: Command,
    input: string
  ) => LuaMultiReturn<[Command | undefined, string]>
  Init: (this: void) => void
}

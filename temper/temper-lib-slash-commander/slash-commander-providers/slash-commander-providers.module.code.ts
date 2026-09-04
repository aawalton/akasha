import {
  asCommand,
  asStringArray,
} from "../slash-commander-casts/slash-commander-casts.module.code.ts"
import { SLASH_COMMANDER } from "../slash-commander-surface/slash-commander-surface.module.code.ts"
import type {
  AutoCompleteProvider,
  AutoCompleteProviderClass,
  AutoCompleteSlashCommandsProviderClass,
  AutoCompleteSubCommandsProvider,
  AutoCompleteSubCommandsProviderClass,
  Command,
} from "../slash-commander-types/slash-commander-types.module.code.ts"

SLASH_COMMANDER.AutoCompleteProvider = ZO_Object.Subclass<AutoCompleteProviderClass>()
const PROVIDER_TABLE = SLASH_COMMANDER.AutoCompleteProvider

SLASH_COMMANDER.IsAutoCompleteProvider = function (this: void, provider: unknown): boolean {
  return SLASH_COMMANDER.HasBaseClass(PROVIDER_TABLE, provider)
}

PROVIDER_TABLE.New = function (this: void, self: object, data?: unknown): AutoCompleteProvider {
  const obj = ZO_Object.New<AutoCompleteProvider>(self)
  obj.Initialize(data)
  return obj
}

PROVIDER_TABLE.Initialize = function (this: AutoCompleteProvider, data?: unknown): undefined {
  const results: Record<string, string> = {}
  if (type(data) === "table") {
    const list = asStringArray(data)
    for (const entry of list) {
      results[zo_strlower(entry)] = entry
    }
  }
  this.results = results
  this.lookup = {}
}

PROVIDER_TABLE.SetPrefix = function (this: AutoCompleteProvider, prefix?: string): undefined {
  if (prefix === undefined) {
    this.prefix = undefined
  } else {
    SLASH_COMMANDER.AssertIsType(prefix, "string")
    this.prefix = prefix
  }
}

PROVIDER_TABLE.CanComplete = function (this: AutoCompleteProvider, token: string): boolean {
  const prefix = this.prefix
  return prefix === undefined || string.sub(token, 1, prefix.length) === prefix
}

PROVIDER_TABLE.GetResultList = function (this: AutoCompleteProvider): Record<string, string> {
  return this.results
}

PROVIDER_TABLE.GetResultFromLabel = function (this: AutoCompleteProvider, label: string): string {
  return this.lookup[label] ?? label
}

SLASH_COMMANDER.AutoCompleteSlashCommandsProvider =
  PROVIDER_TABLE.Subclass<AutoCompleteSlashCommandsProviderClass>()
const SLASH_COMMANDS_PROVIDER = SLASH_COMMANDER.AutoCompleteSlashCommandsProvider

SLASH_COMMANDER.IsAutoCompleteSlashCommandsProvider = function (
  this: void,
  provider: unknown
): boolean {
  return SLASH_COMMANDER.HasBaseClass(SLASH_COMMANDS_PROVIDER, provider)
}

SLASH_COMMANDS_PROVIDER.New = function (
  this: AutoCompleteSlashCommandsProviderClass
): AutoCompleteProvider {
  const provider = SLASH_COMMANDER.AutoCompleteProvider.New(this)
  provider.SetPrefix("/")
  return provider
}

function addCommand(
  this: void,
  results: Record<string, string>,
  lookup: Record<string, string>,
  alias: string,
  description?: string
): undefined {
  const label = SLASH_COMMANDER.GenerateLabel(alias, description)
  if (label !== alias) {
    lookup[label] = alias
  }
  results[zo_strlower(alias)] = label
}

SLASH_COMMANDS_PROVIDER.GetResultList = function (
  this: AutoCompleteProvider
): Record<string, string> {
  const results: Record<string, string> = {}
  const lookup: Record<string, string> = {}
  for (const [alias, command] of pairs(SLASH_COMMANDS)) {
    let description: string | undefined
    if (SLASH_COMMANDER.IsCommand(command)) {
      description = asCommand(command).GetDescription()
    }
    addCommand(results, lookup, alias, description)
  }
  const switchLookup = ZO_ChatSystem_GetChannelSwitchLookupTable()
  for (const [alias] of pairs(switchLookup)) {
    if (type(alias) === "string") {
      addCommand(results, lookup, alias)
    }
  }
  this.lookup = lookup
  return results
}

SLASH_COMMANDER.AutoCompleteSubCommandsProvider =
  PROVIDER_TABLE.Subclass<AutoCompleteSubCommandsProviderClass>()
const SUB_COMMANDS_PROVIDER = SLASH_COMMANDER.AutoCompleteSubCommandsProvider

SLASH_COMMANDER.IsAutoCompleteSubCommandsProvider = function (
  this: void,
  provider: unknown
): boolean {
  return SLASH_COMMANDER.HasBaseClass(SUB_COMMANDS_PROVIDER, provider)
}

SUB_COMMANDS_PROVIDER.New = function (
  this: AutoCompleteSubCommandsProviderClass,
  command: Command
): AutoCompleteProvider {
  SLASH_COMMANDER.AssertIsType(command, SLASH_COMMANDER.IsCommand)
  const provider = SLASH_COMMANDER.AutoCompleteProvider.New(this)
  provider.command = command
  return provider
}

SUB_COMMANDS_PROVIDER.FormatLabel = function (
  this: AutoCompleteSubCommandsProvider,
  alias: string,
  description?: string
): string {
  if (description !== undefined) {
    return string.format("%s|caaaaaa - %s", alias, description)
  }
  return alias
}

SUB_COMMANDS_PROVIDER.GetResultList = function (
  this: AutoCompleteSubCommandsProvider
): Record<string, string> {
  const results: Record<string, string> = {}
  const lookup: Record<string, string> = {}
  const command = this.command
  if (command !== undefined) {
    for (const [alias, subCommand] of pairs(command.subCommandAliases)) {
      if (subCommand === undefined) {
        continue
      }
      const label = this.FormatLabel(alias, subCommand.GetDescription(alias))
      if (label !== alias) {
        lookup[label] = alias
      }
      results[zo_strlower(alias)] = label
    }
  }
  this.lookup = lookup
  return results
}

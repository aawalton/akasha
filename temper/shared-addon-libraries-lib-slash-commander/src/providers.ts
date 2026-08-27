import { asCommand, asStringArray } from "./casts"
import { lib } from "./lib"
import type {
  AutoCompleteProvider,
  AutoCompleteProviderClass,
  AutoCompleteSlashCommandsProviderClass,
  AutoCompleteSubCommandsProvider,
  AutoCompleteSubCommandsProviderClass,
  Command,
} from "./types"

lib.AutoCompleteProvider = ZO_Object.Subclass<AutoCompleteProviderClass>()
const AutoCompleteProviderTable = lib.AutoCompleteProvider

lib.IsAutoCompleteProvider = function (this: void, provider: unknown): boolean {
  return lib.HasBaseClass(AutoCompleteProviderTable, provider)
}

AutoCompleteProviderTable.New = function (
  this: void,
  self: object,
  data?: unknown
): AutoCompleteProvider {
  const obj = ZO_Object.New<AutoCompleteProvider>(self)
  obj.Initialize(data)
  return obj
}

AutoCompleteProviderTable.Initialize = function (
  this: AutoCompleteProvider,
  data?: unknown
): undefined {
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

AutoCompleteProviderTable.SetPrefix = function (
  this: AutoCompleteProvider,
  prefix?: string
): undefined {
  if (prefix === undefined) {
    this.prefix = undefined
  } else {
    lib.AssertIsType(prefix, "string")
    this.prefix = prefix
  }
}

AutoCompleteProviderTable.CanComplete = function (
  this: AutoCompleteProvider,
  token: string
): boolean {
  const prefix = this.prefix
  return prefix === undefined || string.sub(token, 1, prefix.length) === prefix
}

AutoCompleteProviderTable.GetResultList = function (
  this: AutoCompleteProvider
): Record<string, string> {
  return this.results
}

AutoCompleteProviderTable.GetResultFromLabel = function (
  this: AutoCompleteProvider,
  label: string
): string {
  return this.lookup[label] ?? label
}

lib.AutoCompleteSlashCommandsProvider =
  AutoCompleteProviderTable.Subclass<AutoCompleteSlashCommandsProviderClass>()
const AutoCompleteSlashCommandsProvider = lib.AutoCompleteSlashCommandsProvider

lib.IsAutoCompleteSlashCommandsProvider = function (this: void, provider: unknown): boolean {
  return lib.HasBaseClass(AutoCompleteSlashCommandsProvider, provider)
}

AutoCompleteSlashCommandsProvider.New = function (
  this: AutoCompleteSlashCommandsProviderClass
): AutoCompleteProvider {
  const provider = lib.AutoCompleteProvider.New(this)
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
  const label = lib.GenerateLabel(alias, description)
  if (label !== alias) {
    lookup[label] = alias
  }
  results[zo_strlower(alias)] = label
}

AutoCompleteSlashCommandsProvider.GetResultList = function (
  this: AutoCompleteProvider
): Record<string, string> {
  const results: Record<string, string> = {}
  const lookup: Record<string, string> = {}
  for (const [alias, command] of pairs(SLASH_COMMANDS)) {
    let description: string | undefined
    if (lib.IsCommand(command)) {
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

lib.AutoCompleteSubCommandsProvider =
  AutoCompleteProviderTable.Subclass<AutoCompleteSubCommandsProviderClass>()
const AutoCompleteSubCommandsProviderTable = lib.AutoCompleteSubCommandsProvider

lib.IsAutoCompleteSubCommandsProvider = function (this: void, provider: unknown): boolean {
  return lib.HasBaseClass(AutoCompleteSubCommandsProviderTable, provider)
}

AutoCompleteSubCommandsProviderTable.New = function (
  this: AutoCompleteSubCommandsProviderClass,
  command: Command
): AutoCompleteProvider {
  lib.AssertIsType(command, lib.IsCommand)
  const provider = lib.AutoCompleteProvider.New(this)
  provider.command = command
  return provider
}

AutoCompleteSubCommandsProviderTable.FormatLabel = function (
  this: AutoCompleteSubCommandsProvider,
  alias: string,
  description?: string
): string {
  if (description !== undefined) {
    return string.format("%s|caaaaaa - %s", alias, description)
  }
  return alias
}

AutoCompleteSubCommandsProviderTable.GetResultList = function (
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

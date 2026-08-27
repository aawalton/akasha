import {
  asAutoCompleteProvider,
  asCallableCommand,
  asCommandMeta,
  asOptionalString,
  asString,
} from "./casts"
import { lib } from "./lib"
import type { AutoCompleteProvider, Command, CommandClass } from "./types"

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

lib.Command = ZO_Object.Subclass<CommandClass>()
const CommandTable = lib.Command

lib.IsCommand = function (this: void, command: unknown): boolean {
  return lib.HasBaseClass(CommandTable, command)
}

CommandTable.New = function (this: CommandClass): Command {
  const obj = ZO_Object.New<Command>(this)
  obj.Initialize()
  return obj
}

CommandTable.Initialize = function (this: Command): undefined {
  this.callback = undefined

  const meta = asCommandMeta(getmetatable(this))
  meta["__call"] = function (this: void, self: Command, input: unknown): undefined {
    if (type(input) === "string") {
      const [firstAlias] = next(self.subCommandAliases)
      if (firstAlias !== undefined) {
        const [matchedAlias, newInput] = string.match(asString(input), "(.-)%s+(.-)$")
        let alias = parseLuaCapture(matchedAlias)
        const remainder = parseLuaCapture(newInput)
        if (alias === undefined) {
          alias = asString(input)
        }
        const subCommand = self.subCommandAliases[alias]
        if (subCommand !== undefined) {
          asCallableCommand(subCommand)(remainder)
          return
        }
      }
    }
    if (self.callback !== undefined) {
      self.callback(asOptionalString(input))
    } else {
      error(lib.ERROR_CALLED_WITHOUT_CALLBACK)
    }
  }

  this.aliases = {}
  this.subCommands = new LuaSet<Command>()
  this.subCommandAliases = {}
  this.autocomplete = undefined
}

CommandTable.SetDescription = function (this: Command, description?: string): undefined {
  if (description !== undefined) {
    lib.AssertIsType(description, "string")
  }
  this.description = description
}

CommandTable.GetDescription = function (this: Command, _alias?: string): string | undefined {
  return this.description
}

CommandTable.SetCallback = function (
  this: Command,
  callback?: (this: void, input?: string) => void
): undefined {
  if (callback !== undefined) {
    lib.AssertIsType(callback, lib.IsCallable)
  }
  this.callback = callback
}

CommandTable.GetCallback = function (
  this: Command
): ((this: void, input?: string) => void) | undefined {
  return this.callback
}

CommandTable.AddAlias = function (this: Command, alias: string): undefined {
  lib.AssertIsType(alias, "string")
  this.aliases[alias] = this
  const parent = this.parent
  if (parent !== undefined) {
    parent.RegisterSubCommandAlias(alias, this)
  }
}

CommandTable.HasAlias = function (this: Command, alias: string): boolean {
  if (this.aliases[alias] !== undefined) {
    return true
  }
  return false
}

CommandTable.RemoveAlias = function (this: Command, alias: string): undefined {
  this.aliases[alias] = undefined
  const parent = this.parent
  if (parent !== undefined) {
    parent.UnregisterSubCommandAlias(alias)
  }
}

CommandTable.HasAncestor = function (this: Command, parent?: Command): boolean {
  let current = parent
  while (current !== undefined) {
    if (current === this) {
      return true
    }
    current = current.parent
  }
  return false
}

CommandTable.SetParentCommand = function (this: Command, command?: Command): undefined {
  if (command === undefined) {
    const parent = this.parent
    if (parent === undefined) {
      error(lib.ERROR_HAS_NO_PARENT)
    }
    for (const [alias] of pairs(this.aliases)) {
      parent.UnregisterSubCommandAlias(alias)
    }
    this.parent = undefined
  } else {
    if (this.parent !== undefined) {
      error(lib.ERROR_ALREADY_HAS_PARENT)
    }
    lib.AssertIsType(command, lib.Command)
    if (this.HasAncestor(command)) {
      error(lib.ERROR_CIRCULAR_HIERARCHY)
    }
    this.parent = command
    for (const [alias] of pairs(this.aliases)) {
      command.RegisterSubCommandAlias(alias, this)
    }
  }
}

CommandTable.RegisterSubCommand = function (this: Command, command?: Command): Command {
  let cmd = command
  if (cmd === undefined) {
    cmd = lib.Command.New()
  }
  lib.AssertIsType(cmd, lib.Command)
  cmd.SetParentCommand(this)
  this.subCommands.add(cmd)
  if (this.autocomplete === undefined) {
    this.SetAutoComplete(true)
  }
  return cmd
}

CommandTable.HasSubCommand = function (this: Command, command: Command): boolean {
  if (this.subCommands.has(command)) {
    return true
  }
  return false
}

CommandTable.UnregisterSubCommand = function (this: Command, command: Command): undefined {
  command.SetParentCommand(undefined)
  this.subCommands.delete(command)
  if (lib.IsAutoCompleteSubCommandsProvider(this.autocomplete) && this.subCommands.isEmpty()) {
    this.SetAutoComplete(false)
  }
}

CommandTable.RegisterSubCommandAlias = function (
  this: Command,
  alias: string,
  command: Command
): undefined {
  lib.AssertIsType(alias, "string")
  lib.AssertIsType(command, lib.Command)
  if (this.subCommandAliases[alias] !== undefined) {
    lib.Log(lib.WARNING_ALREADY_HAS_ALIAS, alias)
  }
  this.subCommandAliases[alias] = command
}

CommandTable.HasSubCommandAlias = function (this: Command, alias: string): boolean {
  if (this.subCommandAliases[alias] !== undefined) {
    return true
  }
  return false
}

CommandTable.GetSubCommandByAlias = function (this: Command, alias: string): Command | undefined {
  return this.subCommandAliases[alias]
}

CommandTable.UnregisterSubCommandAlias = function (this: Command, alias: string): undefined {
  this.subCommandAliases[alias] = undefined
}

CommandTable.SetAutoComplete = function (
  this: Command,
  provider?: unknown
): AutoCompleteProvider | undefined {
  if (provider === undefined || provider === false) {
    this.autocomplete = undefined
  } else if (provider === true) {
    this.autocomplete = lib.AutoCompleteSubCommandsProvider.New(this)
  } else if (lib.IsAutoCompleteProvider(provider)) {
    this.autocomplete = asAutoCompleteProvider(provider)
  } else if (type(provider) === "table") {
    this.autocomplete = lib.AutoCompleteProvider.New(lib.AutoCompleteProvider, provider)
  } else {
    error(lib.ERROR_INVALID_TYPE)
  }
  return this.autocomplete
}

CommandTable.ShouldAutoComplete = function (this: Command, token: string): boolean {
  const autocomplete = this.autocomplete
  if (autocomplete === undefined) {
    return false
  }
  return autocomplete.CanComplete(token)
}

CommandTable.GetAutoCompleteResults = function (this: Command): Record<string, string> {
  const autocomplete = this.autocomplete
  if (autocomplete === undefined) {
    error(lib.ERROR_AUTOCOMPLETE_NOT_ACTIVE)
  }
  const results = autocomplete.GetResultList()
  lib.AssertIsType(results, "table", lib.ERROR_AUTOCOMPLETE_RESULT_NOT_VALID)
  return results
}

CommandTable.GetAutoCompleteResultFromDisplayText = function (
  this: Command,
  label: string
): string {
  const autocomplete = this.autocomplete
  if (autocomplete === undefined) {
    error(lib.ERROR_AUTOCOMPLETE_NOT_ACTIVE)
  }
  lib.AssertIsType(label, "string")
  const result = autocomplete.GetResultFromLabel(label)
  lib.AssertIsType(result, "string", lib.ERROR_AUTOCOMPLETE_RESULT_NOT_VALID)
  return result
}

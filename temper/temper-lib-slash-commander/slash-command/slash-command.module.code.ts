import {
  asAutoCompleteProvider,
  asCallableCommand,
  asCommandMeta,
  asOptionalString,
} from "../slash-commander-casts/slash-commander-casts.module.code.ts"
import { SLASH_COMMANDER } from "../slash-commander-surface/slash-commander-surface.module.code.ts"
import type {
  AutoCompleteProvider,
  Command,
  CommandClass,
} from "../slash-commander-types/slash-commander-types.module.code.ts"

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

SLASH_COMMANDER.Command = ZO_Object.Subclass<CommandClass>()
const COMMAND_TABLE = SLASH_COMMANDER.Command

SLASH_COMMANDER.IsCommand = function (this: void, command: unknown): boolean {
  return SLASH_COMMANDER.HasBaseClass(COMMAND_TABLE, command)
}

COMMAND_TABLE.New = function (this: CommandClass): Command {
  const obj = ZO_Object.New<Command>(this)
  obj.Initialize()
  return obj
}

COMMAND_TABLE.Initialize = function (this: Command): undefined {
  this.callback = undefined

  const meta = asCommandMeta(getmetatable(this))
  meta["__call"] = function (this: void, self: Command, input: unknown): undefined {
    if (type(input) === "string") {
      const [firstAlias] = next(self.subCommandAliases)
      if (firstAlias !== undefined) {
        const [matchedAlias, newInput] = string.match(input as string, "(.-)%s+(.-)$")
        let alias = parseLuaCapture(matchedAlias)
        const remainder = parseLuaCapture(newInput)
        if (alias === undefined) {
          alias = input as string
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
      error(SLASH_COMMANDER.ERROR_CALLED_WITHOUT_CALLBACK)
    }
  }

  this.aliases = {}
  this.subCommands = new LuaSet<Command>()
  this.subCommandAliases = {}
  this.autocomplete = undefined
}

COMMAND_TABLE.SetDescription = function (this: Command, description?: string): undefined {
  if (description !== undefined) {
    SLASH_COMMANDER.AssertIsType(description, "string")
  }
  this.description = description
}

COMMAND_TABLE.GetDescription = function (this: Command, _alias?: string): string | undefined {
  return this.description
}

COMMAND_TABLE.SetCallback = function (
  this: Command,
  callback?: (this: void, input?: string) => void
): undefined {
  if (callback !== undefined) {
    SLASH_COMMANDER.AssertIsType(callback, SLASH_COMMANDER.IsCallable)
  }
  this.callback = callback
}

COMMAND_TABLE.GetCallback = function (
  this: Command
): ((this: void, input?: string) => void) | undefined {
  return this.callback
}

COMMAND_TABLE.AddAlias = function (this: Command, alias: string): undefined {
  SLASH_COMMANDER.AssertIsType(alias, "string")
  this.aliases[alias] = this
  const parent = this.parent
  if (parent !== undefined) {
    parent.RegisterSubCommandAlias(alias, this)
  }
}

COMMAND_TABLE.HasAlias = function (this: Command, alias: string): boolean {
  if (this.aliases[alias] !== undefined) {
    return true
  }
  return false
}

COMMAND_TABLE.RemoveAlias = function (this: Command, alias: string): undefined {
  this.aliases[alias] = undefined
  const parent = this.parent
  if (parent !== undefined) {
    parent.UnregisterSubCommandAlias(alias)
  }
}

COMMAND_TABLE.HasAncestor = function (this: Command, parent?: Command): boolean {
  let current = parent
  while (current !== undefined) {
    if (current === this) {
      return true
    }
    current = current.parent
  }
  return false
}

COMMAND_TABLE.SetParentCommand = function (this: Command, command?: Command): undefined {
  if (command === undefined) {
    const parent = this.parent
    if (parent === undefined) {
      error(SLASH_COMMANDER.ERROR_HAS_NO_PARENT)
    }
    for (const [alias] of pairs(this.aliases)) {
      parent.UnregisterSubCommandAlias(alias)
    }
    this.parent = undefined
  } else {
    if (this.parent !== undefined) {
      error(SLASH_COMMANDER.ERROR_ALREADY_HAS_PARENT)
    }
    SLASH_COMMANDER.AssertIsType(command, SLASH_COMMANDER.Command)
    if (this.HasAncestor(command)) {
      error(SLASH_COMMANDER.ERROR_CIRCULAR_HIERARCHY)
    }
    this.parent = command
    for (const [alias] of pairs(this.aliases)) {
      command.RegisterSubCommandAlias(alias, this)
    }
  }
}

COMMAND_TABLE.RegisterSubCommand = function (this: Command, command?: Command): Command {
  let cmd = command
  if (cmd === undefined) {
    cmd = SLASH_COMMANDER.Command.New()
  }
  SLASH_COMMANDER.AssertIsType(cmd, SLASH_COMMANDER.Command)
  cmd.SetParentCommand(this)
  this.subCommands.add(cmd)
  if (this.autocomplete === undefined) {
    this.SetAutoComplete(true)
  }
  return cmd
}

COMMAND_TABLE.HasSubCommand = function (this: Command, command: Command): boolean {
  if (this.subCommands.has(command)) {
    return true
  }
  return false
}

COMMAND_TABLE.UnregisterSubCommand = function (this: Command, command: Command): undefined {
  command.SetParentCommand(undefined)
  this.subCommands.delete(command)
  if (
    SLASH_COMMANDER.IsAutoCompleteSubCommandsProvider(this.autocomplete) &&
    this.subCommands.isEmpty()
  ) {
    this.SetAutoComplete(false)
  }
}

COMMAND_TABLE.RegisterSubCommandAlias = function (
  this: Command,
  alias: string,
  command: Command
): undefined {
  SLASH_COMMANDER.AssertIsType(alias, "string")
  SLASH_COMMANDER.AssertIsType(command, SLASH_COMMANDER.Command)
  if (this.subCommandAliases[alias] !== undefined) {
    SLASH_COMMANDER.Log(SLASH_COMMANDER.WARNING_ALREADY_HAS_ALIAS, alias)
  }
  this.subCommandAliases[alias] = command
}

COMMAND_TABLE.HasSubCommandAlias = function (this: Command, alias: string): boolean {
  if (this.subCommandAliases[alias] !== undefined) {
    return true
  }
  return false
}

COMMAND_TABLE.GetSubCommandByAlias = function (this: Command, alias: string): Command | undefined {
  return this.subCommandAliases[alias]
}

COMMAND_TABLE.UnregisterSubCommandAlias = function (this: Command, alias: string): undefined {
  this.subCommandAliases[alias] = undefined
}

COMMAND_TABLE.SetAutoComplete = function (
  this: Command,
  provider?: unknown
): AutoCompleteProvider | undefined {
  if (provider === undefined || provider === false) {
    this.autocomplete = undefined
  } else if (provider === true) {
    this.autocomplete = SLASH_COMMANDER.AutoCompleteSubCommandsProvider.New(this)
  } else if (SLASH_COMMANDER.IsAutoCompleteProvider(provider)) {
    this.autocomplete = asAutoCompleteProvider(provider)
  } else if (type(provider) === "table") {
    this.autocomplete = SLASH_COMMANDER.AutoCompleteProvider.New(
      SLASH_COMMANDER.AutoCompleteProvider,
      provider
    )
  } else {
    error(SLASH_COMMANDER.ERROR_INVALID_TYPE)
  }
  return this.autocomplete
}

COMMAND_TABLE.ShouldAutoComplete = function (this: Command, token: string): boolean {
  const autocomplete = this.autocomplete
  if (autocomplete === undefined) {
    return false
  }
  return autocomplete.CanComplete(token)
}

COMMAND_TABLE.GetAutoCompleteResults = function (this: Command): Record<string, string> {
  const autocomplete = this.autocomplete
  if (autocomplete === undefined) {
    error(SLASH_COMMANDER.ERROR_AUTOCOMPLETE_NOT_ACTIVE)
  }
  const results = autocomplete.GetResultList()
  SLASH_COMMANDER.AssertIsType(
    results,
    "table",
    SLASH_COMMANDER.ERROR_AUTOCOMPLETE_RESULT_NOT_VALID
  )
  return results
}

COMMAND_TABLE.GetAutoCompleteResultFromDisplayText = function (
  this: Command,
  label: string
): string {
  const autocomplete = this.autocomplete
  if (autocomplete === undefined) {
    error(SLASH_COMMANDER.ERROR_AUTOCOMPLETE_NOT_ACTIVE)
  }
  SLASH_COMMANDER.AssertIsType(label, "string")
  const result = autocomplete.GetResultFromLabel(label)
  SLASH_COMMANDER.AssertIsType(
    result,
    "string",
    SLASH_COMMANDER.ERROR_AUTOCOMPLETE_RESULT_NOT_VALID
  )
  return result
}

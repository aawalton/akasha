import {
  asAnyRecord,
  asDescriptionThunk,
  asLib,
  asOptionalString,
  asString,
  asStringArray,
  asValidator,
  asVarargFn,
} from "./casts"
import {
  ERROR_ALREADY_HAS_PARENT,
  ERROR_AUTOCOMPLETE_NOT_ACTIVE,
  ERROR_AUTOCOMPLETE_RESULT_NOT_VALID,
  ERROR_CALLED_WITHOUT_CALLBACK,
  ERROR_CIRCULAR_HIERARCHY,
  ERROR_HAS_NO_PARENT,
  ERROR_INVALID_TYPE,
  WARNING_ALREADY_HAS_ALIAS,
} from "./constants"
import type { Command, Lib } from "./types"

export const lib: Lib = asLib({
  loadedFiles: {},
  ERROR_INVALID_TYPE,
  ERROR_HAS_NO_PARENT,
  ERROR_ALREADY_HAS_PARENT,
  ERROR_CIRCULAR_HIERARCHY,
  ERROR_AUTOCOMPLETE_NOT_ACTIVE,
  ERROR_AUTOCOMPLETE_RESULT_NOT_VALID,
  ERROR_CALLED_WITHOUT_CALLBACK,
  WARNING_ALREADY_HAS_ALIAS,
})

lib.Log = function (this: void, message: string, ...args: unknown[]): undefined {
  df("[LibSlashCommander] " + message, ...args)
}

lib.IsCallable = function (this: void, func: unknown): boolean {
  if (type(func) === "function") {
    return true
  }
  const meta = getmetatable(func)
  const call = meta != null ? asAnyRecord(meta)["__call"] : undefined
  return type(call) === "function"
}

lib.HasBaseClass = function (this: void, baseClass: unknown, object: unknown): boolean {
  let current: unknown = getmetatable(object)
  while (current != null) {
    if (asAnyRecord(current)["__index"] === baseClass) {
      return true
    }
    current = getmetatable(current)
  }
  return false
}

lib.AssertIsType = function (
  this: void,
  value: unknown,
  typeNameClassOrValidator: unknown,
  errorMessage?: string
): undefined {
  const check = type(typeNameClassOrValidator)
  let valid = false
  if (check === "string") {
    valid = type(value) === typeNameClassOrValidator
  } else if (check === "function") {
    valid = asValidator(typeNameClassOrValidator)(value)
  } else {
    valid = lib.HasBaseClass(typeNameClassOrValidator, value)
  }
  if (!valid) {
    error(errorMessage ?? lib.ERROR_INVALID_TYPE)
  }
}

lib.WrapFunction = function (
  this: void,
  object: unknown,
  functionName: unknown,
  wrapper?: unknown
): undefined {
  let target = object
  let name = functionName
  let wrap = wrapper
  if (type(object) === "string") {
    wrap = functionName
    name = object
    target = _G
  }
  const targetTable = asAnyRecord(target)
  const key = asString(name)
  const originalFunction = targetTable[key]
  const wrapFn = asVarargFn(wrap)
  targetTable[key] = function (this: void, ...args: unknown[]): unknown {
    return wrapFn(originalFunction, ...args)
  }
}

lib.AddFile = function (
  this: Lib,
  file: string,
  version: number,
  callback: (lib: Lib) => void
): undefined {
  const loaded = this.loadedFiles[file]
  if (loaded === undefined || version > loaded) {
    callback(this)
    this.loadedFiles[file] = version
  }
}

lib.Register = function (
  this: Lib,
  aliases: string | string[] | undefined,
  callback?: (this: void, input?: string) => void,
  description?: string
): Command {
  const command = this.Command.New()
  if (callback !== undefined) {
    command.SetCallback(callback)
  }
  if (description !== undefined) {
    command.SetDescription(description)
  }

  if (aliases !== undefined) {
    if (type(aliases) === "table") {
      const aliasList = asStringArray(aliases)
      for (const alias of aliasList) {
        command.AddAlias(alias)
      }
    } else {
      command.AddAlias(asString(aliases))
    }
  }

  const globalCommand = this.globalCommand
  if (globalCommand !== undefined) {
    globalCommand.RegisterSubCommand(command)
  }
  return command
}

lib.Unregister = function (this: Lib, command: Command): undefined {
  const globalCommand = this.globalCommand
  if (globalCommand !== undefined) {
    globalCommand.UnregisterSubCommand(command)
  }
}

lib.FormatLabel = function (
  this: Lib,
  alias: string,
  description?: string,
  commandType?: number
): string {
  const color = this.typeColor[commandType ?? this.COMMAND_TYPE_ADDON] ?? ""
  if (description !== undefined) {
    return color + alias + "|caaaaaa - " + description
  }
  return color + alias
}

function getDescriptionText(this: void, alias: string): string | undefined {
  const description = lib.descriptions[alias]
  if (lib.IsCallable(description)) {
    return asDescriptionThunk(description)()
  }
  return asOptionalString(description)
}

lib.GenerateLabel = function (this: Lib, alias: string, description?: string): string {
  let resolved = description
  if (resolved === undefined) {
    resolved = getDescriptionText(alias)
  }
  return this.FormatLabel(alias, resolved, this.types[alias])
}

lib.SafeStartChatInput = function (
  this: void,
  text: string,
  channel?: number,
  target?: string
): undefined {
  let isRestrictedCommunicationPermitted = true
  if (target !== undefined && IsCommunicationRestricted()) {
    isRestrictedCommunicationPermitted = CanCommunicateWith(target)
  }
  if (IsChatSystemAvailableForCurrentPlatform() && isRestrictedCommunicationPermitted) {
    ZO_GetChatSystem().StartTextEntry(text, channel, target, true)
  }
}

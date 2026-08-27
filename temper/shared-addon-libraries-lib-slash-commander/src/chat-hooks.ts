import { asAnyRecord, asCommandAliasMap, asPreHookHandler, type VarargFn } from "./casts"
import { keepDisplayTexts } from "./display-text"
import { lib } from "./lib"
import type { Command } from "./types"

const NO_RESULTS: string[] = []

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function runAutoCompletion(
  this: void,
  self: ChatSystem,
  command: Command,
  text: string
): undefined {
  self.ignoreTextEntryChangedEvent = true
  lib.currentCommand = command
  self.textEntry.AutoCompleteTarget(text)
  self.ignoreTextEntryChangedEvent = false
}

function getCurrentCommandAndToken(
  this: void,
  command: Command,
  input: string
): LuaMultiReturn<[Command | undefined, string]> {
  const [matchedAlias, matchedNewInput] = string.match(input, "(.-)%s+(.-)$")
  const alias = parseLuaCapture(matchedAlias)
  if (alias === undefined || !lib.IsCommand(command)) {
    return $multi(command, input)
  }
  const subCommand = command.GetSubCommandByAlias(alias)
  if (subCommand === undefined) {
    return $multi(command, input)
  }
  const newInput = parseLuaCapture(matchedNewInput)
  if (newInput === undefined) {
    return $multi(subCommand, "")
  }
  return getCurrentCommandAndToken(subCommand, newInput)
}

function sanitize(this: void, value: string): string {
  const [escaped] = string.gsub(value, "[-*+?^$().[%]%%]", "%%%0")
  return escaped
}

function onTextEntryChanged(this: void, self: ChatSystem, text: string): boolean | undefined {
  const globalCommand = lib.globalCommand
  if (
    self.ignoreTextEntryChangedEvent === true ||
    globalCommand === undefined ||
    !globalCommand.ShouldAutoComplete(text)
  ) {
    return undefined
  }
  lib.currentCommand = undefined

  const [command, token] = getCurrentCommandAndToken(globalCommand, text)
  if (command === undefined || !lib.IsCommand(command)) {
    return undefined
  }

  const [matched] = string.match(text, string.format("(.+)%%s+%s$", sanitize(token)))
  lib.lastInput = parseLuaCapture(matched)
  if (command.ShouldAutoComplete(token)) {
    runAutoCompletion(self, command, token)
    return true
  }
  return undefined
}

function onSetChannel(this: void, self: ChatSystem): undefined {
  self.textEntry.CloseAutoComplete()
  return undefined
}

function startCommandAtIndex(
  this: void,
  originalStartCommandAtIndex: VarargFn,
  self: ChatTextEntry,
  index: number
): undefined {
  originalStartCommandAtIndex(self, index)
  self.CloseAutoComplete()
}

function autocompleteOnTextChanged(
  this: void,
  originalOnTextChanged: VarargFn,
  self: ChatAutoCompleteWidget
): undefined {
  const wasEnabled = self.enabled
  self.enabled = false
  originalOnTextChanged(self)
  self.enabled = wasEnabled
}

function onAutoCompleteEntrySelected(
  this: void,
  _self: ChatSystem,
  text: string
): boolean | undefined {
  const command = lib.hasCustomResults
  if (command !== undefined) {
    let resultText = command.GetAutoCompleteResultFromDisplayText(text)
    const lastInput = lib.lastInput
    if (lastInput !== undefined) {
      resultText = string.format("%s %s", lastInput, resultText)
      lib.lastInput = undefined
    } else {
      resultText = string.format("%s ", resultText)
    }
    lib.SafeStartChatInput(resultText)
    return true
  }
  return undefined
}

function getTopMatches(this: void, command: Command, text: string): LuaMultiReturn<string[]> {
  const results = command.GetAutoCompleteResults()
  const topResults = GetTopMatchesByLevenshteinSubStringScore(
    results,
    text,
    1,
    lib.maxResults,
    true
  )
  if (topResults !== undefined) {
    return unpack(keepDisplayTexts(topResults))
  }
  return unpack(NO_RESULTS)
}

type AutoCompleteResultsFn = (
  this: void,
  self: ChatAutoCompleteWidget,
  text: string
) => LuaMultiReturn<string[]>

function getAutoCompletionResults(
  this: void,
  original: AutoCompleteResultsFn,
  self: ChatAutoCompleteWidget,
  text: string
): LuaMultiReturn<string[]> {
  const command = lib.currentCommand
  if (command !== undefined) {
    lib.hasCustomResults = command
    return getTopMatches(command, text)
  }
  lib.hasCustomResults = undefined
  return original(self, text)
}

function setupChatSystem(this: void, chatSystem: ChatSystem): undefined {
  const textEntry = chatSystem.textEntry
  const targetAutoComplete = textEntry.targetAutoComplete
  const slashCommandAutoComplete = textEntry.slashCommandAutoComplete

  ZO_PreHook(chatSystem, "OnTextEntryChanged", asPreHookHandler(onTextEntryChanged))
  ZO_PreHook(chatSystem, "SetChannel", asPreHookHandler(onSetChannel))
  ZO_PreHook(
    chatSystem,
    "OnAutoCompleteEntrySelected",
    asPreHookHandler(onAutoCompleteEntrySelected)
  )
  lib.WrapFunction(targetAutoComplete, "GetAutoCompletionResults", getAutoCompletionResults)
  lib.WrapFunction(textEntry, "StartCommandAtIndex", startCommandAtIndex)
  lib.WrapFunction(slashCommandAutoComplete, "OnTextChanged", autocompleteOnTextChanged)
}

lib.GetCurrentCommandAndToken = getCurrentCommandAndToken

lib.Init = function (this: void): undefined {
  lib.Init = function (this: void): undefined {}

  if (KEYBOARD_CHAT_SYSTEM !== undefined) {
    setupChatSystem(KEYBOARD_CHAT_SYSTEM)
  }
  if (GAMEPAD_CHAT_SYSTEM !== undefined) {
    setupChatSystem(GAMEPAD_CHAT_SYSTEM)
  }

  const switchLookup = ZO_ChatSystem_GetChannelSwitchLookupTable()
  const globalCommand = lib.Command.New()
  lib.globalCommand = globalCommand

  globalCommand.subCommandAliases = asCommandAliasMap(
    setmetatable(
      {},
      {
        __index: (_self: object, key: string): unknown => {
          const lowered = zo_strlower(key)
          return SLASH_COMMANDS[lowered] ?? switchLookup[lowered]
        },
        __newindex: (_self: object, key: string, value: unknown): undefined => {
          asAnyRecord(SLASH_COMMANDS)[key] = value
        },
      }
    )
  )

  globalCommand.SetAutoComplete(lib.AutoCompleteSlashCommandsProvider.New())
}

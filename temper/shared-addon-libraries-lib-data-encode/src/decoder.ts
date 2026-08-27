import { asDecoderMethod, asLdeValue, asLdeValueArray, asNumber, asString } from "./casts"
import {
  charsetLength,
  charToValue,
  controlCharConfig,
  controlChars,
  decoderFunctionNames,
} from "./constants"
import { logLevels, Print, runtime } from "./runtime"
import type { DecodeClass, DecodeInstance, LdeValue, LuaTable } from "./types"

const DecodeDataHandler = ZO_InitializingObject.Subclass<DecodeClass>()

const dictSizeErrorMsg =
  "The supplied global dictionary does not have the correct number of items. Expected: %d, found: %d"
const dictCharErrorMsg = "Invalid char encountered. Expected array control char: %s, found: %s"

DecodeDataHandler.Initialize = function (
  this: DecodeInstance,
  encodedData: string[],
  globalDict?: LdeValue[]
): undefined {
  if (runtime.debug && runtime.testresult !== undefined) {
    runtime.testresult.decoder = this
  }
  this.encodedStrings = encodedData
  this.currentStringIndex = 1
  this.currentStringPos = 1
  this.currentString = this.GetCurrentString()
  this.currentStringLength = string.len(asString(this.currentString))
  this.InitDictionary(globalDict)
  this.data = this.DecodeItem()
}

DecodeDataHandler.InitDictionary = function (
  this: DecodeInstance,
  globalDict?: LdeValue[]
): undefined {
  const globalDictItems = globalDict !== undefined ? globalDict.length : 0
  if (string.sub(asString(this.currentString), 1, 2) === "D+") {
    this.currentStringPos = 3
    const expectedGlobalDictItems = this.DecodeInteger()
    if (expectedGlobalDictItems > globalDictItems) {
      error(string.format(dictSizeErrorMsg, expectedGlobalDictItems, globalDictItems))
    }

    const nextChar = this.GetNextChar()
    if (controlChars.ARRAY !== nextChar) {
      error(string.format(dictCharErrorMsg, controlChars.ARRAY, nextChar))
    }

    this.dictionary = []
    const supplied = asLdeValueArray(globalDict)
    for (let i = 1; i <= expectedGlobalDictItems; i++) {
      this.dictionary[i - 1] = asLdeValue(supplied[i - 1])
    }
    const localDict = this.DecodeArray()
    for (let i = 1; i <= localDict.length; i++) {
      this.dictionary[globalDictItems + i - 1] = asLdeValue(localDict[i - 1])
    }
  } else if (globalDictItems > 0) {
    this.dictionary = ZO_ShallowTableCopy(asLdeValueArray(globalDict))
  }
}

DecodeDataHandler.GetCurrentString = function (this: DecodeInstance): string | undefined {
  return this.encodedStrings[this.currentStringIndex - 1]
}

DecodeDataHandler.GetNextChar = function (this: DecodeInstance, noPosIncrement?: boolean): string {
  const encodedString = this.GetCurrentString()
  const pos = this.currentStringPos
  if (encodedString === undefined) {
    return controlChars.END
  }
  if (noPosIncrement !== true) {
    this.MoveCurrentPos(1)
  }
  Print(
    logLevels.debug,
    "Next char: %s - New pos: %d",
    string.sub(encodedString, pos, pos),
    this.currentStringPos
  )
  return string.sub(encodedString, pos, pos)
}

DecodeDataHandler.GetEncodedItem = function (this: DecodeInstance, length?: number): string {
  const encodedString = asString(this.GetCurrentString())
  const pos = this.currentStringPos
  let len = length
  if (len === undefined) {
    const [foundStart] = string.find(encodedString, controlChars.END, pos, true)
    len = asNumber(foundStart) - pos
    this.MoveCurrentPos(1)
  }
  this.MoveCurrentPos(len)
  Print(
    logLevels.debug,
    "Item: %s - New pos: %d",
    string.sub(encodedString, pos, pos + len),
    this.currentStringPos
  )
  return string.sub(encodedString, pos, pos + len - 1)
}

DecodeDataHandler.MoveCurrentPos = function (this: DecodeInstance, offset: number): undefined {
  const newpos = this.currentStringPos + offset
  if (newpos <= asNumber(this.currentStringLength)) {
    this.currentStringPos = newpos
    return
  }
  this.currentStringIndex = this.currentStringIndex + 1
  this.currentStringPos = 1
  this.currentString = this.GetCurrentString()
  if (this.currentString !== undefined) {
    this.currentStringLength = string.len(this.currentString)
  } else {
    this.currentStringLength = undefined
  }
}

DecodeDataHandler.DecodeItem = function (this: DecodeInstance): unknown {
  let controlChar = this.GetNextChar()
  if (string.byte(controlChar) === 194) {
    controlChar = "§"
    this.MoveCurrentPos(1)
  }
  const functionName = asString(decoderFunctionNames[controlChar])
  if (this[functionName] === undefined) {
    Print(
      logLevels.warning,
      "%s (%s), Index: %d, Pos: %d",
      tostring(functionName),
      controlChar,
      this.currentStringIndex,
      this.currentStringPos
    )
  }
  return asDecoderMethod(this[functionName])(this, controlChar)
}

DecodeDataHandler.DecodeBool = function (
  this: DecodeInstance,
  controlChar: string
): boolean | undefined {
  if (controlChar === controlChars.TRUE) {
    return true
  }
  if (controlChar === controlChars.FALSE) {
    return false
  }
  return undefined
}

DecodeDataHandler.DecodeStringId = function (this: DecodeInstance, controlChar: string): LdeValue {
  const length = controlCharConfig[controlChar]?.length
  const encodedItem = this.GetEncodedItem(length)
  const stringId = this.DecodeBase(encodedItem)
  return asLdeValue(this.dictionary[stringId - 1])
}

DecodeDataHandler.DecodeBase = function (this: DecodeInstance, encodedItem: string): number {
  let value = 0
  for (let i = 1; i <= string.len(encodedItem); i++) {
    const char = string.sub(encodedItem, i, i)
    value = value * charsetLength + asNumber(charToValue[char])
  }
  Print(logLevels.debug, "IntChars: %s (%d):", encodedItem, value)
  return value
}

DecodeDataHandler.DecodeString = function (this: DecodeInstance, controlChar: string): string {
  let encodedLength = this.GetNextChar()
  if (controlChar === controlChars.STRING_LONG) {
    encodedLength = encodedLength + this.GetNextChar()
  }
  const length = this.DecodeBase(encodedLength)
  return this.GetEncodedItem(length)
}

DecodeDataHandler.DecodeArray = function (this: DecodeInstance): unknown[] {
  const array: unknown[] = []
  while (this.GetNextChar(true) !== ",") {
    array.push(this.DecodeItem())
  }
  this.MoveCurrentPos(1)
  return array
}

DecodeDataHandler.DecodeTable = function (this: DecodeInstance): LuaTable {
  const tableValue: LuaTable = {}
  while (this.GetNextChar(true) !== ",") {
    const key = this.DecodeItem()
    tableValue[asLdeValue(key)] = this.DecodeItem()
  }
  this.MoveCurrentPos(1)
  return tableValue
}

DecodeDataHandler.DecodeInteger = function (this: DecodeInstance): number {
  const encodedItem = this.GetEncodedItem()
  return this.DecodeBase(encodedItem)
}

DecodeDataHandler.DecodeNumeric = function (this: DecodeInstance): number | undefined {
  return tonumber(this.GetEncodedItem())
}

export function decode(
  this: void,
  encodedData: string[],
  globalDict?: LdeValue[]
): LuaMultiReturn<[unknown, LdeValue[]]> {
  const decoded = DecodeDataHandler.New(encodedData, globalDict)
  return $multi(decoded.data, decoded.dictionary)
}

import {
  asDecoderMethod,
  asLdeValue,
  asLdeValueArray,
} from "../data-encode-casts/data-encode-casts.module.code.ts"
import {
  CHAR_TO_VALUE,
  CHARSET_LENGTH,
  CONTROL_CHAR_CONFIG,
  CONTROL_CHARS,
  DECODER_FUNCTION_NAMES,
} from "../data-encode-charset/data-encode-charset.module.code.ts"
import {
  LOG_LEVELS,
  printLog,
  RUNTIME,
} from "../data-encode-runtime/data-encode-runtime.module.code.ts"
import type {
  DecodeClass,
  DecodeInstance,
  LdeValue,
  LuaTable,
} from "../data-encode-types/data-encode-types.module.code.ts"

const DECODE_DATA_HANDLER = ZO_InitializingObject.Subclass<DecodeClass>()

const DICT_SIZE_ERROR =
  "The supplied global dictionary does not have the correct number of items. Expected: %d, found: %d"
const DICT_CHAR_ERROR = "Invalid char encountered. Expected array control char: %s, found: %s"

DECODE_DATA_HANDLER.Initialize = function (
  this: DecodeInstance,
  encodedData: readonly string[],
  globalDict?: LdeValue[]
): undefined {
  if (RUNTIME.debug && RUNTIME.testresult !== undefined) {
    RUNTIME.testresult.decoder = this
  }
  this.encodedStrings = encodedData
  this.currentStringIndex = 1
  this.currentStringPos = 1
  this.currentString = this.GetCurrentString()
  this.currentStringLength = string.len(this.currentString as string)
  this.InitDictionary(globalDict)
  this.data = this.DecodeItem()
}

DECODE_DATA_HANDLER.InitDictionary = function (
  this: DecodeInstance,
  globalDict?: LdeValue[]
): undefined {
  const globalDictItems = globalDict !== undefined ? globalDict.length : 0
  if (string.sub(this.currentString as string, 1, 2) === "D+") {
    this.currentStringPos = 3
    const expectedGlobalDictItems = this.DecodeInteger()
    if (expectedGlobalDictItems > globalDictItems) {
      error(string.format(DICT_SIZE_ERROR, expectedGlobalDictItems, globalDictItems))
    }

    const nextChar = this.GetNextChar()
    if (CONTROL_CHARS.ARRAY !== nextChar) {
      error(string.format(DICT_CHAR_ERROR, CONTROL_CHARS.ARRAY, nextChar))
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

DECODE_DATA_HANDLER.GetCurrentString = function (this: DecodeInstance): string | undefined {
  return this.encodedStrings[this.currentStringIndex - 1]
}

DECODE_DATA_HANDLER.GetNextChar = function (
  this: DecodeInstance,
  noPosIncrement?: boolean
): string {
  const encodedString = this.GetCurrentString()
  const pos = this.currentStringPos
  if (encodedString === undefined) {
    return CONTROL_CHARS.END
  }
  if (noPosIncrement !== true) {
    this.MoveCurrentPos(1)
  }
  printLog(
    LOG_LEVELS.debug,
    "Next char: %s - New pos: %d",
    string.sub(encodedString, pos, pos),
    this.currentStringPos
  )
  return string.sub(encodedString, pos, pos)
}

DECODE_DATA_HANDLER.GetEncodedItem = function (this: DecodeInstance, length?: number): string {
  const encodedString = this.GetCurrentString() as string
  const pos = this.currentStringPos
  let len = length
  if (len === undefined) {
    const [foundStart] = string.find(encodedString, CONTROL_CHARS.END, pos, true)
    len = (foundStart as number) - pos
    this.MoveCurrentPos(1)
  }
  this.MoveCurrentPos(len)
  printLog(
    LOG_LEVELS.debug,
    "Item: %s - New pos: %d",
    string.sub(encodedString, pos, pos + len),
    this.currentStringPos
  )
  return string.sub(encodedString, pos, pos + len - 1)
}

DECODE_DATA_HANDLER.MoveCurrentPos = function (this: DecodeInstance, offset: number): undefined {
  const newpos = this.currentStringPos + offset
  if (newpos <= (this.currentStringLength as number)) {
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

DECODE_DATA_HANDLER.DecodeItem = function (this: DecodeInstance): unknown {
  let controlChar = this.GetNextChar()
  if (string.byte(controlChar) === 194) {
    controlChar = "§"
    this.MoveCurrentPos(1)
  }
  const functionName = DECODER_FUNCTION_NAMES[controlChar] as string
  if (this[functionName] === undefined) {
    printLog(
      LOG_LEVELS.warning,
      "%s (%s), Index: %d, Pos: %d",
      tostring(functionName),
      controlChar,
      this.currentStringIndex,
      this.currentStringPos
    )
  }
  return asDecoderMethod(this[functionName])(this, controlChar)
}

DECODE_DATA_HANDLER.DecodeBool = function (
  this: DecodeInstance,
  controlChar: string
): boolean | undefined {
  if (controlChar === CONTROL_CHARS.TRUE) {
    return true
  }
  if (controlChar === CONTROL_CHARS.FALSE) {
    return false
  }
  return undefined
}

DECODE_DATA_HANDLER.DecodeStringId = function (
  this: DecodeInstance,
  controlChar: string
): LdeValue {
  const length = CONTROL_CHAR_CONFIG[controlChar]?.length
  const encodedItem = this.GetEncodedItem(length)
  const stringId = this.DecodeBase(encodedItem)
  return asLdeValue(this.dictionary[stringId - 1])
}

DECODE_DATA_HANDLER.DecodeBase = function (this: DecodeInstance, encodedItem: string): number {
  let value = 0
  for (let i = 1; i <= string.len(encodedItem); i++) {
    const char = string.sub(encodedItem, i, i)
    value = value * CHARSET_LENGTH + (CHAR_TO_VALUE[char] as number)
  }
  printLog(LOG_LEVELS.debug, "IntChars: %s (%d):", encodedItem, value)
  return value
}

DECODE_DATA_HANDLER.DecodeString = function (this: DecodeInstance, controlChar: string): string {
  let encodedLength = this.GetNextChar()
  if (controlChar === CONTROL_CHARS.STRING_LONG) {
    encodedLength = encodedLength + this.GetNextChar()
  }
  const length = this.DecodeBase(encodedLength)
  return this.GetEncodedItem(length)
}

DECODE_DATA_HANDLER.DecodeArray = function (this: DecodeInstance): unknown[] {
  const array: unknown[] = []
  while (this.GetNextChar(true) !== ",") {
    array.push(this.DecodeItem())
  }
  this.MoveCurrentPos(1)
  return array
}

DECODE_DATA_HANDLER.DecodeTable = function (this: DecodeInstance): LuaTable {
  const tableValue: LuaTable = {}
  while (this.GetNextChar(true) !== ",") {
    const key = this.DecodeItem()
    tableValue[asLdeValue(key)] = this.DecodeItem()
  }
  this.MoveCurrentPos(1)
  return tableValue
}

DECODE_DATA_HANDLER.DecodeInteger = function (this: DecodeInstance): number {
  const encodedItem = this.GetEncodedItem()
  return this.DecodeBase(encodedItem)
}

DECODE_DATA_HANDLER.DecodeNumeric = function (this: DecodeInstance): number | undefined {
  return tonumber(this.GetEncodedItem())
}

export function decode<T = unknown>(
  this: void,
  encodedData: readonly string[],
  globalDict?: LdeValue[]
): LuaMultiReturn<[T, LdeValue[]]> {
  const decoded = DECODE_DATA_HANDLER.New(encodedData, globalDict)
  return $multi(decoded.data as T, decoded.dictionary)
}

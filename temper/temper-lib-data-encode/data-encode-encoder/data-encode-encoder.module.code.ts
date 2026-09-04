import { asLdeValue, asLuaArray } from "../data-encode-casts/data-encode-casts.module.code.ts"
import {
  CHARSET_LENGTH,
  CONTROL_CHARS,
  VALUE_TO_CHAR,
} from "../data-encode-charset/data-encode-charset.module.code.ts"
import { makeDictionary } from "../data-encode-dictionary/data-encode-dictionary.module.code.ts"
import {
  LOG_LEVELS,
  printLog,
  RUNTIME,
} from "../data-encode-runtime/data-encode-runtime.module.code.ts"
import type {
  EncodeClass,
  EncodeInstance,
  LdeValue,
  LuaTable,
} from "../data-encode-types/data-encode-types.module.code.ts"

const ENCODE_DATA_HANDLER = ZO_InitializingObject.Subclass<EncodeClass>()

ENCODE_DATA_HANDLER.Initialize = function (
  this: EncodeInstance,
  data: unknown,
  localDictionary?: LdeValue[] | true,
  globalDictionary?: LdeValue[]
): undefined {
  if (RUNTIME.debug && RUNTIME.testresult !== undefined) {
    RUNTIME.testresult.encoder = this
  }
  this.data = data
  this.encodedStrings = []
  this.currentString = ""
  this.currentStringLength = 0
  this.globalDictionary = globalDictionary

  if (globalDictionary === undefined) {
    this.dictionary = []
  } else {
    this.dictionary = ZO_ShallowTableCopy(globalDictionary)
  }
  if (localDictionary !== undefined) {
    this.InitDictionary(localDictionary)
  }
  this.MakeReverseDictionary()

  this.EncodeItem(data)
  this.NewLine()
}

ENCODE_DATA_HANDLER.InitDictionary = function (
  this: EncodeInstance,
  localDictionary: LdeValue[] | true
): undefined {
  const dict: LdeValue[] =
    localDictionary === true ? makeDictionary(this.data, this.globalDictionary) : localDictionary
  this.EncodeDictionary(dict)
  for (const value of dict) {
    this.dictionary.push(value)
  }
}

ENCODE_DATA_HANDLER.MakeReverseDictionary = function (this: EncodeInstance): undefined {
  const reverse: LuaTable = {}
  for (let i = 1; i <= this.dictionary.length; i++) {
    reverse[asLdeValue(this.dictionary[i - 1])] = i
  }
  this.reverseDictionary = reverse
}

let lastString: string | undefined

ENCODE_DATA_HANDLER.AddString = function (this: EncodeInstance, str: string): undefined {
  const numChars = string.len(str)
  if (
    this.currentStringLength + numChars > 998 &&
    (str !== CONTROL_CHARS.END || lastString === CONTROL_CHARS.END)
  ) {
    this.NewLine()
  }
  this.currentString = this.currentString + str
  this.currentStringLength = this.currentStringLength + numChars
  lastString = str
}

ENCODE_DATA_HANDLER.AddInteger = function (this: EncodeInstance, integer: number): undefined {
  let str = ""
  let value = integer
  if (value === 0) {
    str = VALUE_TO_CHAR[0] as string
  }
  while (value > 0) {
    const res = VALUE_TO_CHAR[value % CHARSET_LENGTH] as string
    str = res + str
    value = math.floor(value / CHARSET_LENGTH)
  }
  this.AddString(str)
}

ENCODE_DATA_HANDLER.NewLine = function (this: EncodeInstance): undefined {
  if (this.currentStringLength === 0) {
    return
  }
  this.encodedStrings.push(this.currentString)
  this.currentString = ""
  this.currentStringLength = 0
}

ENCODE_DATA_HANDLER.EncodeDictionary = function (
  this: EncodeInstance,
  dictionary: LdeValue[]
): undefined {
  this.AddString("D")
  const globalDictItems = this.globalDictionary !== undefined ? this.globalDictionary.length : 0
  this.EncodeItem(globalDictItems)
  this.EncodeItem(dictionary)
}

ENCODE_DATA_HANDLER.CheckForStringId = function (
  this: EncodeInstance,
  value: unknown
): number | undefined {
  if (
    this.reverseDictionary !== undefined &&
    (type(value) === "number" || type(value) === "string")
  ) {
    const id = this.reverseDictionary[asLdeValue(value)]
    if (id !== undefined) {
      return id as number
    }
  }
  return undefined
}

ENCODE_DATA_HANDLER.EncodeItem = function (this: EncodeInstance, value: unknown): undefined {
  const valueType = type(value)
  const stringId = this.CheckForStringId(value)

  if (stringId !== undefined && stringId < CHARSET_LENGTH * CHARSET_LENGTH * CHARSET_LENGTH) {
    if (stringId < CHARSET_LENGTH) {
      this.AddString(CONTROL_CHARS.STRINGID_1)
    } else if (stringId < CHARSET_LENGTH * CHARSET_LENGTH) {
      this.AddString(CONTROL_CHARS.STRINGID_2)
    } else {
      this.AddString(CONTROL_CHARS.STRINGID_3)
    }
    this.AddInteger(stringId)
  } else if (valueType === "table") {
    const numEntries = NonContiguousCount(value as LuaTable)
    if (asLuaArray(value).length === numEntries) {
      this.AddString(CONTROL_CHARS.ARRAY)
      this.EncodeArray(value)
      this.AddString(CONTROL_CHARS.END)
    } else {
      this.AddString(CONTROL_CHARS.TABLE)
      this.EncodeTable(value)
      this.AddString(CONTROL_CHARS.END)
    }
  } else if (valueType === "string") {
    const str = value as string
    const stringLength = string.len(str)
    if (stringLength < CHARSET_LENGTH) {
      this.AddString(CONTROL_CHARS.STRING)
      this.AddInteger(stringLength)
      this.AddString(str)
    } else {
      if (stringLength > 996) {
        printLog(
          LOG_LEVELS.error,
          "Trying to encode a string, which exceeds maximum length of 996 chars!"
        )
      }
      this.AddString(CONTROL_CHARS.STRING_LONG)
      this.AddInteger(stringLength)
      this.AddString(string.sub(str, 1, 996))
    }
  } else if (valueType === "number") {
    const num = value as number
    if (math.floor(num) === num && num >= 0 && num < 68719476736) {
      this.AddString(CONTROL_CHARS.UINT)
      this.AddInteger(num)
      this.AddString(CONTROL_CHARS.END)
    } else {
      this.AddString(CONTROL_CHARS.NUMERIC)
      this.AddString(tostring(value))
      this.AddString(CONTROL_CHARS.END)
    }
  } else if (valueType === "boolean") {
    if (value === true) {
      this.AddString(CONTROL_CHARS.TRUE)
    } else {
      this.AddString(CONTROL_CHARS.FALSE)
    }
  } else if (valueType === "function") {
    printLog(LOG_LEVELS.debug, "Encoding of functions is not supported.")
  }
}

ENCODE_DATA_HANDLER.EncodeArray = function (this: EncodeInstance, array: unknown): undefined {
  for (const value of asLuaArray(array)) {
    this.EncodeItem(value)
  }
}

ENCODE_DATA_HANDLER.EncodeTable = function (this: EncodeInstance, tableValue: unknown): undefined {
  for (const [key, value] of pairs(tableValue as LuaTable)) {
    if (type(key) === "function" || type(value) === "function") {
      printLog(LOG_LEVELS.debug, "Encoding of functions is not supported.")
    } else {
      this.EncodeItem(key)
      this.EncodeItem(value)
    }
  }
}

export function encode(
  this: void,
  data: unknown,
  localDict?: LdeValue[] | true,
  globalDict?: LdeValue[]
): string[] {
  const encoded = ENCODE_DATA_HANDLER.New(data, localDict, globalDict)
  return encoded.encodedStrings
}

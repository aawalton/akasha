import { asLdeValue, asLuaArray, asLuaTable, asNumber, asString } from "./casts"
import { charsetLength, controlChars, valueToChar } from "./constants"
import { makeDictionary } from "./dictionary"
import { logLevels, Print, runtime } from "./runtime"
import type { EncodeClass, EncodeInstance, LdeValue, LuaTable } from "./types"

const EncodeDataHandler = ZO_InitializingObject.Subclass<EncodeClass>()

EncodeDataHandler.Initialize = function (
  this: EncodeInstance,
  data: unknown,
  localDictionary?: LdeValue[] | true,
  globalDictionary?: LdeValue[]
): undefined {
  if (runtime.debug && runtime.testresult !== undefined) {
    runtime.testresult.encoder = this
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

EncodeDataHandler.InitDictionary = function (
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

EncodeDataHandler.MakeReverseDictionary = function (this: EncodeInstance): undefined {
  const reverse: LuaTable = {}
  for (let i = 1; i <= this.dictionary.length; i++) {
    reverse[asLdeValue(this.dictionary[i - 1])] = i
  }
  this.reverseDictionary = reverse
}

let laststring: string | undefined

EncodeDataHandler.AddString = function (this: EncodeInstance, str: string): undefined {
  const numChars = string.len(str)
  if (
    this.currentStringLength + numChars > 998 &&
    (str !== controlChars.END || laststring === controlChars.END)
  ) {
    this.NewLine()
  }
  this.currentString = this.currentString + str
  this.currentStringLength = this.currentStringLength + numChars
  laststring = str
}

EncodeDataHandler.AddInteger = function (this: EncodeInstance, integer: number): undefined {
  let str = ""
  let value = integer
  if (value === 0) {
    str = asString(valueToChar[0])
  }
  while (value > 0) {
    const res = asString(valueToChar[value % charsetLength])
    str = res + str
    value = math.floor(value / charsetLength)
  }
  this.AddString(str)
}

EncodeDataHandler.NewLine = function (this: EncodeInstance): undefined {
  if (this.currentStringLength === 0) {
    return
  }
  this.encodedStrings.push(this.currentString)
  this.currentString = ""
  this.currentStringLength = 0
}

EncodeDataHandler.EncodeDictionary = function (
  this: EncodeInstance,
  dictionary: LdeValue[]
): undefined {
  this.AddString("D")
  const globalDictItems = this.globalDictionary !== undefined ? this.globalDictionary.length : 0
  this.EncodeItem(globalDictItems)
  this.EncodeItem(dictionary)
}

EncodeDataHandler.CheckForStringId = function (
  this: EncodeInstance,
  value: unknown
): number | undefined {
  if (
    this.reverseDictionary !== undefined &&
    (type(value) === "number" || type(value) === "string")
  ) {
    const id = this.reverseDictionary[asLdeValue(value)]
    if (id !== undefined) {
      return asNumber(id)
    }
  }
  return undefined
}

EncodeDataHandler.EncodeItem = function (this: EncodeInstance, value: unknown): undefined {
  const valueType = type(value)
  const stringId = this.CheckForStringId(value)

  if (stringId !== undefined && stringId < charsetLength * charsetLength * charsetLength) {
    if (stringId < charsetLength) {
      this.AddString(controlChars.STRINGID_1)
    } else if (stringId < charsetLength * charsetLength) {
      this.AddString(controlChars.STRINGID_2)
    } else {
      this.AddString(controlChars.STRINGID_3)
    }
    this.AddInteger(stringId)
  } else if (valueType === "table") {
    const numEntries = NonContiguousCount(asLuaTable(value))
    if (asLuaArray(value).length === numEntries) {
      this.AddString(controlChars.ARRAY)
      this.EncodeArray(value)
      this.AddString(controlChars.END)
    } else {
      this.AddString(controlChars.TABLE)
      this.EncodeTable(value)
      this.AddString(controlChars.END)
    }
  } else if (valueType === "string") {
    const str = asString(value)
    const stringLength = string.len(str)
    if (stringLength < charsetLength) {
      this.AddString(controlChars.STRING)
      this.AddInteger(stringLength)
      this.AddString(str)
    } else {
      if (stringLength > 996) {
        Print(
          logLevels.error,
          "Trying to encode a string, which exceeds maximum length of 996 chars!"
        )
      }
      this.AddString(controlChars.STRING_LONG)
      this.AddInteger(stringLength)
      this.AddString(string.sub(str, 1, 996))
    }
  } else if (valueType === "number") {
    const num = asNumber(value)
    if (math.floor(num) === num && num >= 0 && num < 68719476736) {
      this.AddString(controlChars.UINT)
      this.AddInteger(num)
      this.AddString(controlChars.END)
    } else {
      this.AddString(controlChars.NUMERIC)
      this.AddString(tostring(value))
      this.AddString(controlChars.END)
    }
  } else if (valueType === "boolean") {
    if (value === true) {
      this.AddString(controlChars.TRUE)
    } else {
      this.AddString(controlChars.FALSE)
    }
  } else if (valueType === "function") {
    Print(logLevels.debug, "Encoding of functions is not supported.")
  }
}

EncodeDataHandler.EncodeArray = function (this: EncodeInstance, array: unknown): undefined {
  for (const value of asLuaArray(array)) {
    this.EncodeItem(value)
  }
}

EncodeDataHandler.EncodeTable = function (this: EncodeInstance, tableValue: unknown): undefined {
  for (const [key, value] of pairs(asLuaTable(tableValue))) {
    if (type(key) === "function" || type(value) === "function") {
      Print(logLevels.debug, "Encoding of functions is not supported.")
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
  const encoded = EncodeDataHandler.New(data, localDict, globalDict)
  return encoded.encodedStrings
}

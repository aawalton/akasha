import type { ControlCharSpec } from "./types"

export const LIB_NAME = "LibDataEncode"
export const SHORT_NAME = "LDE"
export const VERSION = "2"

export const charset =
  " ()*-./0123456789:;<>@ABCDEFGHIJKLMNOPQRSTUVWXYZ]^_`abcdefghijklmnopqrstuvwxyz|}~"

export const charsetLength = charset.length

export const controlCharConfig: Record<string, ControlCharSpec> = {
  ",": { name: "END" },
  "!": { name: "TRUE", length: 1, decoder: "DecodeBool" },
  "?": { name: "FALSE", length: 1, decoder: "DecodeBool" },
  "#": { name: "STRINGID_1", length: 1, decoder: "DecodeStringId" },
  "&": { name: "STRINGID_2", length: 2, decoder: "DecodeStringId" },
  "§": { name: "STRINGID_3", length: 3, decoder: "DecodeStringId" },
  $: { name: "STRING", decoder: "DecodeString" },
  "%": { name: "STRING_LONG", decoder: "DecodeString" },
  "{": { name: "TABLE", decoder: "DecodeTable" },
  "[": { name: "ARRAY", decoder: "DecodeArray" },
  "+": { name: "UINT", decoder: "DecodeInteger" },
  "=": { name: "NUMERIC", decoder: "DecodeNumeric" },
}

export const valueToChar: Record<number, string> = {}
export const charToValue: Record<string, number> = {}

for (let i = 1; i <= charsetLength; i++) {
  const char = string.sub(charset, i, i)
  valueToChar[i - 1] = char
  charToValue[char] = i - 1
}

export const controlChars = {
  END: ",",
  TRUE: "!",
  FALSE: "?",
  STRINGID_1: "#",
  STRINGID_2: "&",
  STRINGID_3: "§",
  STRING: "$",
  STRING_LONG: "%",
  TABLE: "{",
  ARRAY: "[",
  UINT: "+",
  NUMERIC: "=",
} as const

export const decoderFunctionNames: Record<string, string> = {}

for (const [char, spec] of pairs(controlCharConfig)) {
  if (charToValue[char] !== undefined) {
    error(
      "Error: A char cannot be part of the control character set and the encoder character set at the same time!"
    )
  }
  if (spec.decoder !== undefined) {
    decoderFunctionNames[char] = spec.decoder
  }
}

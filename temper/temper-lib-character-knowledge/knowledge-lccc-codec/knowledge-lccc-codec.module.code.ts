import {
  asLua1Based,
  asNumber,
  asString,
  asStringArray,
} from "../knowledge-casts/knowledge-casts.module.code.ts"

const DICT = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%"

const ENCODE_BYTE: number[] = []
const DECODE_VALUE: Record<number, number> = {}
for (let i = 1; i <= 64; i++) {
  const byte = string.byte(DICT, i)
  ENCODE_BYTE[i - 1] = byte
  DECODE_VALUE[byte] = i - 1
}

function decodeValue(this: void, byte: number | undefined): number | undefined {
  if (byte === undefined) {
    return undefined
  }
  return DECODE_VALUE[byte]
}

export function encode(this: void, value: number, size?: number): string {
  const lsb: number[] = []
  let n = value
  while (n > 0) {
    lsb.push(n % 0x40)
    n = zo_floor(n / 0x40)
  }
  let count = lsb.length

  if (size === 0) {
    if (count % 2 === 1) {
      lsb.push(0)
      count = count + 1
    }
  } else if (size !== undefined && size > count) {
    while (count < size) {
      lsb.push(0)
      count = count + 1
    }
  }

  let result = ""
  for (let k = count - 1; k >= 0; k--) {
    result = result + string.char(asNumber(ENCODE_BYTE[asNumber(lsb[k])]))
  }
  return result
}

export function decode(this: void, code: string): number {
  let result = 0
  const len = zo_strlen(code)
  for (let i = 1; i <= len; i++) {
    const value = decodeValue(string.byte(code, i))
    if (value === undefined) {
      return 0
    }
    result = result * 0x40 + value
  }
  return result
}

export function readAndDecode(
  this: void,
  encoded: string,
  pos: number,
  bytes: number
): LuaMultiReturn<[number, number]> {
  if (bytes === 1) {
    const value = decodeValue(string.byte(encoded, pos))
    return $multi(value ?? 0, pos + 1)
  }
  const newPos = pos + bytes
  return $multi(decode(zo_strsub(encoded, pos, newPos - 1)), newPos)
}

export function readBitFromEncodedData(
  this: void,
  data: string | string[],
  pos: number,
  bitsPerLine?: number
): boolean {
  if (pos > 0) {
    let p = pos - 1
    let current: string | string[] | undefined = data
    if (type(current) === "table") {
      const lines = asLua1Based(current)
      current = lines[zo_floor(p / asNumber(bitsPerLine)) + 1]
      p = p % asNumber(bitsPerLine)
    }
    if (type(current) === "string") {
      const value = decodeValue(string.byte(asString(current), zo_floor(p / 6) + 1)) ?? 0
      return BitRShift(value, 5 - (p % 6)) % 2 === 1
    }
  }
  return false
}

function consolidate(this: void, str: string, char: string, flag: number): string {
  const [result] = string.gsub(
    str,
    string.format("(%s+)", string.rep(char, 4)),
    (capture: string): string => {
      let length = zo_strlen(capture)
      if (length <= 0x7ff) {
        return "~" + encode(0x800 * flag + length, 2)
      }
      let encoded = ""
      do {
        const chunk = length <= 0x7ff ? length : 0x7ff
        encoded = encoded + "~" + encode(0x800 * flag + chunk, 2)
        length = length - chunk
      } while (length > 0)
      return encoded
    }
  )
  return result
}

export function implode(this: void, str: string): string {
  return consolidate(consolidate(str, "0", 0), "%%", 1)
}

export function explode(this: void, str: string): string {
  const [result] = string.gsub(str, "~(..)", (capture: string): string => {
    const code = decode(capture)
    return string.rep(BitRShift(code, 11) === 0 ? "0" : "%", BitAnd(code, 0x7ff))
  })
  return result
}

const DEFAULT_CHUNK_SIZE = 0x600

export function chunk(this: void, str: string, chunkSize?: number): string | string[] {
  const size = type(chunkSize) === "number" ? asNumber(chunkSize) : DEFAULT_CHUNK_SIZE
  const length = zo_strlen(str)
  if (length <= size) {
    return str
  }
  const result: string[] = []
  let i = 1
  while (i <= length) {
    const j = i + size
    result.push(zo_strsub(str, i, j - 1))
    i = j
  }
  return result
}

export function unchunk(this: void, chunked: string | string[] | undefined): string {
  if (type(chunked) === "string") {
    return asString(chunked)
  }
  if (type(chunked) === "table") {
    return table.concat(asStringArray(chunked), "")
  }
  return ""
}

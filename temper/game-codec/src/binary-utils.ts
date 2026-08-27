export interface BitWriterState {
  bytes: readonly number[]
  currentByte: number
  bitPosition: number
}

export function makeBitWriter(): BitWriterState {
  return { bytes: [], currentByte: 0, bitPosition: 0 }
}

export function writeBits(state: BitWriterState, value: number, bits: number): undefined {
  if (bits < 1 || bits > 32) {
    throw new Error(`Invalid bit count: ${bits}`)
  }

  const mask = bits === 32 ? 0xffffffff : (1 << bits) - 1
  value = value & mask

  for (let i = bits - 1; i >= 0; i--) {
    const bit = (value >> i) & 1
    state.currentByte = (state.currentByte << 1) | bit
    state.bitPosition++

    if (state.bitPosition === 8) {
      state.bytes = [...state.bytes, state.currentByte]
      state.currentByte = 0
      state.bitPosition = 0
    }
  }
}

export function bitWriterToBytes(state: BitWriterState): Uint8Array {
  const result = [...state.bytes]

  if (state.bitPosition > 0) {
    result.push(state.currentByte << (8 - state.bitPosition))
  }

  return new Uint8Array(result)
}

export interface BitReaderState {
  data: Uint8Array
  byteIndex: number
  bitPosition: number
}

export function makeBitReader(data: Uint8Array): BitReaderState {
  return { data, byteIndex: 0, bitPosition: 0 }
}

export function readBits(state: BitReaderState, bits: number): number {
  if (bits < 1 || bits > 32) {
    throw new Error(`Invalid bit count: ${bits}`)
  }

  let value = 0

  for (let i = 0; i < bits; i++) {
    const byte = state.data[state.byteIndex]
    if (byte === undefined) {
      throw new Error("Unexpected end of data")
    }

    const bitIndex = 7 - state.bitPosition
    const bit = (byte >> bitIndex) & 1
    value = (value << 1) | bit

    state.bitPosition++
    if (state.bitPosition === 8) {
      state.byteIndex++
      state.bitPosition = 0
    }
  }

  return value
}

export function bytesToBase64url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  const base64 = btoa(binary)

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export function base64urlToBytes(str: string): Uint8Array | null {
  try {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/")

    const padding = base64.length % 4
    if (padding === 2) {
      base64 += "=="
    } else if (padding === 3) {
      base64 += "="
    }

    const binary = atob(base64)

    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    return bytes
  } catch {
    return null
  }
}

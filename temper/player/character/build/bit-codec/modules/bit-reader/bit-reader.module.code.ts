import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import { requireAt } from "akasha/code/type/narrowing/modules/require-at/require-at.module.code.ts"

interface BitReaderState {
  data: readonly number[]
  byteIndex: number
  bitPosition: number
}

export function makeBitReader(data: readonly number[]): BitReaderState {
  return { data, byteIndex: 0, bitPosition: 0 }
}

export function readBits(state: BitReaderState, numBits: number): number {
  let value = 0

  for (let i = 0; i < numBits; i++) {
    if (state.byteIndex >= state.data.length) {
      return value
    }

    const bitIndex = 7 - state.bitPosition
    const bit = BitAnd(
      BitRShift(requireAt(state.data, state.byteIndex, "bit-reader data"), bitIndex),
      1
    )
    value = BitOr(BitLShift(value, 1), bit)

    state.bitPosition++
    if (state.bitPosition === 8) {
      state.byteIndex++
      state.bitPosition = 0
    }
  }

  return value
}

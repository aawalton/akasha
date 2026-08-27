import { charset, charToValue, LIB_NAME, SHORT_NAME, VERSION, valueToChar } from "./constants"
import { decode } from "./decoder"
import { makeDictionary } from "./dictionary"
import { encode } from "./encoder"
import { runtime } from "./runtime"
import { PerformTest } from "./self-test"
import type { LibSurface } from "./types"

export const lib: LibSurface = {
  name: LIB_NAME,
  shortName: SHORT_NAME,
  version: VERSION,
  debug: runtime.debug,
  internal: {},
  charsetConfig: {
    charset,
    valueToChar,
    charToValue,
  },
  Encode: encode,
  Decode: decode,
  MakeDictionary: makeDictionary,
  PerformTest,
}

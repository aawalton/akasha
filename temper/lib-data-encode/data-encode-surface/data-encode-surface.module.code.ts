import {
  CHAR_TO_VALUE,
  CHARSET,
  LIB_NAME,
  SHORT_NAME,
  VALUE_TO_CHAR,
  VERSION,
} from "../data-encode-charset/data-encode-charset.module.code.ts"
import { decode } from "../data-encode-decoder/data-encode-decoder.module.code.ts"
import { makeDictionary } from "../data-encode-dictionary/data-encode-dictionary.module.code.ts"
import { encode } from "../data-encode-encoder/data-encode-encoder.module.code.ts"
import { RUNTIME } from "../data-encode-runtime/data-encode-runtime.module.code.ts"
import { performTest } from "../data-encode-self-test/data-encode-self-test.module.code.ts"
import type { LibSurface } from "../data-encode-types/data-encode-types.module.code.ts"

export const DATA_ENCODE: LibSurface = {
  name: LIB_NAME,
  shortName: SHORT_NAME,
  version: VERSION,
  debug: RUNTIME.debug,
  internal: {},
  charsetConfig: {
    charset: CHARSET,
    valueToChar: VALUE_TO_CHAR,
    charToValue: CHAR_TO_VALUE,
  },
  Encode: encode,
  Decode: decode,
  MakeDictionary: makeDictionary,
  PerformTest: performTest,
}

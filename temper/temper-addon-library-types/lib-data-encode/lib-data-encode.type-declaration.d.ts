type LibDataEncodeDictionary = (string | number)[]

interface LibDataEncodeTestResult {
  result?: boolean
  encoded?: string[]
  decoded?: unknown
  dict?: LibDataEncodeDictionary
  testDictGlobal?: LibDataEncodeDictionary
}

interface LibDataEncodeSurface {
  name: string
  shortName: string
  version: string
  debug: boolean
  internal: Record<string | number, unknown>
  charsetConfig: {
    charset: string
    valueToChar: Record<number, string>
    charToValue: Record<string, number>
  }
  Encode: (
    this: void,
    data: unknown,
    localDict?: LibDataEncodeDictionary | true,
    globalDict?: LibDataEncodeDictionary
  ) => string[]
  Decode: <T = unknown>(
    this: void,
    encodedData: readonly string[],
    globalDict?: LibDataEncodeDictionary
  ) => LuaMultiReturn<[T, LibDataEncodeDictionary]>
  MakeDictionary: (
    this: void,
    data: unknown,
    globalDictionary?: LibDataEncodeDictionary
  ) => LibDataEncodeDictionary
  PerformTest: (
    this: void,
    testname: string,
    testData: unknown,
    testDictLocal?: LibDataEncodeDictionary | true,
    testDictGlobal?: LibDataEncodeDictionary
  ) => LibDataEncodeTestResult
}

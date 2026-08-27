type LdeDictionary = (string | number)[]

interface LdeTestResult {
  result: boolean
  encoded: string[]
  decoded: unknown
  dict: LdeDictionary
  testDictGlobal?: LdeDictionary
}

interface LibDataEncodeApi {
  Encode(
    this: void,
    data: unknown,
    localDict?: LdeDictionary | true,
    globalDict?: LdeDictionary
  ): string[]
  Decode<T = unknown>(
    this: void,
    encodedData: readonly string[],
    globalDict?: LdeDictionary
  ): LuaMultiReturn<[T, LdeDictionary]>
  PerformTest(
    this: void,
    testName: string,
    testData: unknown,
    localDict?: LdeDictionary | true,
    globalDict?: LdeDictionary
  ): LdeTestResult
}

declare const LibDataEncode: LibDataEncodeApi | undefined

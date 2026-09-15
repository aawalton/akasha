interface TemperWritLckMotifApi {
  GetMotifKnowledgeForCharacter: (this: void, motifNum: number, motifPage: number) => number
  KNOWLEDGE_KNOWN: number
}

interface TemperWritLibSetsInfo {
  setNames?: Record<string, string | undefined>
  traitsNeeded?: number
}

interface TemperWritLibSetsApi {
  GetSetInfo: (this: void, setId: number) => TemperWritLibSetsInfo | undefined
  GetSetName: (this: void, setId: number, lang?: string) => string | undefined
}

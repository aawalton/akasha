type LckItem = Record<string, unknown>

interface LckCharacter {
  id: string
  account?: string
  name: string
}

interface LibCharacterKnowledgeApi {
  KNOWLEDGE_INVALID: number
  KNOWLEDGE_NODATA: number
  KNOWLEDGE_KNOWN: number
  KNOWLEDGE_UNKNOWN: number

  ITEM_CATEGORY_NONE: number
  ITEM_CATEGORY_RECIPE: number
  ITEM_CATEGORY_PLAN: number
  ITEM_CATEGORY_MOTIF: number
  ITEM_CATEGORY_SCRIBING: number

  readonly EVENT_INITIALIZED: number

  GetCharacterList: (this: void, server?: string) => LckCharacter[]

  GetItemKnowledgeForCharacter: (
    this: void,
    item: LckItem | number | string,
    server?: string,
    charId?: string
  ) => number

  GetMotifKnowledgeForCharacter: (
    this: void,
    styleId: number,
    chapterId: number,
    server: string | undefined,
    characterId: string | undefined
  ) => number

  IsKnowledgeUsable: (this: void, knowledge: number) => boolean

  GetSmithingResearchLineTraitInfoForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: string,
    charId?: string
  ) => LuaMultiReturn<[traitType: number, traitDescription: string, isKnown: boolean]>

  GetSmithingResearchStatusForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    traitIndex: number,
    server?: string,
    charId?: string
  ) => LuaMultiReturn<[knowledge: number, remaining: number | undefined]>

  GetSmithingResearchLineKnownTraitCountForCharacter: (
    this: void,
    craftingSkillType: number,
    researchLineIndex: number,
    server?: string,
    charId?: string
  ) => number

  CanItemLinkBeTraitResearchedByCharacter: (
    this: void,
    itemLink: string,
    server?: string,
    charId?: string
  ) => boolean

  RegisterForCallback: (
    this: void,
    name: string,
    eventCode: number,
    callback: (this: void) => void
  ) => void
}

declare const LibCharacterKnowledge: LibCharacterKnowledgeApi

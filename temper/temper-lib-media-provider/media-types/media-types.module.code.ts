export interface MediaTypeMap {
  readonly BACKGROUND: string
  readonly BORDER: string
  readonly FONT: string
  readonly STATUSBAR: string
  readonly SOUND: string
}

export interface ProviderState {
  name: string
  lang: string
  defaultMedia: Record<string, string>
  mediaList: Record<string, string[]>
  mediaTable: Record<string, Record<string, string>>
  sharedMediaTable: Record<string, Record<string, string>>
  mediaType: MediaTypeMap
  blacklistedFont: Record<string, boolean>
}

export interface LibMediaProviderApi {
  Register: (this: LibMediaProviderApi, mediatype: string, key: string, data: string) => boolean
  Fetch: (this: LibMediaProviderApi, mediatype: string, key: string) => string | undefined
  IsValid: (this: LibMediaProviderApi, mediatype: string, key?: string) => boolean
  HashTable: (this: LibMediaProviderApi, mediatype: string) => Record<string, string> | undefined
  List: (this: LibMediaProviderApi, mediatype: string) => string[] | undefined
  GetDefault: (this: LibMediaProviderApi, mediatype: string) => string | undefined
  SetDefault: (this: LibMediaProviderApi, mediatype: string, key: string) => boolean
  MediaType: MediaTypeMap
  MediaTable: Record<string, Record<string, never>>
}

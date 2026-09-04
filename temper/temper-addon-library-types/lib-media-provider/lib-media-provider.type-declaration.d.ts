interface LibMediaProviderMediaType {
  readonly BACKGROUND: string
  readonly BORDER: string
  readonly FONT: string
  readonly STATUSBAR: string
  readonly SOUND: string
}

interface LibMediaProvider {
  Register: (this: LibMediaProvider, mediatype: string, key: string, data: string) => boolean
  Fetch: (this: LibMediaProvider, mediatype: string, key: string) => string | undefined
  IsValid: (this: LibMediaProvider, mediatype: string, key?: string) => boolean
  HashTable: (this: LibMediaProvider, mediatype: string) => Record<string, string> | undefined
  List: (this: LibMediaProvider, mediatype: string) => string[] | undefined
  GetDefault: (this: LibMediaProvider, mediatype: string) => string | undefined
  SetDefault: (this: LibMediaProvider, mediatype: string, key: string) => boolean
  MediaType: LibMediaProviderMediaType
  MediaTable: Record<string, Record<string, never>>
}

declare const LibMediaProvider: LibMediaProvider

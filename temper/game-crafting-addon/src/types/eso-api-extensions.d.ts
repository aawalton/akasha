declare function IsSmithingStyleKnown(itemStyleId: number): boolean

declare function GetItemStyleMaterialLink(itemStyleId: number): string

declare function GetLoreBookInfo(
  categoryIndex: number | undefined,
  collectionIndex: number | undefined,
  bookIndex: number
): LuaMultiReturn<[title: string, icon: string, known: boolean, bookId: number]>

declare function ZO_LinkHandler_ParseLink(
  link: string | undefined
): LuaMultiReturn<
  [
    text: string | undefined,
    color: string | undefined,
    linkType: string | undefined,
    param1: string | undefined,
    param2: string | undefined,
    param3: string | undefined,
  ]
>

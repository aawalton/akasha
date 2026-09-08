export function joinPath(cardId: string, itemPath?: readonly (string | number)[] | null): string {
  if (itemPath == null || itemPath.length === 0) return cardId
  return `${cardId}/${itemPath.map(String).join("/")}`
}

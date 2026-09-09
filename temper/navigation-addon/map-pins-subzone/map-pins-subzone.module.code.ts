function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

export function getSubzone(this: void): string {
  const tile = GetMapTileTexture()
  const [matchedCapture] = string.match(tile, "[^\\/]+$")
  const matched = parseLuaCapture(matchedCapture)
  if (matched === undefined) return ""
  const lowered = string.lower(matched)
  const [noExt] = string.gsub(lowered, "%.dds$", "")
  const [subzone] = string.gsub(noExt, "_[0-9]+$", "")
  return subzone
}

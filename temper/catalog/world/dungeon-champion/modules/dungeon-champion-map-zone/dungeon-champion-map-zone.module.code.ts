import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"

function cleanedTileTexture(): string {
  const [stripped] = string.gsub(string.lower(GetMapTileTexture()), "ui_map_", "")
  return stripped
}

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

export function getZoneSubzone(): [string | undefined, string | undefined] {
  const [rawZone, rawSubzone] = string.match(
    cleanedTileTexture(),
    "maps/([%w%-]+)/([%w%-]+_[%w%-]+)"
  )
  const zone = parseLuaCapture(rawZone)
  const subzone = parseLuaCapture(rawSubzone)
  return [zone, subzone]
}

export function getCombinedZone(): string | undefined {
  const [rawCombined] = string.match(cleanedTileTexture(), "maps/([%w%-]+/[%w%-]+_[%w%-]+)")
  return parseLuaCapture(rawCombined)
}

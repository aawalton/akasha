import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import { mineRowsKeyed } from "akasha/temper/web/modules/mine-row-reading/mine-row-reading.module.code.ts"

const LINKED_ITEM = /\|H\d?:item:(\d+):/g

const MISSING = "icon_missing"

const PER_CHUNK = 4000

const ANSWERING = `
local before = GetItemLinkIcon
GetItemLinkIcon = function(link)
  local id = tonumber(string.match(link or "", "item:(%d+):"))
  local icon = id ~= nil and __ui_item_icons[id] or nil
  if icon ~= nil then return icon end
  return before(link)
end
return 0`

export function itemIdsIn(sources: readonly string[]): readonly number[] {
  const found = new Set<number>()
  for (const source of sources) {
    for (const match of source.matchAll(LINKED_ITEM)) found.add(Number(match[1]))
  }
  return [...found].sort((a, b) => a - b)
}

export function itemIconsLua(icons: ReadonlyMap<number, string>): readonly string[] {
  const rows = [...icons].map(([id, icon]) => `[${String(id)}] = ${luaStringLiteral(icon)}`)
  const chunks = ["__ui_item_icons = __ui_item_icons or {} return 0"]
  for (let at = 0; at < rows.length; at += PER_CHUNK) {
    const part = rows.slice(at, at + PER_CHUNK).join(", ")
    chunks.push(`for id, icon in pairs({${part}}) do __ui_item_icons[id] = icon end return 0`)
  }
  return [...chunks, ANSWERING]
}

export async function minedIcons(ids: readonly number[]): Promise<ReadonlyMap<number, string>> {
  const icons = new Map<number, string>()
  const read = await mineRowsKeyed("items", "itemId", ids)
  if (!read.ok) return icons
  for (const row of read.rows) {
    const id = row.itemId
    const icon = row.icon
    if (typeof id !== "number" || typeof icon !== "string" || icon.includes(MISSING)) continue
    icons.set(id, icon)
  }
  return icons
}

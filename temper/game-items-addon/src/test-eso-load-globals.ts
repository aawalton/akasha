import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { z } from "zod"
import { luaToNumber } from "./test-lua-tonumber"

function getGlobal(key: string): unknown {
  return Reflect.get(globalThis, key)
}
function setGlobal(key: string, value: unknown): undefined {
  Reflect.set(globalThis, key, value)
}
function hasGlobal(key: string): boolean {
  return Reflect.has(globalThis, key)
}

const here = dirname(fileURLToPath(import.meta.url))
const enumsPath = join(here, "../../../../addons/types/eso/generated/enums.d.ts")
const enumsSrc = readFileSync(enumsPath, "utf8")
const declRe = /^declare const ([A-Z][A-Z0-9_]+):/gm
const ENUM_NAME_CAPTURE = z.tuple([z.string().regex(/^[A-Z][A-Z0-9_]+$/)])
let enumValue = 1
for (const match of enumsSrc.matchAll(declRe)) {
  const [name] = ENUM_NAME_CAPTURE.parse(match.slice(1))
  if (getGlobal(name) === undefined) {
    setGlobal(name, enumValue)
    enumValue += 1
  }
}

const BAG_OVERRIDES: Record<string, number> = {
  BAG_BACKPACK: 1,
  BAG_BANK: 2,
  BAG_WORN: 0,
  BAG_VIRTUAL: 5,
  BAG_SUBSCRIBER_BANK: 6,
  LINK_STYLE_BRACKETS: 1,
}
for (const [key, value] of Object.entries(BAG_OVERRIDES)) setGlobal(key, value)

if (typeof getGlobal("ZO_CreateStringId") !== "function") {
  setGlobal("ZO_CreateStringId", (): undefined => undefined)
}
if (getGlobal("LuaMap") === undefined) setGlobal("LuaMap", Map)
if (getGlobal("LuaSet") === undefined) setGlobal("LuaSet", Set)
if (!hasGlobal("TamrielTradeCentrePrice")) setGlobal("TamrielTradeCentrePrice", undefined)
if (typeof getGlobal("tostring") !== "function") {
  setGlobal("tostring", (v: unknown): string => `${v}`)
}
if (typeof getGlobal("tonumber") !== "function") {
  setGlobal("tonumber", luaToNumber)
}
if (getGlobal("table") === undefined) {
  setGlobal("table", {
    sort: <T>(arr: T[], cmp?: (a: T, b: T) => boolean): undefined => {
      arr.sort((a, b) => (cmp === undefined ? 0 : cmp(a, b) ? -1 : cmp(b, a) ? 1 : 0))
    },
    insert: <T>(arr: T[], v: T): undefined => {
      arr.push(v)
    },
    remove: <T>(arr: T[]): T | undefined => arr.pop(),
  })
}
if (getGlobal("math") === undefined) setGlobal("math", Math)
if (getGlobal("string") === undefined) {
  setGlobal("string", {
    format: (fmt: string, ...args: unknown[]): string => {
      let i = 0
      return fmt.replace(/%[sd]/g, () => `${args[i++]}`)
    },
  })
}

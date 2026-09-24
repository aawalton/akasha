import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  gameFiles,
  manifestEntries,
} from "akasha/temper/eso/ui-harness/modules/game-manifest/game-manifest.module.code.ts"

const SCRATCH = "/var/tmp"

function scratch(): string {
  return mkdtempSync(join(SCRATCH, "esoui-"))
}

const MANIFEST = `; Ingame Script Files
## DependsOn: ZO_IngameLocalization ZO_AppAndInGame

EsoUI\\Ingame\\ChatSystem\\ChatOptions.lua
EsoUI\\Ingame\\ChatSystem\\ChatOptions.xml

EsoUI\\Ingame\\Globals\\Paths.xml
EsoUI\\Ingame\\Globals\\Globals.lua
`

describe("manifestEntries", () => {
  test("keeps the Lua and the documents in the order written, and nothing else", () => {
    expect(manifestEntries(MANIFEST)).toEqual([
      { kind: "lua", rel: "Ingame/ChatSystem/ChatOptions.lua" },
      { kind: "xml", rel: "Ingame/ChatSystem/ChatOptions.xml" },
      { kind: "xml", rel: "Ingame/Globals/Paths.xml" },
      { kind: "lua", rel: "Ingame/Globals/Globals.lua" },
    ])
  })
})

describe("gameFiles", () => {
  test("walks the ingame program's manifests and finds each file in lower case", () => {
    const root = scratch()
    mkdirSync(join(root, "ingame", "globals"), { recursive: true })
    writeFileSync(join(root, "ingame", "ingame.txt"), MANIFEST)
    writeFileSync(join(root, "ingame", "globals", "globals.lua"), "")
    writeFileSync(join(root, "ingame", "globals", "paths.xml"), "")
    expect(gameFiles(root)).toEqual([
      { kind: "xml", at: join(root, "ingame", "globals", "paths.xml") },
      { kind: "lua", at: join(root, "ingame", "globals", "globals.lua") },
    ])
  })

  test("lists nothing for a root holding no manifest", () => {
    expect(gameFiles(scratch())).toEqual([])
  })
})

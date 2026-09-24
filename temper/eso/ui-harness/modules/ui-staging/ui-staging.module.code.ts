import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import {
  stampIn,
  treeIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  esoLiveDirCandidates,
  esouiSourceDir,
} from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import { gameFiles } from "akasha/temper/eso/ui-harness/modules/game-manifest/game-manifest.module.code.ts"
import {
  fontsLua,
  gameFonts,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"
import type { UiHarness } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { openUiHarness } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import {
  declaredFrom,
  declaredLua,
  virtualsFrom,
  virtualsLua,
} from "akasha/temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.code.ts"

const ADDON_TREE = "temper-addon"

const BUILT_UNDER = "temper/addon/build/dist"

export const MARKUP_UNDER = "temper/addon/pages"

export const MARKUP_TAIL = ".eso-interface.markup.xml"

const SAVED_UNDER = "SavedVariables"

const PER_CHUNK = 40

const UNPINNED = "no commit"

const ACCOUNT_WIDE = `
function __ui_accounts()
  local found = {}
  for _, held in pairs(_G) do
    if type(held) == "table" then
      local ok, default = pcall(rawget, held, "Default")
      if ok and type(default) == "table" then
        for key in pairs(default) do
          if type(key) == "string" and string.sub(key, 1, 1) == "@" then
            found[#found + 1] = key
          end
        end
      end
    end
  end
  table.sort(found)
  return found
end

function __ui_account_wide(saved)
  local held = saved ~= nil and saved.Default or nil
  if held == nil then return nil end
  local named = {}
  for key in pairs(held) do named[#named + 1] = key end
  table.sort(named)
  for _, key in ipairs(named) do
    local wide = held[key]["$AccountWide"]
    if wide ~= nil then return wide end
  end
  return nil
end

function __ui_play_as()
  local found = __ui_accounts()
  local named = found[1] or "@harness"
  GetDisplayName = function() return named end
  GetUnitName = function() return "Harness" end
  GetCurrentCharacterId = function() return "0" end
  GetWorldName = function() return "Harness" end
  return named
end
`

export function filesUnder(dir: string, tail: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const at = join(dir, name)
    if (statSync(at).isDirectory()) filesUnder(at, tail, found)
    else if (name.endsWith(tail)) found.push(at)
  }
  return found
}

function builtBundleAt(root: string, addon: string): string | null {
  const tree = treeIn(root, ADDON_TREE)
  if (tree === null) return null
  const at = join(tree, BUILT_UNDER, addon, `${addon}.lua`)
  return existsSync(at) ? at : null
}

function builtAtCommit(root: string): string {
  const tree = treeIn(root, ADDON_TREE)
  if (tree === null) return UNPINNED
  try {
    return readFileSync(stampIn(tree), "utf8").trim() || UNPINNED
  } catch {
    return UNPINNED
  }
}

function savedVariablesAt(name: string): string | null {
  for (const live of esoLiveDirCandidates()) {
    const at = join(live, SAVED_UNDER, `${name}.lua`)
    if (existsSync(at)) return at
  }
  return null
}

export type Staged = {
  readonly harness: UiHarness
  readonly builtAt: string
  readonly templates: number
  readonly refused: readonly string[]
}

export type StagingAsked = {
  readonly root: string
  readonly addon: string
  readonly savedVariables: readonly string[]
  readonly shows: readonly string[]
}

function documentsFor(root: string): readonly string[] {
  const esoui = esouiSourceDir()
  if (!existsSync(esoui)) {
    throw new Error(
      `the game's own interface is not checked out at ${esoui}, so no template it declares` +
        " would be here — name the checkout in `ESOUI_SRC_DIR`"
    )
  }
  const mine = join(root, MARKUP_UNDER)
  const at = [...filesUnder(esoui, ".xml"), ...filesUnder(mine, MARKUP_TAIL)]
  return at.map((one) => readFileSync(one, "utf8"))
}

export async function stageUiHarness(asked: StagingAsked): Promise<Staged> {
  const bundleAt = builtBundleAt(asked.root, asked.addon)
  if (bundleAt === null) {
    throw new Error(
      `\`${asked.addon}\` has no build under ${join(BUILT_UNDER, asked.addon)}, so there is` +
        ` nothing to bring up — \`akasha deploy\` builds it`
    )
  }
  const seeded: string[] = []
  for (const name of asked.savedVariables) {
    const at = savedVariablesAt(name)
    if (at === null) {
      throw new Error(
        `\`${name}\` has no saved variables on this machine, and this window is brought up from` +
          " what a player's own file holds"
      )
    }
    seeded.push(readFileSync(at, "utf8"))
  }
  const documents = documentsFor(asked.root)
  const virtuals = virtualsFrom(documents)
  const chunks = virtualsLua(virtuals, PER_CHUNK)
  const esoui = esouiSourceDir()
  const harness = await openUiHarness()
  try {
    const templates = await harness.templates(chunks)
    await harness.load(`return ${fontsLua(gameFonts(esoui))}`)
    const refused: string[] = []
    for (const file of gameFiles(esoui)) {
      const text = readFileSync(file.at, "utf8")
      if (file.kind === "lua") {
        const named = relative(esoui, file.at)
        try {
          await harness.load(text, named)
        } catch (thrown) {
          const why = (thrown instanceof Error ? thrown.message : String(thrown)).split("\n")[0]
          refused.push(`${named}: ${why}`)
        }
        continue
      }
      const declared = declaredFrom([text], virtuals)
      for (const chunk of declaredLua(declared, Object.keys(declared), PER_CHUNK)) {
        await harness.load(`return ${chunk}`)
      }
    }
    for (const name of asked.shows) {
      await harness.load(`return __ui_show(${JSON.stringify(name)})`)
    }
    await harness.load(ACCOUNT_WIDE)
    await harness.loadBundle(readFileSync(bundleAt, "utf8"))
    for (const source of seeded) await harness.load(source)
    await harness.load("return __ui_play_as()")
    return { harness, builtAt: builtAtCommit(asked.root), templates, refused }
  } catch (thrown) {
    await harness.close()
    throw thrown
  }
}

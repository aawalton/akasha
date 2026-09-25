import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { TEMPER_ADDON } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  stampIn,
  treeIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { slugsOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  esoLiveDirCandidates,
  esouiSourceDir,
} from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import {
  PLAYER_ANSWERS_ADDON,
  playerAnswersIn,
  playerAnswersLua,
  playerAnswersSource,
  playerScreenIn,
} from "akasha/temper/eso/return/modules/player-answers-seeding/player-answers-seeding.module.code.ts"
import { keepGameTypefaces } from "akasha/temper/eso/ui-harness/modules/game-art/game-art.module.code.ts"
import {
  gameFiles,
  manifestEntries,
} from "akasha/temper/eso/ui-harness/modules/game-manifest/game-manifest.module.code.ts"
import { namesUnstubbedLua } from "akasha/temper/eso/ui-harness/modules/game-names/game-names.module.code.ts"
import {
  fontsIn,
  fontsLua,
  gameFontStrings,
  gameFonts,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"
import type { UiHarness } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { openUiHarness } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import {
  timelinesIn,
  timelinesLua,
} from "akasha/temper/eso/ui-harness/modules/ui-timelines/ui-timelines.module.code.ts"
import {
  declaredFrom,
  declaredLua,
  virtualsFrom,
  virtualsLua,
} from "akasha/temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.code.ts"

const BUILT_UNDER = "temper/addon/build/dist"

export const MARKUP_UNDER = "temper/addon/pages"

export const MARKUP_TAIL = ".eso-interface.markup.xml"

const SAVED_UNDER = "SavedVariables"

const GAME_ADDON = "ZO_Ingame"

const PLAYER_ACTIVATED = "EVENT_PLAYER_ACTIVATED"

const ADDON_LOADED = "EVENT_ADD_ON_LOADED"

const KEYBINDINGS_LOADED = "EVENT_KEYBINDINGS_LOADED"

const FIRST_ACTIVATION = true

const ACTIVATED = "IsPlayerActivated = function() return true end"

const NOT_YET_READY = `IsPlayerActivated = function() return false end
AreSkillsInitialized = function() return false end`

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
  local answered = __ui_player_answered or {}
  local found = __ui_accounts()
  local named = found[1] or "@harness"
  if not answered.GetDisplayName then GetDisplayName = function() return named end end
  if not answered.GetUnitName then GetUnitName = function() return "Harness" end end
  if not answered.GetCurrentCharacterId then GetCurrentCharacterId = function() return "0" end end
  if not answered.GetWorldName then GetWorldName = function() return "Harness" end end
  return GetDisplayName()
end
`

const SETTLING_ROUNDS = 64

export async function settled(harness: UiHarness): Promise<void> {
  try {
    await harness.settle(SETTLING_ROUNDS)
  } catch {
    return
  }
}

export function filesUnder(dir: string, tail: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const at = join(dir, name)
    if (statSync(at).isDirectory()) filesUnder(at, tail, found)
    else if (name.endsWith(tail)) found.push(at)
  }
  return found
}

export type Built = { readonly bundle: string; readonly tree: string }

export function addonTreesIn(root: string): readonly string[] {
  const found: string[] = []
  for (const slug of slugsOfType(root, TEMPER_ADDON)) {
    const tree = treeIn(root, slug)
    if (tree !== null) found.push(tree)
  }
  return found
}

export function builtIn(trees: readonly string[], addon: string): Built | null {
  for (const tree of trees) {
    const bundle = join(tree, BUILT_UNDER, addon, `${addon}.lua`)
    if (existsSync(bundle)) return { bundle, tree }
  }
  return null
}

export function builtDirIn(trees: readonly string[], addon: string): string | null {
  for (const tree of trees) {
    const at = join(tree, BUILT_UNDER, addon)
    if (existsSync(join(at, `${addon}.txt`))) return at
  }
  return null
}

function builtAtCommit(tree: string): string {
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

const ANSWERS_PER_CHUNK = 40

function playedAnswers(): readonly string[] {
  const at = savedVariablesAt(PLAYER_ANSWERS_ADDON)
  const source = at === null ? null : playerAnswersSource(readFileSync(at, "utf8"))
  if (source === null) return []
  const held = playerAnswersIn(source)
  const chunks = held === null ? [] : playerAnswersLua(held, ANSWERS_PER_CHUNK)
  const screen = playerScreenIn(source)
  if (screen === null) return chunks
  return [
    ...chunks,
    `GuiRoot.uiWidth = ${String(screen.width)} GuiRoot.uiHeight = ${String(screen.height)}`,
  ]
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

type Declaring = {
  readonly virtuals: ReturnType<typeof virtualsFrom>
  readonly strings: Readonly<Record<string, string>>
}

async function declareDocument(
  harness: UiHarness,
  text: string,
  declaring: Declaring
): Promise<void> {
  const fonts = fontsIn([text], declaring.strings)
  if (Object.keys(fonts).length > 0) await harness.load(`return ${fontsLua(fonts)}`)
  const declared = declaredFrom([text], declaring.virtuals)
  for (const chunk of declaredLua(declared, Object.keys(declared), PER_CHUNK)) {
    await harness.load(`return ${chunk}`)
  }
}

const DEPENDS = /^## DependsOn:(.*)$/m

const AT_LEAST = />=.*$/

function dependenciesIn(manifest: string): readonly string[] {
  const listed = firstCapture(DEPENDS.exec(manifest)) ?? ""
  return listed
    .trim()
    .split(/\s+/)
    .map((one) => one.replace(AT_LEAST, ""))
    .filter((one) => one !== "")
}

async function loadAddon(
  harness: UiHarness,
  trees: readonly string[],
  built: string,
  addon: string,
  declaring: Declaring,
  loaded: string[]
): Promise<void> {
  if (loaded.includes(addon)) return
  const manifest = readFileSync(join(built, `${addon}.txt`), "utf8")
  for (const dependency of dependenciesIn(manifest)) {
    const beside = builtDirIn(trees, dependency)
    if (beside !== null) {
      await loadAddon(harness, trees, beside, dependency, declaring, loaded)
    }
  }
  if (loaded.includes(addon)) return
  for (const one of manifestEntries(manifest)) {
    const at = join(built, one.rel)
    if (!existsSync(at)) continue
    const text = readFileSync(at, "utf8")
    if (one.kind === "xml") await declareDocument(harness, text, declaring)
    else if (one.rel === `${addon}.lua`) await harness.loadBundle(text)
    else await harness.load(text, one.rel)
  }
  loaded.push(addon)
}

async function raisedOrRefused(
  harness: UiHarness,
  refused: string[],
  named: string,
  event: string,
  ...args: readonly unknown[]
): Promise<void> {
  try {
    await harness.raise(event, ...args)
  } catch (thrown) {
    const why = (thrown instanceof Error ? thrown.message : String(thrown)).split("\n")[0]
    refused.push(`${named}: ${why}`)
  }
  await settled(harness)
}

export async function stageUiHarness(asked: StagingAsked): Promise<Staged> {
  const trees = addonTreesIn(asked.root)
  const found = builtIn(trees, asked.addon)
  if (found === null) {
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
  const declaring: Declaring = { virtuals, strings: gameFontStrings(esoui) }
  await keepGameTypefaces()
  const harness = await openUiHarness()
  try {
    const templates = await harness.templates(chunks)
    await harness.load(`return ${fontsLua(gameFonts(esoui))}`)
    await harness.load(`return ${timelinesLua(timelinesIn(documents))}`)
    const refused: string[] = []
    for (const chunk of playedAnswers()) await harness.load(chunk)
    await harness.load(NOT_YET_READY)
    const files = gameFiles(esoui).map((file) => ({ ...file, text: readFileSync(file.at, "utf8") }))
    await harness.load(
      namesUnstubbedLua(files.filter((one) => one.kind === "lua").map((one) => one.text))
    )
    for (const file of files) {
      const text = file.text
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
      await declareDocument(harness, text, declaring)
    }
    await harness.load(ACCOUNT_WIDE)
    const loaded: string[] = []
    const near = [found.tree, ...trees.filter((one) => one !== found.tree)]
    await loadAddon(harness, near, dirname(found.bundle), asked.addon, declaring, loaded)
    for (const source of seeded) await harness.load(source)
    await harness.load("return __ui_play_as()")
    for (const addon of [GAME_ADDON, ...loaded]) {
      await raisedOrRefused(harness, refused, `${addon} loaded`, ADDON_LOADED, addon)
    }
    await raisedOrRefused(harness, refused, KEYBINDINGS_LOADED, KEYBINDINGS_LOADED)
    for (const name of asked.shows) {
      await harness.load(`return __ui_show(${JSON.stringify(name)})`)
    }
    await settled(harness)
    await harness.load(ACTIVATED)
    await raisedOrRefused(harness, refused, PLAYER_ACTIVATED, PLAYER_ACTIVATED, FIRST_ACTIVATION)
    return { harness, builtAt: builtAtCommit(found.tree), templates, refused }
  } catch (thrown) {
    await harness.close()
    throw thrown
  }
}

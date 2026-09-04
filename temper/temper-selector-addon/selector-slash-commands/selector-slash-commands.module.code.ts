import "@akasha/temper-addon-library-types/temper-hud-global"

import { GLOBAL_PACK_NAME } from "../selector-constants/selector-constants.module.code.ts"
import { listPacks, loadPack } from "../selector-packs/selector-packs.module.code.ts"

function tokenize(args: string): string[] {
  const tokens: string[] = []
  let current = ""
  for (let i = 0; i < args.length; i++) {
    const ch = args[i] ?? ""
    if (ch === " " || ch === "\t") {
      if (current !== "") {
        tokens.push(current)
        current = ""
      }
    } else {
      current = `${current}${ch}`
    }
  }
  if (current !== "") {
    tokens.push(current)
  }
  return tokens
}

function printHelp(): undefined {
  d("TEMPER ADDONS:")
  d("  /temperaddons load <packname>  - load a saved pack")
  d("  /temperaddons list             - list saved packs")
  d("  /temperaddons help             - show this help")
}

function printPackList(): undefined {
  const packs = listPacks()
  if (packs.length === 0) {
    d("TEMPER ADDONS: No saved packs.")
    return
  }
  d("TEMPER ADDONS: Saved packs:")
  for (const pack of packs) {
    const scope = pack.isGlobal === true ? "Global" : pack.charName
    d(`  ${pack.name} (${scope})`)
  }
}

function handleLoad(tokens: string[]): undefined {
  if (tokens.length < 2) {
    d("TEMPER ADDONS: Pack name missing.")
    return
  }
  let packName = tokens[1] ?? ""
  for (let i = 2; i < tokens.length; i++) {
    packName = `${packName} ${tokens[i] ?? ""}`
  }
  if (packName === "") {
    d("TEMPER ADDONS: Pack name missing.")
    return
  }
  loadPack(packName, GLOBAL_PACK_NAME)
}

export function registerSlashCommands(): undefined {
  SLASH_COMMANDS["/temperaddons"] = function (this: void, args: string): undefined {
    const tokens = tokenize(args)
    const verb = tokens.length > 0 ? (tokens[0] ?? "").toLowerCase() : ""
    if (verb === "load") {
      handleLoad(tokens)
    } else if (verb === "list") {
      printPackList()
    } else {
      printHelp()
    }
  }

  globalThis.TemperHud?.registerCommand({
    name: "/temperaddons",
    description: "Manage saved addon packs (load/list)",
    addon: "TemperAddons",
  })
}

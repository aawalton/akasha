import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import type { HeldRule } from "akasha/temper/items/rules/core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import type { HeldPages } from "akasha/temper/items/rules/core/modules/rule-set-writes/rule-set-writes.module.code.ts"
import type {
  ExportSettingsSeams,
  runExportSettings,
} from "akasha/temper/watcher/modules/watcher-export-settings/watcher-export-settings.module.code.ts"

export type Client = Parameters<typeof runExportSettings>[1]

export const NO_CLIENT: Client = {
  auth: {
    getUser: async () => {
      throw new Error("the session was asked although the caller named a user")
    },
  },
}

export const BEFORE = [
  "TemperItems =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["@alan"] =',
  "        {",
  '            ["$AccountWide"] =',
  "            {",
  '                ["db"] =',
  "                {",
  "                },",
  "            },",
  "        },",
  "    },",
  "}",
  "",
].join("\n")

export const AFTER = [
  "TemperItems =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["@alan"] =',
  "        {",
  '            ["$AccountWide"] =',
  "            {",
  '                ["logging"] =',
  "                {",
  '                    ["actionReports"] = "minimal",',
  '                    ["perfTracing"] = "minimal",',
  "                },",
  '                ["safety"] =',
  "                {",
  '                    ["confirmActions"] = {',
  '                        "sell",',
  "                    },",
  '                    ["openCooldownProtection"] = false,',
  "                },",
  '                ["backpack"] =',
  "                {",
  '                    ["bufferSlots"] = 5,',
  '                    ["autoStack"] = true,',
  "                },",
  '                ["currencyRates"] =',
  "                {},",
  '                ["crownReplacementCosts"] =',
  "                {},",
  '                ["db"] =',
  "                {",
  "                },",
  "            },",
  "        },",
  "    },",
  "}",
  "",
].join("\n")

export const OTHER_VARIABLE =
  'TemperListings_SavedVariables={["Default"]={["@alan"]={["$AccountWide"]={["version"]=1,},},},}'

export const ONE_LINE_BEFORE = `TemperInventory_SavedVariables={["Default"]={["@alan"]={["$AccountWide"]={["diagnostics"]={["lastBankTrace"]={["note"]="a } b {",["bags"]={[1]=1,[2]=2,},},},["sellCompiled"]={["version"]=3,},["safety"]={["confirmActions"]={[1]="sell",},["openCooldownProtection"]=true,},["db"]={["meta"]={["displayName"]="@alan",},},["version"]=1,},["Alan Two"]={["version"]=1,},},},}${OTHER_VARIABLE}`

export const SETTINGS_WITHOUT_INVENTORY = {
  logging: { actionReports: "minimal", perfTracing: "minimal" },
  safety: { confirmActions: ["sell", "nonsense"], openCooldownProtection: false },
  backpack: { bufferSlots: 5 },
}

interface Recorded {
  readonly said: string[]
  readonly written: { path: string; content: string }[]
}

export function seamsFor(
  settings: Record<string, unknown>,
  recorded: Recorded,
  rules: readonly HeldRule[] = [],
  rulesAskedFor: string[] = [],
  pages: Partial<Pick<HeldPages, "itemRows" | "buyRows">> = {}
): { seams: ExportSettingsSeams } {
  return {
    seams: {
      say: (message) => {
        recorded.said.push(message)
        return undefined
      },
      readPlayerSettings: async () => settings,
      addressOf: async (userId) => `temper-account/${userId}`,
      readPlayerRules: async (accountPage) => {
        rulesAskedFor.push(accountPage)
        return { rules, itemRows: pages.itemRows ?? [], buyRows: pages.buyRows ?? [] }
      },
      pricingTables: async () => ({ currencyRates: {}, crownReplacementCosts: {} }),
      pages: { collect: async () => [], get: async () => null },
      inventoryRows: { latestReading: async () => undefined, dataOf: async () => null },
      readCharacters: async () => [],
      writeSideFile: (path, content) => {
        recorded.written.push({ path, content })
        return "hash-of-the-side-file"
      },
    },
  }
}

export function recorder(): Recorded {
  return { said: [], written: [] }
}

export function tableAt(value: unknown, ...path: readonly string[]): Record<string, unknown> {
  let at = asRecord(value)
  for (const key of path) at = asRecord(at?.[key])
  if (!at) throw new Error(`no table at ${path.join(".")}`)
  return at
}

import { expect, test } from "bun:test"
import type { HeldRule } from "akasha/temper/temper-items-rules-core/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import {
  type ExportSettingsSeams,
  runExportSettings,
  settingsIn,
} from "./watcher-export-settings.module.code.ts"

type Client = Parameters<typeof runExportSettings>[1]

const NO_CLIENT: Client = {
  auth: {
    getUser: async () => {
      throw new Error("the session was asked although the caller named a user")
    },
  },
}

const BEFORE = [
  "TemperInventory =",
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

const AFTER = [
  "TemperInventory =",
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

const SETTINGS_WITHOUT_INVENTORY = {
  logging: { actionReports: "minimal", perfTracing: "minimal" },
  safety: { confirmActions: ["sell", "nonsense"], openCooldownProtection: false },
  backpack: { bufferSlots: 5 },
}

interface Recorded {
  readonly said: string[]
  readonly written: { path: string; content: string }[]
}

function seamsFor(
  settings: Record<string, unknown>,
  recorded: Recorded,
  rules: readonly HeldRule[] = []
): { seams: ExportSettingsSeams } {
  return {
    seams: {
      say: (message) => {
        recorded.said.push(message)
        return undefined
      },
      readPlayerSettings: async () => settings,
      readPlayerRules: async () => rules,
      pricingTables: async () => ({ currencyRates: {}, crownReplacementCosts: {} }),
      pages: { collect: async () => [], get: async () => null },
      inventoryRows: { latestSnapshot: async () => undefined, dataOf: async () => null },
      readCharacters: async () => [],
      writeSideFile: (path, content) => {
        recorded.written.push({ path, content })
        return "hash-of-the-side-file"
      },
    },
  }
}

function recorder(): Recorded {
  return { said: [], written: [] }
}

test("the blocks a settings export writes come out byte for byte as the legacy exporter wrote them", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toBe(AFTER)
  expect(result.modified).toBe(true)
})

test("an action nobody may agree to is left out of the safety block", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).not.toContain("nonsense")
})

test("an account holding no settings gets its content back unchanged and no side file", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({}, recorded)
  const result = await runExportSettings(
    BEFORE,
    NO_CLIENT,
    { userId: "alan", inventoryConfigPath: "/var/tmp/inventory.lua" },
    seams
  )
  expect(result).toEqual({ content: BEFORE, modified: false, inventoryConfigSideFileHash: null })
  expect(recorded.said).toEqual(["No settings to export."])
  expect(recorded.written).toEqual([])
})

test("the hash answered is the one from whatever wrote the side file", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(
    BEFORE,
    NO_CLIENT,
    { userId: "alan", inventoryConfigPath: "/var/tmp/inventory.lua" },
    seams
  )
  expect(result.inventoryConfigSideFileHash).toBe("hash-of-the-side-file")
  expect(recorded.written.length).toBe(1)
  expect(recorded.written[0]?.path).toBe("/var/tmp/inventory.lua")
  expect(recorded.written[0]?.content).toContain('["backpack"]')
})

test("a dry run writes no side file even where a path is given", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(
    BEFORE,
    NO_CLIENT,
    { userId: "alan", inventoryConfigPath: "/var/tmp/inventory.lua", dryRun: true },
    seams
  )
  expect(recorded.written).toEqual([])
  expect(result.inventoryConfigSideFileHash).toBe(null)
  expect(result.content).toBe(AFTER)
})

test("a dry run says every block it generated", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan", dryRun: true }, seams)
  expect(recorded.said).toContain("generated lua block logging:")
  expect(recorded.said).toContain("generated lua block crownReplacementCosts:")
})

test("automation reaches the file only where it holds a characters and a companions record", async () => {
  const recorded = recorder()
  const withAutomation = {
    ...SETTINGS_WITHOUT_INVENTORY,
    automation: { characters: {}, companions: {} },
  }
  const { seams } = seamsFor(withAutomation, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toContain('["automation"]')

  const shaped = recorder()
  const { seams: other } = seamsFor(
    { ...SETTINGS_WITHOUT_INVENTORY, automation: { characters: {} } },
    shaped
  )
  const second = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, other)
  expect(second.content).not.toContain('["automation"]')
})

test("a settings type the player never set still reaches the file at its default", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({ logging: { actionReports: "none" } }, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toContain('["safety"]')
  expect(result.content).toContain('["backpack"]')
})

async function backpackBlockFor(backpack: unknown): Promise<string> {
  const recorded = recorder()
  const { seams } = seamsFor({ backpack }, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  return result.content
}

test("a buffer slot count outside the hundred allowed falls back to the default", async () => {
  expect(await backpackBlockFor({ bufferSlots: 101 })).toContain('["bufferSlots"] = 15')
  expect(await backpackBlockFor({ bufferSlots: 2.5 })).toContain('["bufferSlots"] = 15')
  expect(await backpackBlockFor({ bufferSlots: -1 })).toContain('["bufferSlots"] = 15')
  expect(await backpackBlockFor({ bufferSlots: 0 })).toContain('["bufferSlots"] = 0')
  expect(await backpackBlockFor(null)).toContain('["bufferSlots"] = 15')
})

test("auto stack is on unless it was set to false outright", async () => {
  expect(await backpackBlockFor({})).toContain('["autoStack"] = true')
  expect(await backpackBlockFor({ autoStack: "no" })).toContain('["autoStack"] = true')
  expect(await backpackBlockFor({ autoStack: false })).toContain('["autoStack"] = false')
})

test("an automation value shaped as an array of characters reaches no block", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({ automation: { characters: [], companions: {} } }, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).not.toContain('["automation"]')
})

test("an export with neither a named user nor a signed-in account is refused by what is wrong", async () => {
  const refusing: Client = {
    auth: {
      getUser: async () => ({ error: { message: "token expired" }, data: { user: null } }),
    },
  }
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  await expect(runExportSettings(BEFORE, refusing, {}, seams)).rejects.toThrow(
    "no signed-in user to export these settings (token expired)"
  )
})

const A_RULE: HeldRule = {
  page: {
    slug: "rule-gold-stock",
    categoryId: "currency-gold",
    displayOrder: 0,
    action: "stock",
    active: true,
    updatedAt: "2026-05-04T16:04:31.132Z",
  },
}

test("the rules exported are the ones the player's rule pages carry", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded, [A_RULE])
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toContain("currency-gold")
})

test("a rule page reaches the export although the player set no inventory blob", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({}, recorded, [A_RULE])
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(recorded.said).not.toContain("No settings to export.")
  expect(result.content).toContain("currency-gold")
})

test("the rules the settings blob still holds are passed over for the rule pages", async () => {
  const recorded = recorder()
  const blobbed = {
    ...SETTINGS_WITHOUT_INVENTORY,
    inventory: {
      version: 2,
      rules: [
        {
          id: "blobbed",
          categoryId: "currency-alliance-points",
          action: "sell",
          active: true,
          displayOrder: 0,
        },
      ],
    },
  }
  const { seams } = seamsFor(blobbed, recorded, [A_RULE])
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).not.toContain("currency-alliance-points")
  expect(result.content).toContain("currency-gold")
})

const A_BODY = JSON.stringify({
  inventory: { version: 2, rules: [] },
  logging: { actionReports: "minimal" },
  nobodyAsked: true,
})

test("the settings read are the ones the file beside the player page holds", () => {
  expect(settingsIn(A_BODY, ["inventory", "logging"])).toEqual({
    inventory: { version: 2, rules: [] },
    logging: { actionReports: "minimal" },
  })
})

test("a settings type nobody asked for is left out", () => {
  expect(settingsIn(A_BODY, ["logging"])).toEqual({ logging: { actionReports: "minimal" } })
})

test("no file beside the player page is no settings", () => {
  expect(settingsIn(null, ["logging"])).toEqual({})
  expect(settingsIn("", ["logging"])).toEqual({})
})

test("a settings file that is no JSON is refused by how many bytes would not parse", () => {
  expect(() => settingsIn("{not json", ["logging"])).toThrow("9 byte(s) that are not valid JSON")
})

test("a settings file holding something other than a record is no settings", () => {
  expect(settingsIn("[1,2,3]", ["logging"])).toEqual({})
  expect(settingsIn('"json"', ["logging"])).toEqual({})
})

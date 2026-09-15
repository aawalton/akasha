import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  pickInventoryDiagnostic,
  readInventoryDiagnostic,
} from "akasha/temper/command/modules/inventory-diagnostics-reading/inventory-diagnostics-reading.module.code.ts"
import { z } from "zod"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const WIDE = z
  .object({
    diagnostics: z
      .object({ lastThing: z.object({ mark: z.number() }).strict().optional() })
      .passthrough()
      .optional(),
  })
  .passthrough()

const pick = (wide: z.infer<typeof WIDE>) => wide.diagnostics?.lastThing

async function fileHolding(said: string): Promise<string> {
  const path = join(SCRATCH.rootFor("temper-inventory-diagnostics-"), "TemperInventory.lua")
  await Bun.write(path, said)
  return path
}

function savedVariables(accounts: string): string {
  return `TemperInventory_SavedVariables =\n{\n  ["Default"] =\n  {\n${accounts}\n  },\n}\n`
}

const CARRYING = savedVariables(
  `    ["@one"] =
    {
      ["$AccountWide"] = { ["diagnostics"] = { ["lastThing"] = { ["mark"] = 7 } } },
    },`
)

test("the diagnostic is found under an account this side never named", async () => {
  const found = await readInventoryDiagnostic(await fileHolding(CARRYING), WIDE, pick, "no thing")
  expect(found.mark).toBe(7)
})

test("an account carrying nothing is walked past to one that does", async () => {
  const path = await fileHolding(
    savedVariables(
      `    ["@empty"] =
    {
      ["$AccountWide"] = { ["diagnostics"] = { } },
    },
    ["@two"] =
    {
      ["$AccountWide"] = { ["diagnostics"] = { ["lastThing"] = { ["mark"] = 9 } } },
    },`
    )
  )
  expect((await readInventoryDiagnostic(path, WIDE, pick, "no thing")).mark).toBe(9)
})

test("a file that is not there is refused rather than read as empty", async () => {
  const gone = join(SCRATCH.rootFor("temper-inventory-diagnostics-"), "TemperInventory.lua")
  await expect(readInventoryDiagnostic(gone, WIDE, pick, "no thing")).rejects.toThrow(
    /file not found/
  )
})

test("a refusal says what was looked for and what would make it exist", async () => {
  const path = await fileHolding(
    savedVariables(`    ["@bare"] =\n    {\n      ["$AccountWide"] = { },\n    },`)
  )
  await expect(
    readInventoryDiagnostic(path, WIDE, pick, "no lastThing (have you run the keybind?)")
  ).rejects.toThrow(/no lastThing \(have you run the keybind\?\) under any @<account>/)
})

test("a diagnostic no account carries is picked as nothing rather than refused", async () => {
  const path = await fileHolding(
    savedVariables(`    ["@bare"] =\n    {\n      ["$AccountWide"] = { },\n    },`)
  )
  expect(await pickInventoryDiagnostic(path, WIDE, pick)).toBeUndefined()
})

test("a picked diagnostic is the one an account carries", async () => {
  expect(await pickInventoryDiagnostic(await fileHolding(CARRYING), WIDE, pick)).toEqual({
    mark: 7,
  })
})

test("a file with no account under Default is refused", async () => {
  const path = await fileHolding(savedVariables(`    ["notAnAccount"] = { },`))
  await expect(readInventoryDiagnostic(path, WIDE, pick, "no thing")).rejects.toThrow(
    /no @<account> entry under Default/
  )
})

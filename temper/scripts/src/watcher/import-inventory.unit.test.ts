import { afterEach, describe, expect, test } from "bun:test"
import { runImportInventory } from "./import-inventory"
import type { SupabaseServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"

// WHAT THIS PINS IS THAT A READ THAT NEVER REACHED THE STORE DOES NOT BUY A NEW IDENTITY. This
// import mints a uuid for each page it takes to be absent, and it takes a page to be absent off a
// value a refused read and a genuine absence both produce. Minted on the refusal, the uuid is a
// second identity for a page that already has one, and the only thing holding it back is that the
// write carrying it is refused as well.

const USER = "019f0000-0000-7000-b001-000000000001"

const NOBODY = {} as unknown as SupabaseServiceRoleClient

const SAVED_VARIABLES = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@TestAccount",
                        ["worldName"] = "NA Megaserver",
                        ["lastFullScan"] = 1765400000,
                    },
                    ["locations"] = {},
                    ["currencies"] =
                    {
                        ["bank"] =
                        {
                            ["gold"] = 1000000,
                        },
                    },
                },
            },
        },
    },
}`

function reply(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

type Served = { written: readonly string[] }

let stop: (() => void) | null = null

/** Every read and every write is refused, which is the workstation this watcher actually runs on. */
function serveNothing(): Served {
  const served: Served = { written: [] }
  const real = globalThis.fetch
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    const posted = (init?.method ?? "GET").toUpperCase() === "POST"
    if (posted && !path.startsWith("/q")) served.written = [...served.written, path]
    return reply({ error: "the page query service is unreachable" }, 503)
  }
  stop = () => {
    globalThis.fetch = real
  }
  return served
}

afterEach(() => {
  stop?.()
  stop = null
})

describe("the inventory import mints an id only where the store answered that no page stands", () => {
  test("a read nothing answered refuses the import rather than writing a fresh id", async () => {
    const served = serveNothing()
    const going = runImportInventory(SAVED_VARIABLES, NOBODY, { userId: USER })
    await expect(going).rejects.toThrow(/went unread/)
    expect(served.written).toEqual([])
  })
})

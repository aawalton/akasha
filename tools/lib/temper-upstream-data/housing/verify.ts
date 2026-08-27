import { join } from "node:path"
import { makeLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { addonsDir } from "@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve"
import { codeModule } from "../../code-import.ts"
import { PACKAGE_OF, PortMismatch } from "../libraries.ts"

const UPSTREAM_PATH = join(
  addonsDir(),
  "PortToFriendsHouse",
  "PortToFriendsHouseLibraryData.lua"
)

const BARREL_REL = "src/ptf/data/generated/library-data.generated.ts"

const FILTER_IDS: Record<string, number> = {
  FILTER_ID_NONE: 1,
  FILTER_ID_HIGHLIGHT: 2,
  FILTER_ID_LABYRINTH: 3,
  FILTER_ID_JUMPNRUN: 4,
  FILTER_ID_CRAFTING: 5,
  FILTER_ID_GUILD: 6,
  FILTER_ID_ROLEPLAY: 7,
  FILTER_ID_RAID: 8,
  FILTER_ID_HIDE_SEEK: 9,
  FILTER_ID_ERP: 10,
}

const FILTER_CONST_LUA = Object.entries(FILTER_IDS)
  .map(([k, v]) => `    ${k} = ${v},`)
  .join("\n")

const PRELUDE = `
PortToFriend = {
  libData = {},
  constants = {
${FILTER_CONST_LUA}
  },
}
GetWorldName = function() return "EU Megaserver" end
return "ok"
`

interface LibraryEntry {
  readonly name: string
  readonly houseId: number
  readonly description: string
  readonly category: readonly number[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function parseEntries(raw: unknown, label: string): LibraryEntry[] {
  if (!Array.isArray(raw)) {
    throw new Error(`${label} did not marshal as an array (got ${typeof raw})`)
  }
  return raw.map((item, i) => {
    if (!isRecord(item)) throw new Error(`${label}[${i}] is not a table`)
    const { name, houseId, description, category } = item
    if (typeof name !== "string") throw new Error(`${label}[${i}].name`)
    if (typeof houseId !== "number") throw new Error(`${label}[${i}].houseId`)
    if (typeof description !== "string") throw new Error(`${label}[${i}].description`)
    if (!Array.isArray(category)) throw new Error(`${label}[${i}].category`)
    const cats = category.map((c, j) => {
      if (typeof c !== "number") throw new Error(`${label}[${i}].category[${j}]`)
      return c
    })
    return { name, houseId, description, category: cats }
  })
}

function canon(e: LibraryEntry): string {
  return JSON.stringify({
    name: e.name,
    houseId: e.houseId,
    description: e.description,
    category: [...e.category],
  })
}

function compare(label: string, upstream: LibraryEntry[], generated: LibraryEntry[]): number {
  if (upstream.length !== generated.length) {
    console.error(
      `FAIL ${label}: count mismatch upstream=${upstream.length} generated=${generated.length}`
    )
    return 1
  }
  let failures = 0
  for (let i = 0; i < upstream.length; i++) {
    const upstreamEntry = upstream[i]
    const generatedEntry = generated[i]
    if (upstreamEntry === undefined || generatedEntry === undefined) {
      continue
    }
    const u = canon(upstreamEntry)
    const g = canon(generatedEntry)
    if (u !== g) {
      failures++
      if (failures <= 5) {
        console.error(`FAIL ${label}[${i}]:`)
        console.error(`  upstream:  ${u}`)
        console.error(`  generated: ${g}`)
      }
    }
  }
  if (failures === 0) {
    console.log(`OK   ${label} (${upstream.length} entries)`)
  }
  return failures
}

export async function verify(codeRoot: string): Promise<void> {
  const vm = await makeLuaVm({ stubs: PRELUDE })
  let failures = 0
  try {
    const setup = await vm.run(`
      local ok, err = pcall(dofile, ${JSON.stringify(UPSTREAM_PATH)})
      if not ok then error("dofile failed: " .. tostring(err)) end
      PortToFriend.libData.CreateEuDataList()
      PortToFriend.libData.CreateNaDataList()
      return "ok"
    `)
    if (setup !== "ok") throw new Error(`upstream execution returned ${String(setup)}`)

    const euUpstream = parseEntries(await vm.run("return PortToFriend.libData.euData"), "euData")
    const naUpstream = parseEntries(await vm.run("return PortToFriend.libData.naData"), "naData")

    const mod = await codeModule<unknown>(`${PACKAGE_OF.housing}/${BARREL_REL}`, codeRoot)
    if (!isRecord(mod)) throw new Error("generated module did not import as an object")
    const euGen = parseEntries(mod.euLibraryData, "euLibraryData")
    const naGen = parseEntries(mod.naLibraryData, "naLibraryData")

    failures += compare("euData", euUpstream, euGen)
    failures += compare("naData", naUpstream, naGen)
  } finally {
    await vm.close()
  }
  if (failures > 0) {
    throw new PortMismatch(`${failures} mismatch(es) found`)
  }
  console.log("all entries leaf-exact")
}

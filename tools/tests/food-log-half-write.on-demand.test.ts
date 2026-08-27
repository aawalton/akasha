import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { codeRoot } from "../lib/code-root.ts"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const REFUSED_ENDPOINT = "http://127.0.0.1:1"

const PAGE_STORE_REFUSAL = "no page store on this shelf"

const SEAWEEDFS_UNSET: Record<string, undefined> = {
  SEAWEEDFS_S3_ENDPOINT: undefined,
  SEAWEEDFS_BUCKET: undefined,
  SEAWEEDFS_ACCESS_KEY: undefined,
  SEAWEEDFS_SECRET_KEY: undefined,
}

const SEAWEEDFS_UNREACHABLE: Record<string, string> = {
  SEAWEEDFS_S3_ENDPOINT: REFUSED_ENDPOINT,
  SEAWEEDFS_BUCKET: "fixture",
  SEAWEEDFS_ACCESS_KEY: "fixture",
  SEAWEEDFS_SECRET_KEY: "fixture",
}

const home = mkdtempSync("/var/tmp/food-log-half-write-")
afterAll(() => {
  rmSync(home, { recursive: true, force: true })
})

const photo = `${home}/photo.jpg`
writeFileSync(photo, "fixture bytes")

interface Fixture {
  readonly root: string
  readonly ledger: string
}

function writePackage(dir: string, name: string, exports: Record<string, string>): void {
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    `${dir}/package.json`,
    JSON.stringify({ name, version: "0.0.0", type: "module", exports })
  )
}

let builtCount = 0

function buildFixture(pageStoreWrites: boolean): Fixture {
  builtCount += 1
  const shelf = `${home}/${builtCount}`
  mkdirSync(shelf, { recursive: true })
  symlinkSync(`${codeRoot()}/node_modules`, `${shelf}/node_modules`)

  const root = `${shelf}/code`
  const ledger = `${shelf}/ledger.tsv`
  const where = JSON.stringify(ledger)
  writeFileSync(ledger, "")

  const scope = `${root}/node_modules/@shared`

  writePackage(`${scope}/pages-access`, "@shared/pages-access", { ".": "./index.ts" })
  writeFileSync(
    `${scope}/pages-access/index.ts`,
    'import { appendFileSync } from "node:fs"\n' +
      "export async function getPages() { return { rows: [] } }\n" +
      "export async function patchPageById(_sb, args) {\n" +
      (pageStoreWrites
        ? `  appendFileSync(${where}, \`patch\\t\${args.pageTypeSlug}\\t\${JSON.stringify(args.set)}\\n\`)\n` +
          "  return null\n"
        : `  throw new Error(${JSON.stringify(PAGE_STORE_REFUSAL)})\n`) +
      "}\n"
  )

  writePackage(`${scope}/pages-query`, "@shared/pages-query", {
    ".": "./index.ts",
    "./ask": "./ask.ts",
  })
  writeFileSync(
    `${scope}/pages-query/index.ts`,
    "export async function askNamed() { return { ok: true, answer: { rows: [] } } }\n"
  )
  writeFileSync(
    `${scope}/pages-query/ask.ts`,
    "export async function askComposed() {\n" +
      '  return { ok: true, answer: { rows: [{ values: { id: "f1", "plant-grams": 40 } }] } }\n' +
      "}\n"
  )

  const sync = `${root}/packages/shared/utils/sync/src`
  mkdirSync(sync, { recursive: true })
  writeFileSync(
    `${sync}/pages-access-client.ts`,
    "export function getPageAccessClient() { return { from: () => null } }\n"
  )

  return { root, ledger }
}

interface Run {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
  readonly ledger: readonly string[]
}

async function logFood(
  fixture: Fixture,
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<Run> {
  const proc = Bun.spawn(
    ["bun", CLI_PATH, "food", "log", "--title", "Fixture broccoli", "--plant-grams", "40", ...args],
    {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, CODE_ROOT: fixture.root, ...SEAWEEDFS_UNSET, ...env },
    }
  )
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  const ledger = readFileSync(fixture.ledger, "utf8")
    .split("\n")
    .filter((line) => line !== "")
  return { stdout, stderr, exitCode: proc.exitCode ?? -1, ledger }
}

describe("ops food log — a step after the entry never leaves it behind a non-zero exit", () => {
  it("a roll-up its page store refuses still exits 0, having written one entry", async () => {
    const fixture = buildFixture(false)
    const run = await logFood(fixture, ["--json"])

    expect(run.exitCode).toBe(0)
    expect(run.ledger.filter((line) => line.startsWith("create"))).toHaveLength(1)
    expect(JSON.parse(run.stdout)).toMatchObject({
      id: "fixture-food-id",
      notLanded: ["nutritionPoints"],
    })
  })

  it("that run says on stderr what did not land and warns off a re-run", async () => {
    const fixture = buildFixture(false)
    const run = await logFood(fixture, ["--json"])

    expect(run.stderr).toContain("nutritionPoints did not land")
    expect(run.stderr).toContain(PAGE_STORE_REFUSAL)
    expect(run.stderr).toContain("would write a second one")
    expect(run.stderr).toContain("ops tracking nutrition-sync --date")
  })

  it("a roll-up that lands reads apart from one that did not", async () => {
    const fixture = buildFixture(true)
    const run = await logFood(fixture, ["--json"])

    expect(run.exitCode).toBe(0)
    expect(JSON.parse(run.stdout)).toMatchObject({ notLanded: [] })
    expect(run.ledger).toContain('patch\tdaily-tracking\t{"nutritionPoints":40}')
    expect(run.stderr).not.toContain("did not land")
  })

  it("a cover that cannot publish still exits 0, and the TSV names it", async () => {
    const fixture = buildFixture(true)
    const run = await logFood(fixture, ["--image", photo], SEAWEEDFS_UNREACHABLE)

    expect(run.exitCode).toBe(0)
    expect(run.ledger.filter((line) => line.startsWith("create"))).toHaveLength(1)
    expect(run.stdout).toContain("notLanded\tcover")
    expect(run.stderr).toContain("cover did not land")
  })

  it("both steps missing names both, one entry, exit 0", async () => {
    const fixture = buildFixture(false)
    const run = await logFood(fixture, ["--image", photo], SEAWEEDFS_UNREACHABLE)

    expect(run.exitCode).toBe(0)
    expect(run.ledger.filter((line) => line.startsWith("create"))).toHaveLength(1)
    expect(run.stdout).toContain("notLanded\tcover,nutritionPoints")
  })

  it("nothing missing reads `none` in the TSV", async () => {
    const fixture = buildFixture(true)
    const run = await logFood(fixture, [])

    expect(run.exitCode).toBe(0)
    expect(run.stdout).toContain("notLanded\tnone")
  })
})

describe("ops food log — every non-zero exit leaves nothing written", () => {
  it("an unreadable --time exits 1 with no entry", async () => {
    const fixture = buildFixture(false)
    const run = await logFood(fixture, ["--time", "99:99"])

    expect(run.exitCode).toBe(1)
    expect(run.ledger).toEqual([])
  })

  it("--image with no object store configured exits 3 with no entry", async () => {
    const fixture = buildFixture(true)
    const run = await logFood(fixture, ["--image", photo])

    expect(run.exitCode).toBe(3)
    expect(run.ledger).toEqual([])
  })
})

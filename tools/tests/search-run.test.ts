import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { type Roots } from "../../page/page.ts"
import { admits, BYTE_CEILING, fresh, LINE_CEILING, parse, pointed, reach } from "../../agent/search-run.ts"

const HELD = "held-directory"

let root = ""
let roots: Roots

beforeAll(() => {
  root = mkdtempSync("/var/tmp/search-run-")
  mkdirSync(`${root}/akasha`, { recursive: true })
  mkdirSync(`${root}/${HELD}`, { recursive: true })
  writeFileSync(`${root}/${HELD}/one.txt`, "needle\n", "utf8")
  roots = { akasha: `${root}/akasha`, "code-editor": `${root}/code-editor` }
})

afterAll(() => {
  if (root !== "") rmSync(root, { recursive: true, force: true })
})

describe("what reaches ripgrep", () => {
  test("every argument that is not this command's own is kept, in the order it was written", () => {
    const parsed = parse(["-g", "*.ts", "--repo", "akasha", "-i", "--", "-not-a-flag"])
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.rest).toEqual(["-g", "*.ts", "-i", "--", "-not-a-flag"])
  })

  test("a repository named after ripgrep's own end-of-flags marker is ripgrep's, not this command's", () => {
    const parsed = parse(["needle", "--", "--repo", "akasha"])
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.repos).toEqual([])
    expect(parsed.rest).toEqual(["needle", "--"])
    expect(parsed.paths).toEqual(["--repo", "akasha"])
  })

  test("a repository this system does not hold is refused rather than handed on to ripgrep", () => {
    expect(parse(["needle", "--repo", "elsewhere"]).ok).toBe(false)
    expect(parse(["needle", "--repo"]).ok).toBe(false)
  })
})

describe("which places a search covers", () => {
  test("naming none covers every repository that is on disk, and none that is not", () => {
    const covered = reach([], roots)
    expect([...covered.searching.map((one) => one.name)].sort()).toEqual(["akasha"])
    expect([...covered.absent].sort()).toEqual(["code-editor"])
  })

  test("naming one covers that one alone", () => {
    expect(reach(["akasha"], roots).searching.map((one) => one.name)).toEqual(["akasha"])
  })

  test("naming the same one twice covers it once", () => {
    const parsed = parse(["needle", "--repo", "akasha", "--repo", "akasha"])
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(reach(parsed.repos, roots).searching.map((one) => one.name)).toEqual(["akasha"])
  })

  test("a repository is searched from its own root", () => {
    const [only] = reach(["akasha"], roots).searching
    expect(only?.from).toBe(`${root}/akasha`)
    expect(only?.at).toBe(`${root}/akasha`)
  })
})

describe("where a path points a search", () => {
  test("the first bare argument is the pattern and every other one is a path", () => {
    const parsed = parse(["needle", "pages", "tools"])
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.paths).toEqual(["pages", "tools"])
    expect(parsed.rest).toEqual(["needle"])
  })

  test("a value belonging to a flag is not a path, written after the flag or joined to it", () => {
    const parsed = parse(["-g", "pages", "--type", "ts", "--glob=tools", "-tmd", "-A", "2", "needle"])
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.paths).toEqual([])
    expect(parsed.rest).toEqual(["-g", "pages", "--type", "ts", "--glob=tools", "-tmd", "-A", "2", "needle"])
  })

  test("a flag that only looks like one taking a value does not swallow the argument after it", () => {
    const parsed = parse(["--max-columns-preview", "needle", "pages"])
    expect(parsed.ok).toBe(true)
    if (!parsed.ok) return
    expect(parsed.paths).toEqual(["pages"])
    expect(parsed.rest).toEqual(["--max-columns-preview", "needle"])
  })

  test("under -e or -f no argument is the pattern, so every bare one is a path", () => {
    const flagged = parse(["-e", "needle", "pages"])
    expect(flagged.ok).toBe(true)
    if (!flagged.ok) return
    expect(flagged.paths).toEqual(["pages"])
    expect(flagged.rest).toEqual(["-e", "needle"])
    const joined = parse(["--regexp=needle", "pages"])
    expect(joined.ok).toBe(true)
    if (!joined.ok) return
    expect(joined.paths).toEqual(["pages"])
  })

  test("naming a repository and a path at once is refused, because each says where to search", () => {
    expect(parse(["needle", "--repo", "akasha", "pages"]).ok).toBe(false)
  })

  test("a directory is searched from itself and a file from the directory holding it", () => {
    const found = pointed([`${root}/${HELD}`, `${root}/${HELD}/one.txt`])
    const [directory, file] = found.searching
    expect(found.absent).toEqual([])
    expect(directory?.from).toBe(directory?.at ?? "")
    expect(directory?.at.endsWith(`/${HELD}`)).toBe(true)
    expect(file?.at.endsWith(`/${HELD}/one.txt`)).toBe(true)
    expect(file?.from).toBe(file?.at.slice(0, file.at.lastIndexOf("/")) ?? "")
  })

  test("a path that stands nowhere is named absent as it was written, not searched", () => {
    const found = pointed([`${root}/nowhere`])
    expect(found.searching).toEqual([])
    expect(found.absent).toEqual([`${root}/nowhere`])
  })
})

describe("the bound on what a search prints", () => {
  test("it stops on the line count, and admits nothing after it has stopped", () => {
    const budget = fresh()
    for (let at = 0; at < LINE_CEILING; at += 1) expect(admits(budget, "x")).toBe(true)
    expect(admits(budget, "x")).toBe(false)
    expect(admits(budget, "x")).toBe(false)
    expect(budget.lines).toBe(LINE_CEILING)
  })

  test("it stops on the byte count while the line count still has room", () => {
    const budget = fresh()
    const line = "x".repeat(999)
    for (let at = 0; at < BYTE_CEILING / 1000; at += 1) expect(admits(budget, line)).toBe(true)
    expect(admits(budget, line)).toBe(false)
    expect(budget.lines).toBeLessThan(LINE_CEILING)
    expect(budget.bytes).toBe(BYTE_CEILING)
  })

  test("a line is weighed by its bytes rather than its characters", () => {
    const budget = fresh()
    expect(admits(budget, "é")).toBe(true)
    expect(budget.bytes).toBe(3)
  })
})

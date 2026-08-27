import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { afterAll, describe, expect, test } from "bun:test"
import type { Roots } from "../../page/page"
import { seatIdentityForName, seatIdentityIn } from "../lib/seat-identity.ts"

const AGENT = "01a0004d-0dd4-7a23-94c1-fea622cd277a"

const OTHER = "01a0004d-0dd4-7a23-94c1-fea622cd2999"

function page(agent: string, extra: readonly string[] = []): string {
  return ["---", "page-type-slug: seat", `id: ${agent}`, ...extra, "---", ""].join("\n")
}

function git(root: string, args: readonly string[]): void {
  const proc = Bun.spawnSync(["git", ...args], { cwd: root, stdout: "ignore", stderr: "ignore" })
  if ((proc.exitCode ?? 1) !== 0) throw new Error(`git ${args.join(" ")} failed in ${root}`)
}

const roots: Roots[] = []

function memoryRepo(): Roots {
  const memory = mkdtempSync(`${tmpdir()}/seat-identity-`)
  mkdirSync(`${memory}/seats`, { recursive: true })
  git(memory, ["init", "-q"])
  git(memory, ["config", "user.email", "seat@example.invalid"])
  git(memory, ["config", "user.name", "Seat"])
  const built: Roots = {
    instructions: memory,
    code: memory,
    memory,
    books: memory,
    stories: memory,
    "code-editor": memory,
  }
  roots.push(built)
  return built
}

function commitPage(built: Roots, name: string, body: string): void {
  writeFileSync(`${built.memory}/seats/${name}.md`, body)
  git(built.memory, ["add", "-A"])
  git(built.memory, ["commit", "-q", "-m", `seat ${name}`])
}

afterAll(() => {
  for (const built of roots) rmSync(built.memory, { recursive: true, force: true })
})

describe("what a seat's page says its identity is", () => {
  test("the id comes off the page, and is the whole of what identifies a seat", () => {
    expect(seatIdentityIn({ id: AGENT })).toEqual({ id: AGENT })
  })

  test("a page carrying no id identifies nothing, rather than a seat with an empty name", () => {
    expect(seatIdentityIn({ title: "vera" })).toBeNull()
  })

  test("an id that is not text identifies nothing rather than being coerced into a name", () => {
    expect(seatIdentityIn({ id: 19425 })).toBeNull()
    expect(seatIdentityIn({ id: "" })).toBeNull()
  })
})

describe("a seat is found by name whether it is standing or stopped", () => {
  test("a standing page answers", () => {
    const built = memoryRepo()
    writeFileSync(`${built.memory}/seats/vera.md`, page(AGENT))
    expect(seatIdentityForName("vera", built)).toEqual({ id: AGENT })
  })

  test("a seat that has stopped is answered from the last page it held", () => {
    const built = memoryRepo()
    commitPage(built, "vera", page(AGENT))
    rmSync(`${built.memory}/seats/vera.md`)
    git(built.memory, ["commit", "-qam", "vera stopped"])
    expect(seatIdentityForName("vera", built)).toEqual({ id: AGENT })
  })

  test("the page standing now is preferred to the one history holds", () => {
    const built = memoryRepo()
    commitPage(built, "vera", page(OTHER))
    writeFileSync(`${built.memory}/seats/vera.md`, page(AGENT))
    expect(seatIdentityForName("vera", built)).toEqual({ id: AGENT })
  })

  test("a name that never held a page answers nothing rather than guessing", () => {
    const built = memoryRepo()
    expect(seatIdentityForName("vera", built)).toBeNull()
  })

  test("one seat's page does not answer for another seat's name", () => {
    const built = memoryRepo()
    commitPage(built, "vera", page(AGENT))
    expect(seatIdentityForName("thea", built)).toBeNull()
  })
})

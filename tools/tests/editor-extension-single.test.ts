import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import {
  commandIds,
  editorExtensionSingle,
  registryPaths,
} from "../audits/editor-extension-single.ts"
import type { CheckOutcome, RepoView } from "../lib/check.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { installRefusals } from "./fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const ROOT = resolve(import.meta.dir, "..", "..")

const ROOTS: string[] = []
const PRIOR_HOME = process.env.HOME
const PRIOR_EDITOR = process.env.CODE_EDITOR_ROOT
afterAll(() => {
  for (const root of ROOTS) rmSync(root, { recursive: true, force: true })
  if (PRIOR_HOME === undefined) delete process.env.HOME
  else process.env.HOME = PRIOR_HOME
  if (PRIOR_EDITOR === undefined) delete process.env.CODE_EDITOR_ROOT
  else process.env.CODE_EDITOR_ROOT = PRIOR_EDITOR
})

function scratch(prefix: string): string {
  const root = mkdtempSync(`${tmpdir()}/${prefix}-`)
  ROOTS.push(root)
  return root
}

function write(root: string, relPath: string, body: string): void {
  const at = relPath.split("/").slice(0, -1).join("/")
  if (at !== "") mkdirSync(`${root}/${at}`, { recursive: true })
  writeFileSync(`${root}/${relPath}`, body)
}

function manifest(...commands: readonly string[]): string {
  return JSON.stringify({ contributes: { commands: commands.map((command) => ({ command })) } })
}

function registry(id: string, fsPath: string): string {
  return JSON.stringify([{ identifier: { id }, location: { fsPath } }])
}

const SYNC = "agentTerminalName.syncNow"

interface World {
  readonly home: string
  readonly editor: string
}

function world(): World {
  const home = scratch("editor-single-home")
  const editor = scratch("editor-single-editor")
  write(editor, "product.json", JSON.stringify({ dataFolderName: ".openvscode-server" }))
  write(editor, "extensions/ops/package.json", manifest(SYNC, "opsStatusBar.refreshNow"))
  process.env.HOME = home
  process.env.CODE_EDITOR_ROOT = editor
  return { home, editor }
}

function ran(): CheckOutcome {
  const root = scratch("editor-single-instructions")
  installRefusals(root)
  const repo: RepoView = {
    roots: rootsNamed({ akasha: root }),
    name: "akasha",
    documents: [],
    read: (relPath) => require("node:fs").readFileSync(`${root}/${relPath}`, "utf8") as string,
    exists: (absolute) => require("node:fs").existsSync(absolute) as boolean,
  }
  return editorExtensionSingle(repo)
}

describe("a second extension registered with the same command ids", () => {
  test("is refused, and the refusal names the entry, its folder and the registry holding it", () => {
    const { home } = world()
    const other = scratch("editor-single-other")
    write(other, "package.json", manifest(SYNC))
    write(
      home,
      ".openvscode-server-dev/extensions/extensions.json",
      registry("alanwalton.ops", other)
    )
    const outcome = ran()
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      refusalText(
        "editor-extension-shadowed",
        {
          id: "alanwalton.ops",
          path: other,
          registry: `${home}/.openvscode-server-dev/extensions/extensions.json`,
          commands: SYNC,
        },
        ROOT
      )
    )
  })

  test("derives the registry from the product, so the dev folder is reached and not only the plain one", () => {
    const { home } = world()
    const other = scratch("editor-single-other")
    write(other, "package.json", manifest(SYNC))
    write(home, ".openvscode-server/extensions/extensions.json", "[]")
    write(
      home,
      ".openvscode-server-dev/extensions/extensions.json",
      registry("alanwalton.ops", other)
    )
    expect(ran().verdict).toBe("fail")
  })

  test("registered with no overlapping command, it passes over the registries it read", () => {
    const { home } = world()
    const other = scratch("editor-single-other")
    write(other, "package.json", manifest("anthropic.claude-code.focus"))
    write(
      home,
      ".openvscode-server-dev/extensions/extensions.json",
      registry("anthropic.claude-code", other)
    )
    const outcome = ran()
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(1)
  })

  test("registered but no longer on disk, it loads nothing and so shadows nothing", () => {
    const { home } = world()
    write(
      home,
      ".openvscode-server-dev/extensions/extensions.json",
      registry("alanwalton.ops", "/nonexistent/gone")
    )
    expect(ran().verdict).toBe("pass")
  })
})

describe("the silences that are not a pass", () => {
  test("an editor checkout with no built-in is not-applicable rather than clean", () => {
    const home = scratch("editor-single-home")
    process.env.HOME = home
    process.env.CODE_EDITOR_ROOT = scratch("editor-single-editor")
    expect(ran().verdict).toBe("not-applicable")
  })

  test("a checkout whose product.json cannot be read is not-applicable rather than clean", () => {
    const home = scratch("editor-single-home")
    const editor = scratch("editor-single-editor")
    write(editor, "extensions/ops/package.json", manifest(SYNC))
    process.env.HOME = home
    process.env.CODE_EDITOR_ROOT = editor
    expect(ran().verdict).toBe("not-applicable")
  })

  test("a product whose derived registries are all absent is not-applicable rather than clean", () => {
    world()
    expect(ran().verdict).toBe("not-applicable")
  })
})

describe("the two readers it is built on", () => {
  test("registryPaths derives both folders, with and without the dev suffix, deduped", () => {
    expect(registryPaths({ dataFolderName: ".x", serverDataFolderName: ".x" }, "/h")).toEqual([
      "/h/.x/extensions/extensions.json",
      "/h/.x-dev/extensions/extensions.json",
    ])
  })

  test("commandIds reads the ids a manifest contributes and nothing else", () => {
    expect(commandIds(JSON.parse(manifest("a", "b")))).toEqual(["a", "b"])
    expect(commandIds({ contributes: {} })).toEqual([])
  })
})

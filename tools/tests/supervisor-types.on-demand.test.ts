
import { describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { hold } from "../lib/digest-harness.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { type Declaration, declarations, STANDING, surface } from "./supervisor-types-vectors.ts"

const PORTED = "tools/lib/supervisor-types.ts"

function instrument(): { readonly tsc: string; readonly typeRoot: string } {
  const installed = `${process.env.HOME ?? "/nonexistent"}/.bun/bin/tsc`
  const found = existsSync(installed) ? installed : Bun.which("tsc")
  const real = found === null || !existsSync(found) ? null : realpathSync(found)
  const segments = real === null ? [] : real.split("/")
  const at = segments.lastIndexOf("node_modules")
  const typeRoot = at === -1 ? null : `${segments.slice(0, at + 1).join("/")}/@types`
  if (real === null || typeRoot === null || !existsSync(`${typeRoot}/bun`)) {
    throw new Error("no `tsc` with `@types/bun` beside it — run `bun install -g typescript @types/bun`")
  }
  return { tsc: real, typeRoot }
}

function emitted(): readonly Declaration[] {
  const { tsc, typeRoot } = instrument()
  const root = resolveRoots().instructions
  const dir = realpathSync(mkdtempSync("/var/tmp/supervisor-types-surface-"))
  try {
    writeFileSync(
      `${dir}/tsconfig.json`,
      JSON.stringify({
        compilerOptions: {
          strict: true,
          rootDir: root,
          declaration: true,
          emitDeclarationOnly: true,
          declarationDir: `${dir}/out`,
          module: "Preserve",
          allowImportingTsExtensions: true,
          types: ["bun"],
          typeRoots: [typeRoot],
          skipLibCheck: true,
        },
        files: [`${root}/${PORTED}`],
      })
    )
    const run = Bun.spawnSync({
      cmd: [process.execPath, tsc, "--pretty", "false", "-p", "tsconfig.json"],
      cwd: dir,
      stdout: "pipe",
      stderr: "pipe",
    })
    const said = `${run.stdout.toString()}${run.stderr.toString()}`
    if (run.exitCode !== 0) throw new Error(`\`tsc\` refused to emit for ${PORTED}: ${said}`)
    const path = `${dir}/out/${PORTED.replace(/\.ts$/, ".d.ts")}`
    if (!existsSync(path)) throw new Error(`\`tsc\` exited 0 but emitted no declarations for ${PORTED}: ${said}`)
    return declarations(surface(readFileSync(path, "utf8")))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe("the ported supervisor types declare what the code repository's compiler emitted", () => {
  const ported = emitted()

  it("carries the same declarations, in the same order", () => {
    const standing = STANDING.map((block) => block.name)
    const verdict = hold("declarations", standing, ported.map((block) => block.name))
    expect(ported.map((block) => block.name)).toEqual(standing)
    expect(verdict.ported).toBe(verdict.standing)
    expect(verdict.matches).toBe(true)
  })

  for (const [at, block] of STANDING.entries()) {
    it(block.name, () => {
      const answered = ported[at]?.lines
      expect(answered).toEqual([...block.lines])
      const verdict = hold(block.name, block.lines, answered)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})

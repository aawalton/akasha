import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { type LuaVm, withLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { codeRoot } from "@akasha/pages-system/code-root"
import { tstlRoot } from "@akasha/temper-addon-build/lua-build-command"

const ERROR_CATEGORY = 1

export type { LuaVm }

type TstlModule = typeof import("@akasha/lua-compiler/transpilation")

type Diagnostic = ReturnType<TstlModule["transpileProject"]>["diagnostics"][number]

export type SubjectRepo = "code" | "compiler"

function rootOf(repo: SubjectRepo): string {
  return repo === "compiler" ? tstlRoot() : codeRoot()
}

export function addonPath(ref: string, repo: SubjectRepo = "code"): string {
  const root = rootOf(repo)
  const at = join(root, ref)
  if (!existsSync(at)) {
    throw new Error(
      `\`${ref}\` is nowhere under the ${repo} tree at ${root}, so this looked at nothing rather ` +
        `than finding nothing wrong — point ${repo === "compiler" ? "AKASHA_ROOT" : "CODE_ROOT"} at the tree this should be read against`
    )
  }
  return at
}

export function addonSource(
  ref: string,
  mustHold: readonly string[] = [],
  repo: SubjectRepo = "code"
): string {
  const at = addonPath(ref, repo)
  const text = readFileSync(at, "utf8")
  if (text.trim() === "") {
    throw new Error(`\`${ref}\` at ${at} is empty, so there is nothing in it to examine`)
  }
  const absent = mustHold.filter((one) => !text.includes(one))
  if (absent.length > 0) {
    throw new Error(
      `\`${ref}\` at ${at} names none of ${absent.join(", ")}, so what this examines has moved or gone ` +
        `and a pass here would certify a subject that was never read`
    )
  }
  return text
}

export interface Subject {
  readonly ref: string
  readonly holds: readonly string[]
  readonly repo?: SubjectRepo
}

export function examined(subjects: readonly Subject[]): number {
  for (const one of subjects) addonSource(one.ref, one.holds, one.repo ?? "code")
  return subjects.length
}

export interface BundleOpts {
  readonly noImplicitSelf?: boolean
  readonly include?: readonly string[]
}

function said(text: Diagnostic["messageText"]): string {
  return typeof text === "string" ? text : text.messageText
}

export async function bundleToLua(source: string, opts: BundleOpts = {}): Promise<string> {
  const { transpileProject } = await import("@akasha/lua-compiler/transpilation")
  const root = mkdtempSync("/var/tmp/temper-addon-lua-")
  try {
    mkdirSync(join(root, "src"))
    writeFileSync(join(root, "src", "main.ts"), source, "utf8")
    const tsconfigPath = join(root, "tsconfig.json")
    writeFileSync(
      tsconfigPath,
      JSON.stringify(
        {
          compilerOptions: {
            target: "esnext",
            module: "esnext",
            moduleResolution: "bundler",
            strict: false,
            skipLibCheck: true,
            rootDir: ".",
            outDir: "./lua-out",
            types: [],
          },
          tstl: {
            luaTarget: "5.1",
            luaBundle: "out.lua",
            luaBundleEntry: "./src/main.ts",
            luaLibImport: "inline",
            ...(opts.noImplicitSelf === true ? { noImplicitSelf: true } : {}),
          },
          include: ["src/**/*.ts", ...(opts.include ?? [])],
        },
        null,
        2
      ),
      "utf8"
    )

    const { diagnostics, emitSkipped } = transpileProject(tsconfigPath)
    const errors = diagnostics.filter((one) => one.category === ERROR_CATEGORY)
    if (errors.length > 0) {
      throw new Error(
        `tstl reported errors:\n${errors.map((one) => `${one.code}: ${said(one.messageText)}`).join("\n")}`
      )
    }
    if (emitSkipped) throw new Error("tstl skipped the emit, so no bundle was written to run")

    return readFileSync(join(root, "lua-out", "out.lua"), "utf8")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

export function withLua<T>(run: (vm: LuaVm) => Promise<T>): Promise<T> {
  return withLuaVm(run)
}

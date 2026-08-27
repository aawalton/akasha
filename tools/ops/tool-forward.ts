
import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { operationalError } from "../lib/exit.ts"
import { type Repo as Addressable } from "../../page/document/types"
import { resolveRoots } from "../../repo/roots/roots"
import type { CommandHelp } from "./surface.ts"

const HELP_TIMEOUT_MS = 10_000

export type ForwardRepo = Addressable

function toolPathIn(root: string, name: string): string | null {
  const path = `${root}/tools/${name}.ts`
  return existsSync(path) ? path : null
}

function childEnv(root: string): Record<string, string | undefined> {
  return { ...process.env, INSTRUCTIONS_ROOT: root }
}

function repoArgs(repo: ForwardRepo | null): readonly string[] {
  return repo === null || repo === "instructions" ? [] : ["--repo", repo]
}

function runTool(path: string, root: string, args: readonly string[]): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const child = spawn(process.execPath, [path, ...args], { stdio: "inherit", env: childEnv(root) })
    child.on("error", (err: Error & { code?: string }) => {
      const said =
        err.code === "ENOENT"
          ? `${process.execPath} not found, so ${path} could not be run`
          : `${path} failed to start: ${err.message}`
      reject(operationalError(said))
    })
    child.on("close", (code, signal) => {
      if (signal !== null) {
        reject(operationalError(`${path} died on ${signal} and reported no exit code`))
        return
      }
      resolve(code ?? 0)
    })
  })
}

function toolHelp(name: string): Promise<string> {
  const root = resolveRoots().instructions
  const path = toolPathIn(root, name)
  if (path === null) return Promise.resolve(missingToolText(root, name))
  return new Promise<string>((resolve) => {
    const child = spawn(process.execPath, [path, "--help"], {
      stdio: ["ignore", "pipe", "pipe"],
      env: childEnv(root),
      timeout: HELP_TIMEOUT_MS,
    })
    let out = ""
    let err = ""
    child.stdout?.on("data", (chunk: Buffer) => {
      out += chunk.toString()
    })
    child.stderr?.on("data", (chunk: Buffer) => {
      err += chunk.toString()
    })
    child.on("error", () => resolve(""))
    child.on("close", () => resolve(out.trim() !== "" ? out.trim() : err.trim()))
  })
}

function missingToolText(root: string, name: string): string {
  return `${root}/tools/${name}.ts is not there, so this command forwards to nothing — check INSTRUCTIONS_ROOT names an instructions checkout`
}

export function forwardHelp(name: string, summary: string, repo: ForwardRepo | null): CommandHelp {
  const addressing =
    repo === null || repo === "instructions"
      ? "Every argument is forwarded verbatim and in order, nothing is parsed or rewritten on the way through, and "
      : `It supplies \`tools/${name}.ts --repo ${repo}\`, so every path is taken against the ${repo} root and the commit and the push land there. The flag is the TOOL's and is named here under the tool that declares it, because \`ops\` has no such flag of its own. Every other argument is forwarded verbatim and in order, and `
  return {
    description:
      `${summary}.\n` +
      "\n" +
      `An \`ops\` command forwarding to \`tools/${name}.ts\` in the instructions repository. ${addressing}` +
      "the exit code is the tool's own passed back unchanged. The flags, the exit codes and the " +
      "refusals are the tool's to state, and what it states is printed below.\n" +
      "\n" +
      "`--help` and `-h` are captured by the `ops` dispatcher wherever they appear, so the " +
      "tool's own help is reached through this block rather than by forwarding the flag.",
    positionals: [
      {
        name: "args",
        required: false,
        variadic: true,
        description: `Forwarded to \`tools/${name}.ts\` verbatim.`,
      },
    ],
    envVars: [
      {
        name: "INSTRUCTIONS_ROOT",
        required: false,
        path: true,
        default: "$HOME/repos/instructions",
        description:
          "Which instructions checkout this command reaches. Passed to the tool explicitly rather than left to it to derive.",
      },
    ],
    epilog: () => toolHelp(name),
  }
}

export function forwardRunner(name: string, repo: ForwardRepo | null): (args: readonly string[]) => Promise<void> {
  return async function runForwardedTool(args: readonly string[]): Promise<void> {
    const root = resolveRoots().instructions
    const path = toolPathIn(root, name)
    if (path === null) throw operationalError(missingToolText(root, name))
    const code = await runTool(path, root, [...repoArgs(repo), ...args])
    if (code !== 0) process.exitCode = code
  }
}

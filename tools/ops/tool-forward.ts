import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { operationalError } from "../lib/exit.ts"
import type { CommandDocument, CommandHelp } from "./surface.ts"

const HELP_TIMEOUT_MS = 10_000

// The file a forwarded command runs is the one its page names, read from the repository root.
// Nothing here builds a path out of the command's name: the page says the file, and a file the
// page names that is not there is answered by name rather than by the command going missing.
function entryAt(root: string, document: CommandDocument): string | null {
  const path = join(root, document.entryFile)
  return existsSync(path) ? path : null
}

function childEnv(root: string): Record<string, string | undefined> {
  return { ...process.env, AKASHA_ROOT: root }
}

function runTool(path: string, root: string, args: readonly string[]): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const child = spawn(process.execPath, [path, ...args], {
      stdio: "inherit",
      env: childEnv(root),
    })
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

function toolHelp(document: CommandDocument): Promise<string> {
  const root = akashaRoot()
  const path = entryAt(root, document)
  if (path === null) return Promise.resolve(missingToolText(root, document))
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

export function missingToolText(root: string, document: CommandDocument): string {
  return (
    `${document.entryFile} is not there under ${root}, so \`ops ${document.path.join(" ")}\` ` +
    `forwards to nothing. The page \`${document.slug}\` still names that file: put the file back, ` +
    `or take the page away with the command — and check AKASHA_ROOT names an akasha checkout`
  )
}

export function forwardHelp(document: CommandDocument): CommandHelp {
  return {
    description:
      `${document.summary}\n` +
      "\n" +
      `An \`ops\` command forwarding to \`${document.entryFile}\` in the akasha repository, the file ` +
      `the page \`${document.slug}\` names. Every argument is forwarded verbatim and in order, ` +
      "nothing is parsed or rewritten on the way through, and the exit code is the tool's own " +
      "passed back unchanged. The flags, the exit codes and the refusals are the tool's to state, " +
      "and what it states is printed below.\n" +
      "\n" +
      "`--help` and `-h` are captured by the `ops` dispatcher wherever they appear, so the " +
      "tool's own help is reached through this block rather than by forwarding the flag.",
    positionals: [
      {
        name: "args",
        required: false,
        variadic: true,
        description: `Forwarded to \`${document.entryFile}\` verbatim.`,
      },
    ],
    envVars: [
      {
        name: "AKASHA_ROOT",
        required: false,
        path: true,
        default: "$HOME/repos/akasha",
        description:
          "Which akasha checkout this command reaches. Passed to the tool explicitly rather than left to it to derive.",
      },
    ],
    epilog: () => toolHelp(document),
  }
}

export function forwardRunner(
  document: CommandDocument
): (args: readonly string[]) => Promise<void> {
  return async function runForwardedTool(args: readonly string[]): Promise<void> {
    const root = akashaRoot()
    const path = entryAt(root, document)
    if (path === null) throw operationalError(missingToolText(root, document))
    const code = await runTool(path, root, [...args])
    if (code !== 0) process.exitCode = code
  }
}

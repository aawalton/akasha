import { basename } from "node:path"
import { toolInputText } from "../lib/hook-command.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

const HOOK_NAME = "block-playwright-stray-filename"

function outputDir(): string {
  const stated = process.env.PLAYWRIGHT_MCP_OUTPUT_DIR
  const held =
    stated === undefined || stated === "" ? `${process.env.HOME ?? ""}/.playwright-mcp` : stated
  return held.endsWith("/") ? held.slice(0, -1) : held
}

async function main(): Promise<number> {
  const filename = toolInputText(await Bun.stdin.text(), "filename", HOOK_NAME)
  if (filename === "") return 0
  const dir = outputDir()
  if (filename.startsWith(`${dir}/`)) return 0
  const said = refusalText(
    HOOK_NAME,
    { filename, dir, base: basename(filename) },
    canonicalize(ownRepoRoot())
  )
  process.stderr.write(`${said}\n`)
  console.log(JSON.stringify({ decision: "block", reason: said }, null, 2))
  return 2
}

if (import.meta.main) process.exit(await main())


import { fromDisk, refusalText } from "../lib/refusal.ts"
import { canonicalize, normalizeAbsolute } from "../../repo/path/path"
import { resolveRoots } from "../../repo/roots/roots"

const STORE_PREFIX = "agent-memory"

function expandHome(path: string): string {
  const home = process.env.HOME
  if (home === undefined || home === "") return path
  if (path === "~") return home
  return path.startsWith("~/") ? `${home}${path.slice(1)}` : path
}

function insideStore(path: string): boolean {
  return path
    .split("/")
    .slice(0, -1)
    .some((component) => component.startsWith(STORE_PREFIX))
}

function refusal(path: string): string {
  return refusalText("block-memory-store-write", { path }, resolveRoots().akasha, fromDisk)
}

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  const input = fields.tool_input
  if (input === null || typeof input !== "object") return
  const filePath = (input as Record<string, unknown>).file_path
  if (typeof filePath !== "string" || filePath === "") return

  const cwd = typeof fields.cwd === "string" && fields.cwd !== "" ? fields.cwd : process.cwd()
  const expanded = expandHome(filePath)
  const spelled = normalizeAbsolute(expanded.startsWith("/") ? expanded : `${cwd}/${expanded}`)
  if (!insideStore(spelled) && !insideStore(canonicalize(spelled))) return

  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: refusal(spelled),
      },
    })
  )
}

await main()

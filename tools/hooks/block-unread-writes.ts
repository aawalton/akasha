import { refuses, standingOn, stoodAside } from "../lib/required-reading-standing.ts"
import { codeCheckoutOf, expandHome } from "../lib/code-checkout.ts"
import { recordingAgentId } from "../lib/read-log.ts"
import { canonicalize, isInside, normalizeAbsolute } from "../../repo/path/path"
import { resolveRoots } from "../../repo/roots/roots"

function deny(reason: string): void {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    })
  )
}

function announce(message: string): void {
  console.log(JSON.stringify({ systemMessage: message }))
}

function judge(fields: Record<string, unknown>): void {
  const input = fields.tool_input
  if (input === null || typeof input !== "object") return
  const filePath = (input as Record<string, unknown>).file_path
  if (typeof filePath !== "string" || filePath === "") return

  const cwd = typeof fields.cwd === "string" && fields.cwd !== "" ? fields.cwd : process.cwd()
  const expanded = expandHome(filePath)
  const absolute = canonicalize(
    normalizeAbsolute(expanded.startsWith("/") ? expanded : `${cwd}/${expanded}`)
  )

  const roots = resolveRoots()
  if (isInside(roots.instructions, absolute)) return
  const checkout = codeCheckoutOf(absolute, roots.code)
  if (checkout === null || absolute === checkout) return

  const standing = standingOn({
    relPath: absolute.slice(checkout.length + 1),
    repo: "code",
    root: roots.instructions,
    agent: recordingAgentId(fields),
  })
  if (refuses(standing)) return deny(standing.refusals.join("\n\n"))
  if (stoodAside(standing)) return announce(standing.detail)
}

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return announce("block-unread-writes: the hook payload would not parse, so nothing was checked")
  }
  if (payload === null || typeof payload !== "object") return
  try {
    judge(payload as Record<string, unknown>)
  } catch (error) {
    announce(
      `block-unread-writes: the check itself failed, so the write proceeded unchecked — ` +
        `${error instanceof Error ? error.message : String(error)}`
    )
  }
}

await main()

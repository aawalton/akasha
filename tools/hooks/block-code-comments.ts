import { existsSync, readFileSync } from "node:fs"
import { type Comment, commentsIn, UnscannableFile } from "../code-comment/comments.ts"
import { classify, FORMS_DOC, formsFrom } from "../code-comment/forms.ts"
import { reachedBy, setAside } from "../code-comment/tree.ts"
import { codeCheckoutOf, expandHome } from "../lib/code-checkout.ts"
import { fromDisk, refusalText } from "../lib/refusal.ts"
import { canonicalize, isInside, normalizeAbsolute } from "../../repo/path/path"
import { resolveRoots } from "../../repo/roots/roots"

const MAX_REPORTED = 10

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

function said(raw: string): string {
  const first = raw.split("\n")[0]?.trim() ?? ""
  return first.length > 60 ? `${first.slice(0, 60)}…` : first
}

function bodyAfter(fields: Record<string, unknown>, absolute: string): string | null {
  const input = fields.tool_input as Record<string, unknown>
  if (fields.tool_name === "Write") {
    const content = input.content
    return typeof content === "string" ? content : null
  }
  const old = input.old_string
  const next = input.new_string
  if (typeof old !== "string" || old === "" || typeof next !== "string") return null
  if (!existsSync(absolute)) return null
  const body = readFileSync(absolute, "utf8")
  if (!body.includes(old)) return null
  return input.replace_all === true ? body.split(old).join(next) : body.replace(old, () => next)
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

  const relPath = absolute.slice(checkout.length + 1)
  if (!reachedBy(roots.akasha, relPath, "code")) return

  const body = bodyAfter(fields, absolute)
  if (body === null) return
  if (setAside(relPath, () => body) !== null) return

  let comments: readonly Comment[]
  try {
    comments = commentsIn(relPath, body)
  } catch (error) {
    if (error instanceof UnscannableFile) return
    throw error
  }

  const forms = formsFrom(readFileSync(`${roots.akasha}/${FORMS_DOC}`, "utf8"))
  const outside = comments.filter((comment) => classify(comment, relPath, forms) !== "form")
  if (outside.length === 0) return

  const named = outside
    .slice(0, MAX_REPORTED)
    .map((comment) => `line ${comment.line} — ${said(comment.raw)}`)
  if (outside.length > named.length) named.push(`and ${outside.length - named.length} more, not listed`)
  deny(
    refusalText(
      "comment-outside-the-forms",
      {
        path: relPath,
        count: String(outside.length),
        comments: named.join("; "),
        forms: FORMS_DOC,
      },
      roots.akasha,
      fromDisk
    )
  )
}

async function main(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return announce("block-code-comments: the hook payload would not parse, so nothing was checked")
  }
  if (payload === null || typeof payload !== "object") return
  try {
    judge(payload as Record<string, unknown>)
  } catch (error) {
    announce(
      `block-code-comments: the check itself failed, so the write proceeded unchecked — ` +
        `${error instanceof Error ? error.message : String(error)}`
    )
  }
}

await main()

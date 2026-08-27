import { seatPageFile } from "../lib/hook-seat-page.ts"

const PAGE_SUFFIX = ".md"

async function main(): Promise<number> {
  try {
    await Bun.stdin.text()
  } catch {
    void 0
  }
  const agent = process.env.AGENT_ID ?? ""
  if (agent === "") return 0
  const page = seatPageFile(agent)
  if (page === "") return 0
  const bare = page.slice(page.lastIndexOf("/") + 1)
  const name = bare.endsWith(PAGE_SUFFIX) ? bare.slice(0, -PAGE_SUFFIX.length) : bare
  if (name === "") return 0
  console.log(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "UserPromptSubmit", sessionTitle: name },
    })
  )
  return 0
}

if (import.meta.main) process.exit(await main())

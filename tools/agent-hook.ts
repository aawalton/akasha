import { join, resolve } from "node:path"

import { refusing, said } from "@akasha/hook-system/hook-answer"
import { reachedIn } from "@akasha/hook-system/hook-reaching"

// THE ONE PATH A REGISTRATION HOLDS. A settings document is composed at spawn and handed to a
// client that never reads it again, so any path it names is frozen for that client's whole life.
// A folder rename under `akasha/` then leaves every already-running agent registering a hook at a
// path nothing is at, and the harness reports that as a non-blocking error while the guard is
// gone. So the registration names a hook by its slug and this file by a path outside `akasha/`,
// which `akasha move` carries nothing into or out of. What the slug reaches is worked out here,
// from the checkout as it is at the call.

const ROOT = resolve(import.meta.dir, "..")

const ENTRY = "ran"

const NAMED = "agent-hook.ts"

const INPUT = 1

const HELP = `bun tools/agent-hook.ts <hook> — run one agent hook, reached by its name

Reads the hook payload on standard input and answers as that hook answers. The name is an
\`agent-hook\` page's slug; what it reaches is worked out at this call rather than written into
the registration that names it, so a hook whose folder was renamed is still reached.

Usage:
  bun ~/repos/akasha/tools/agent-hook.ts block-biome < payload.json
  bun ~/repos/akasha/tools/agent-hook.ts block-biome --scope

Flags:
  --help, -h  Print this and exit 0. Every other word goes to the hook.

Exits:
  0  the hook stood aside, or answered with the call's input changed
  1  no hook was named
  2  the hook refused the call, or the name reached no hook
  5  the hook was handed a payload it could not read
`

// A GUARD THAT CANNOT BE REACHED IS REFUSED RATHER THAN PASSED. Failing open is what let a whole
// day's work run unguarded behind one error line. Failing closed costs a hard stop when a hook is
// really gone, which is why `hook-reaching` searches the folder before answering that it is: a
// stale or missing index is a slow reach here rather than a stopped fleet.
function unreachable(name: string, why: string): number {
  return said(
    refusing(
      [
        `${NAMED}: the hook \`${name}\` is registered and could not be reached, so this call is`,
        "refused rather than let through unguarded.",
        "",
        why,
        "",
        "A guard nothing reaches guards nothing, and a call let through here would be a call",
        "nobody judged. Rebuild the index with `akasha index refresh` if it is behind, put the",
        "hook's page and code file back if either has gone, and relaunch this seat once the name",
        "reaches its file again.",
      ].join("\n")
    )
  )
}

async function main(): Promise<number> {
  const argv = Bun.argv.slice(2)
  if (argv[0] === "--help" || argv[0] === "-h") {
    process.stdout.write(HELP)
    return 0
  }
  const name = argv[0]
  if (name === undefined || name === "") {
    process.stderr.write(`${NAMED}: takes the name of one agent hook, and none was said\n`)
    return INPUT
  }
  const reached = reachedIn(ROOT, name)
  if ("unreached" in reached) return unreachable(name, reached.unreached)

  // THE HOOK IS HANDED THE COMMAND LINE IT WOULD HAVE HAD. Its own tail reads `Bun.argv[2]` for
  // `--scope`, and `Bun.argv` is `process.argv`, so taking this file's own argument off the front
  // leaves the hook reading exactly what a direct `bun <hook file>` would have given it.
  process.argv.splice(2, 1)

  let mod: Record<string, unknown>
  try {
    mod = (await import(join(ROOT, reached.at))) as Record<string, unknown>
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return unreachable(name, `${reached.at} would not load — ${why}`)
  }
  const ran = mod[ENTRY]
  if (typeof ran !== "function") {
    return unreachable(name, `${reached.at} answers to no \`${ENTRY}\`, so nothing there can run`)
  }
  return await (ran as () => Promise<number> | number)()
}

if (import.meta.main) process.exit(await main())

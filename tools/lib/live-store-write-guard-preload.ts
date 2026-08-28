const TEST_RUN = "AKASHA_TEST_RUN"

/**
 * Mark this test run, and everything it starts, so a write can tell it is one.
 *
 * A WRITE REFUSED FOR BEING A TEST'S IS REFUSED WHERE IT LANDS, and where it lands is usually not
 * this process. A test reaches the page store by spawning `ops`, and in that child `Bun.main` is
 * the CLI rather than a test file, so the child cannot see what started it. Only the environment
 * crosses, so the environment is what carries the mark.
 *
 * SETTING `process.env` IS NOT ENOUGH, and this is the whole reason the patching below exists.
 * `Bun.spawn` given no `env` hands the child the environment this process STARTED with, not the one
 * it holds now, so a variable set here after startup reaches a child only where the test happens to
 * spread `process.env` into the spawn itself. Most do not. Patching the four spawn forms puts the
 * mark in every child's environment whether the caller passes an `env` or not.
 *
 * IT MARKS RATHER THAN REFUSES. Nothing here decides anything; the decision is
 * `tools/lib/live-store-write-guard.ts`, at each place a write lands, where the path is known.
 */
process.env[TEST_RUN] = "1"

type Options = Record<string, unknown> | undefined

function marked(options: Options): Record<string, unknown> {
  const stated = options?.["env"] as Record<string, string | undefined> | undefined
  return { ...(options ?? {}), env: { ...(stated ?? process.env), [TEST_RUN]: "1" } }
}

const spawn = Bun.spawn
const spawnSync = Bun.spawnSync

// BOTH CALL FORMS ARE CARRIED. `Bun.spawn(cmd, options)` and `Bun.spawn({ cmd, ...options })` are
// the same call, and a test using the second would slip a wrapper that only knew the first.
Bun.spawn = ((first: unknown, second?: unknown) =>
  Array.isArray(first)
    ? spawn(first as string[], marked(second as Options))
    : spawn(marked(first as Options) as never)) as typeof Bun.spawn

Bun.spawnSync = ((first: unknown, second?: unknown) =>
  Array.isArray(first)
    ? spawnSync(first as string[], marked(second as Options))
    : spawnSync(marked(first as Options) as never)) as typeof Bun.spawnSync

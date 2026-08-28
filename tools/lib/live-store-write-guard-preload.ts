const TEST_RUN = "AKASHA_TEST_RUN"

process.env[TEST_RUN] = "1"

type Options = Record<string, unknown> | undefined

function marked(options: Options): Record<string, unknown> {
  const stated = options?.["env"] as Record<string, string | undefined> | undefined
  return { ...(options ?? {}), env: { ...(stated ?? process.env), [TEST_RUN]: "1" } }
}

const spawn = Bun.spawn
const spawnSync = Bun.spawnSync

Bun.spawn = ((first: unknown, second?: unknown) =>
  Array.isArray(first)
    ? spawn(first as string[], marked(second as Options))
    : spawn(marked(first as Options) as never)) as typeof Bun.spawn

Bun.spawnSync = ((first: unknown, second?: unknown) =>
  Array.isArray(first)
    ? spawnSync(first as string[], marked(second as Options))
    : spawnSync(marked(first as Options) as never)) as typeof Bun.spawnSync


import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, renameSync, writeFileSync } from "node:fs"
import { shape } from "./shape.ts"

const LOG = "[spawn-settings]"

export const AGENT_SETTINGS_COMMAND = "agent-settings"

export const AGENT_SETTINGS_PATH = new URL("../../settings/agents.json", import.meta.url)
  .pathname

export const PER_SPAWN_KEYS = ["remoteControlAtStartup"] as const

export type SpawnSettingsOverrides = {
  readonly [K in (typeof PER_SPAWN_KEYS)[number]]: boolean
}

export function refreshedSettings(
  existing: Record<string, unknown>,
  base: Record<string, unknown>
): Record<string, unknown> {
  const kept: Record<string, unknown> = {}
  for (const key of PER_SPAWN_KEYS) {
    if (key in existing) kept[key] = existing[key]
  }
  return { ...base, ...kept }
}

export type SpawnSettingsBase =
  | { readonly kind: "loaded"; readonly settings: Record<string, unknown> }
  | { readonly kind: "absent"; readonly reason: string }

const SETTINGS_OBJECT = shape.record(shape.string(), shape.unknown())

export function parseAgentSettings(stdout: string): SpawnSettingsBase {
  let parsed: ReturnType<typeof SETTINGS_OBJECT.safeParse>
  try {
    parsed = SETTINGS_OBJECT.safeParse(JSON.parse(stdout))
  } catch (err) {
    return { kind: "absent", reason: `invalid JSON: ${err instanceof Error ? err.message : err}` }
  }
  if (!parsed.success) {
    return { kind: "absent", reason: "expected a JSON object at the top level" }
  }
  return { kind: "loaded", settings: parsed.data }
}

export type AskAgentSettings = () => Promise<{
  readonly stdout: string
  readonly stderr: string
  readonly code: number
}>

const EXIT_DATA = 2

const MOST = 32 * 1024 * 1024

const AGENT_SETTINGS_AT = new URL("../agent-settings.ts", import.meta.url).pathname

const liveAsk: AskAgentSettings = async () => {
  const ran = spawnSync(process.execPath, [AGENT_SETTINGS_AT], {
    encoding: "utf8",
    maxBuffer: MOST,
  })
  if (ran.error !== undefined) {
    return {
      stdout: "",
      stderr:
        `\`${AGENT_SETTINGS_COMMAND}\` could not be run at ${AGENT_SETTINGS_AT}, so nothing is ` +
        `answered about what the fleet loads: ${ran.error.message}`,
      code: EXIT_DATA,
    }
  }
  return { stdout: ran.stdout ?? "", stderr: ran.stderr ?? "", code: ran.status ?? EXIT_DATA }
}

export async function readAgentSettingsBase(
  ask: AskAgentSettings = liveAsk
): Promise<SpawnSettingsBase> {
  let answer: Awaited<ReturnType<AskAgentSettings>>
  try {
    answer = await ask()
  } catch (err) {
    return { kind: "absent", reason: err instanceof Error ? err.message : String(err) }
  }
  if (answer.code !== 0) {
    return {
      kind: "absent",
      reason: `\`${AGENT_SETTINGS_COMMAND}\` exited ${answer.code}: ${answer.stderr.trim() || "(nothing on stderr)"}`,
    }
  }
  return parseAgentSettings(answer.stdout)
}

export function composeSpawnSettings(
  base: Record<string, unknown> | null,
  overrides: SpawnSettingsOverrides
): Record<string, unknown> {
  return { ...(base ?? {}), ...overrides }
}

function warnAbsent(reason: string): undefined {
  console.error(
    `${LOG} agent settings NOT loaded: \`${AGENT_SETTINGS_COMMAND}\` — ${reason}.\n` +
      `${LOG} this spawn carries only the per-spawn overrides; every key the ` +
      `document declares (hooks, env, permissions, fastMode, statusLine) is inert ` +
      `for it. Restore settings/agents.json.`
  )
}

export async function materializeSpawnSettings(
  overrides: SpawnSettingsOverrides,
  opts?: { readonly ask?: AskAgentSettings; readonly tmpDir?: string }
): Promise<string> {
  const base = await readAgentSettingsBase(opts?.ask ?? liveAsk)
  if (base.kind === "absent") warnAbsent(base.reason)

  const payload = composeSpawnSettings(base.kind === "loaded" ? base.settings : null, overrides)
  const contents = JSON.stringify(payload)
  const digest = createHash("sha256").update(contents).digest("hex").slice(0, 16)
  const target = `${opts?.tmpDir ?? "/tmp"}/agent-settings-${digest}.json`

  if (!existsSync(target)) {
    const tmp = `${target}.tmp-${process.pid}`
    writeFileSync(tmp, contents)
    renameSync(tmp, target)
  }
  return target
}

import {
  chmodSync,
  existsSync,
  readFileSync,
  realpathSync,
  renameSync,
  writeFileSync,
} from "node:fs"
import {
  type AuthSession,
  applyRefreshedSessionToStorageState,
  classifyPlaywrightStorageState,
  RefreshedTokensSchema,
} from "@akasha/browser-test-harness/storage-state-reading"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import {
  getMcpServerRegistry,
  type McpServerConfig,
  playwrightStorageStatePath,
} from "@akasha/seat-system/mcp-registry"
import { computeMcpConfigContent } from "./claude-launch-args.ts"
import { planDisableReconcile } from "./mcp-disable-reconcile.ts"
import { shape } from "./shape.ts"

const LOG = "[supervisor-mcp]"

const EXPORT_SCRIPT_RELPATH = "tools/playwright-storage-state.ts"
const REFRESH_TIMEOUT_MS = 10_000
const EXPORT_TIMEOUT_MS = 180_000

const RefreshEnvSchema = shape.object({
  SUPABASE_URL: shape.string().url(),
  SUPABASE_ANON_KEY: shape.string().min(1),
})

async function refreshSeededSession(session: AuthSession): Promise<string | null> {
  const env = RefreshEnvSchema.safeParse(process.env)
  if (!env.success) {
    console.error(`${LOG} refresh unavailable: SUPABASE_URL / SUPABASE_ANON_KEY not in env`)
    return null
  }
  try {
    const response = await fetch(
      `${env.data.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: { apikey: env.data.SUPABASE_ANON_KEY, "content-type": "application/json" },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
        signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
      }
    )
    if (!response.ok) {
      console.error(`${LOG} refresh grant rejected (HTTP ${response.status}) — session family dead`)
      return null
    }
    const refreshed = RefreshedTokensSchema.safeParse(await response.json())
    if (!refreshed.success) {
      console.error(`${LOG} refresh grant returned an unexpected shape`)
      return null
    }
    const path = playwrightStorageStatePath()
    const rewrite = applyRefreshedSessionToStorageState(
      readFileSync(path, "utf8"),
      refreshed.data,
      Date.now()
    )
    if (!rewrite.ok) {
      console.error(`${LOG} refresh rewrite refused: ${rewrite.reason}`)
      return null
    }
    atomicWriteStorageState(path, rewrite.contents)
    return path
  } catch (err) {
    console.error(`${LOG} refresh grant failed:`, err instanceof Error ? err.message : err)
    return null
  }
}

function atomicWriteStorageState(path: string, contents: string): undefined {
  const tmp = `${path}.tmp-${process.pid}`
  writeFileSync(tmp, contents)
  chmodSync(tmp, 0o600)
  renameSync(tmp, path)
}

async function runExportScript(): Promise<undefined> {
  const scriptPath = `${ownRepoRoot()}/${EXPORT_SCRIPT_RELPATH}`
  console.log(`${LOG} re-exporting playwright storage state via ${EXPORT_SCRIPT_RELPATH}`)
  const proc = Bun.spawn(["bun", scriptPath], {
    stdout: "pipe",
    stderr: "pipe",
    timeout: EXPORT_TIMEOUT_MS,
  })
  const [exitCode, stdout, stderr] = await Promise.all([
    proc.exited,
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  if (exitCode !== 0) {
    throw new Error(
      `${LOG} storage-state re-export failed (exit ${exitCode}). ` +
        `The browser MCP cannot be seeded with an authenticated session. ` +
        `Fix and re-run: bun ${EXPORT_SCRIPT_RELPATH} ` +
        `(requires BROWSER_TEST_URL / BROWSER_TEST_EMAIL / BROWSER_TEST_PASSWORD / ` +
        `SUPABASE_URL / SUPABASE_ANON_KEY in ~/.secrets.env). ` +
        `Script output: ${stdout.slice(-500)} ${stderr.slice(-500)}`
    )
  }
}

let inFlightValidation: Promise<undefined> | null = null

async function ensureFreshPlaywrightStorageState(): Promise<undefined> {
  if (inFlightValidation) return inFlightValidation
  const validation = async (): Promise<undefined> => {
    const path = playwrightStorageStatePath()
    const classify = (): ReturnType<typeof classifyPlaywrightStorageState> =>
      existsSync(path)
        ? classifyPlaywrightStorageState(readFileSync(path, "utf8"), Date.now())
        : { kind: "needs-export", reason: "storage-state file missing" }

    const initial = classify()
    if (initial.kind === "fresh") return undefined
    if (initial.kind === "needs-refresh") {
      console.log(`${LOG} seeded JWT stale (exp ${initial.jwtExpIso}) — refreshing in place`)
      const refreshedPath = await refreshSeededSession(initial.session)
      if (refreshedPath !== null) {
        console.log(`${LOG} storage state refreshed in place`)
        return undefined
      }
    } else {
      console.log(`${LOG} storage state unusable (${initial.reason}) — full re-export`)
    }

    await runExportScript()
    const after = classify()
    if (after.kind !== "fresh") {
      throw new Error(
        `${LOG} storage state still not fresh after re-export ` +
          `(${after.kind === "needs-export" ? after.reason : `JWT exp ${after.jwtExpIso}`}). ` +
          `Refusing to seed the browser MCP with an unauthenticated session.`
      )
    }
    console.log(`${LOG} storage state re-exported and verified fresh`)
    return undefined
  }
  const inFlight = validation().finally(() => {
    inFlightValidation = null
  })
  inFlightValidation = inFlight
  return inFlight
}

function safeRealpath(p: string): string {
  try {
    return realpathSync(p)
  } catch {
    return p
  }
}

export function reconcileDisabledMcpServers(
  configDir: string,
  launchCwd: string,
  declaredServers: readonly string[]
): undefined {
  try {
    const configPath = `${configDir}/.claude.json`
    if (!existsSync(configPath)) return
    const raw = readFileSync(configPath, "utf8")
    const plan = planDisableReconcile(raw, launchCwd, declaredServers, safeRealpath)
    if (!plan) return

    const tmp = `${configPath}.tmp-${process.pid}`
    writeFileSync(tmp, plan.nextConfigText)
    renameSync(tmp, configPath)
    console.log(
      `${LOG} disabledMcpServers reconcile: cleared [${plan.clearedServers.join(", ")}] ` +
        `from ${configPath} (registry-declared MCPs are authoritative — RCA #14818)`
    )
  } catch (err) {
    console.error(
      `${LOG} disabledMcpServers reconcile failed (non-fatal, spawn proceeds):`,
      err instanceof Error ? err.message : err
    )
  }
}

export async function resolveMcpConfig(
  sessionId: string,
  opts?: {
    configDir?: string
    cwd?: string
    extraServers?: Record<string, McpServerConfig>
  }
): Promise<string | null> {
  const registry = getMcpServerRegistry()
  const content = computeMcpConfigContent(registry, opts?.extraServers)
  if (!content) return null
  if (opts?.configDir != null && opts.cwd != null) {
    reconcileDisabledMcpServers(opts.configDir, opts.cwd, Object.keys(content.mcpServers))
  }
  if ("playwright" in content.mcpServers) await ensureFreshPlaywrightStorageState()
  const configPath = `/tmp/mcp-local-${sessionId}.json`
  writeFileSync(configPath, JSON.stringify(content))
  return configPath
}

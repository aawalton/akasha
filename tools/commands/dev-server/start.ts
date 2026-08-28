export const summary = "Spawn a React Router dev server, detach it, and write a state file"

import { existsSync, openSync } from "node:fs"
import { enforceMemoryGuard } from "@shared/utils-system/memory-guard"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  readEnvLocal,
  resolveEnvLocalPath,
  writeEnvLocalFromSops,
} from "../../lib/dev-server-bootstrap.ts"
import {
  APP_NAMES,
  computePort,
  type DevServerState,
  ensureDevServerDirs,
  isPidAlive,
  logFilePath,
  lookupApp,
  readStateFile,
  writeStateFile,
} from "../../lib/dev-server-ops.ts"
import { resolveWorktreePath } from "../../lib/dev-server-worktree.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Branch sequence number (integer); the worktree is resolved from it, a worktree belonging to one branch",
    },
    {
      name: "--app",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: `App identifier (one of: ${APP_NAMES.join(", ")})`,
    },
    {
      name: "--port",
      argLabel: "<p>",
      valueShape: "token",
      description: "Override the computed port (basePort + seq % 100)",
    },
    { name: "--json", description: "Emit JSON result instead of the summary line" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description: "Branch sequence number (integer); the worktree is resolved from it, a worktree belonging to one branch",
    },
  ],
  envVars: [
    {
      name: "WORKTREE_DIR",
      description:
        "Absolute path of the worktree to run in. When set, it names the worktree outright and the seq names none; the seq still names the state file and the log. Refused with exit 2 when the path is not on disk. Left unset, the worktree is `${HOME}/worktrees/change-${seq}`.",
    },
  ],
  exits: [
    { code: 1, meaning: "input error: missing flag, unknown app, --port not a non-negative int" },
    {
      code: 2,
      meaning:
        "data error: the worktree the seq names is not on disk, or auto-bootstrap could not find `deploy/secrets.sops.yaml` for the app",
    },
    {
      code: 3,
      meaning:
        "operational error: server already running, port in use, process spawn failed, memory guard refused (MemAvailable below 8 GB), or auto-bootstrap sops decryption / JSON parsing failed",
    },
  ],
  examples: [
    "ops dev-server start 8485 --app alanwalton",
    "ops dev-server start --seq 8485 --app alanwalton",
    "ops dev-server start --seq 8485 --app alanwalton --port 3085 --json",
  ],
}

async function spawnDevServer(params: {
  readonly cmd: string[]
  readonly cwd: string
  readonly logFd: number
  readonly envLocalVars: Record<string, string>
}) {
  try {
    return Bun.spawn({
      cmd: params.cmd,
      cwd: params.cwd,
      stdin: "ignore",
      stdout: params.logFd,
      stderr: params.logFd,
      detached: true,
      env: {
        ...process.env,
        ...params.envLocalVars,
        NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN: "",
      },
    })
  } catch (err) {
    throw operationalError(
      `failed to spawn dev server: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

export default async function devServerStart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const appName = parsed.requireString("--app")
  const portOverride = parsed.nonNegativeInt("--port")
  const json = parsed.boolean("--json")

  const app = await lookupApp(appName)
  const port = portOverride ?? computePort({ basePort: app.basePort, seq })

  const worktreePath = await resolveWorktreePath(seq)
  const cwd = `${worktreePath}/${app.packagePath}`
  if (!existsSync(cwd)) {
    throw inputError(
      `app workspace does not exist: ${cwd} — check --seq and --app are correct`
    )
  }

  const envLocalPath = await resolveEnvLocalPath(worktreePath, appName)
  if (!existsSync(envLocalPath)) {
    const secretsPath = `${cwd}/deploy/secrets.sops.yaml`
    if (existsSync(secretsPath)) {
      const bootstrapResult = await writeEnvLocalFromSops({ worktreePath, appName })
      process.stderr.write(
        `auto-bootstrapped ${bootstrapResult.path} (${bootstrapResult.varCount} vars)\n`
      )
    }
  }

  const envLocalVars: Record<string, string> = existsSync(envLocalPath)
    ? readEnvLocal(envLocalPath)
    : {}

  const existing = readStateFile(seq, appName)
  if (existing && isPidAlive(existing.pid)) {
    throw operationalError(
      `dev-server already running for seq=${seq} app=${appName} (pid=${existing.pid}, port=${existing.port}); use 'ops dev-server restart' to replace it`
    )
  }

  try {
    enforceMemoryGuard("dev-server")
  } catch (err) {
    throw operationalError(err instanceof Error ? err.message : String(err))
  }

  ensureDevServerDirs(seq)
  const logPath = logFilePath(seq, appName)
  const logFd = openSync(logPath, "a", 0o600)

  const portStr = String(port)
  const cmd = [
    ...app.devCommand.map((arg) => (arg === "<PORT>" ? portStr : arg)),
    ...app.extraDevArgs,
  ]

  const proc = await spawnDevServer({ cmd, cwd, logFd, envLocalVars })
  if (typeof proc.unref === "function") proc.unref()

  const earlyExit = await Promise.race([
    proc.exited.then((code) => ({ exited: true, code })),
    new Promise<{ exited: false }>((resolve) => setTimeout(() => resolve({ exited: false }), 200)),
  ])
  if (earlyExit.exited) {
    throw operationalError(
      `dev server exited immediately with code ${earlyExit.code} (port ${port} may be in use; check ${logPath})`
    )
  }

  const state: DevServerState = {
    pid: proc.pid,
    port,
    app: appName,
    seq,
    worktree_path: worktreePath,
    started_at: new Date().toISOString(),
    log_path: logPath,
  }
  writeStateFile(state)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: true, pid: state.pid, port: state.port, log_path: state.log_path })}\n`
    )
  } else {
    process.stdout.write(`pid=${state.pid} port=${state.port} log=${state.log_path}\n`)
  }
}

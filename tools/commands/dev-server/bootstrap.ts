export const summary = "Decrypt the app's deploy/secrets.sops.yaml and write packagePath/.env.local"

import { existsSync } from "node:fs"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { resolveEnvLocalPath, writeEnvLocalFromSops } from "../../lib/dev-server-bootstrap.ts"
import { APP_NAMES } from "../../lib/dev-server-ops.ts"
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
      name: "--force",
      description: "Overwrite an existing `.env.local` instead of refusing",
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
        "Absolute path of the worktree to run in. When set, it names the worktree outright and the seq names nothing. Refused with exit 2 when the path is not on disk. Left unset, the worktree is `${HOME}/worktrees/change-${seq}`.",
    },
    {
      name: "SOPS_AGE_KEY_FILE",
      description:
        "Age private-key file used by sops to decrypt. Defaults to `~/.config/sops/age/keys.txt` per sops's own resolution.",
    },
  ],
  exits: [
    {
      code: 1,
      meaning: "input error: missing flag, unknown app, .env.local exists without --force",
    },
    {
      code: 2,
      meaning:
        "data error: the worktree the seq names is not on disk, or secrets.sops.yaml not found at the expected path",
    },
    { code: 3, meaning: "operational error: sops decryption or JSON parsing failed" },
  ],
  examples: [
    "ops dev-server bootstrap 8485 --app alanwalton",
    "ops dev-server bootstrap --seq 8485 --app alanwalton",
    "ops dev-server bootstrap --seq 8485 --app alanwalton --force",
  ],
}

export default async function devServerBootstrap(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireNonNegativeInt("--seq")
  const appName = parsed.requireString("--app")
  const force = parsed.boolean("--force")
  const json = parsed.boolean("--json")

  const worktreePath = await resolveWorktreePath(seq)
  const envPath = await resolveEnvLocalPath(worktreePath, appName)
  if (existsSync(envPath) && !force) {
    throw inputError(`${envPath} exists; pass --force to overwrite`)
  }

  const result = await writeEnvLocalFromSops({ worktreePath, appName })

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: true, path: result.path, var_count: result.varCount })}\n`
    )
  } else {
    process.stdout.write(`wrote ${result.path} (${result.varCount} vars)\n`)
  }
}

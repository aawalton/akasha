export const summary = "Scaffold a new workspace package (dir + package.json + CLAUDE.md, wired into workspaces)"

import type { CommandHelp } from "../../ops/surface.ts"
import { FUNCTIONAL_TYPES, isFunctionalType } from "../../../infra/workspace-cli/src/lib/package-add/derive.ts"
import { type PackageAddResult, runPackageAdd } from "../../../infra/workspace-cli/src/lib/package-add/run.ts"
import { stderrLogger } from "../../../infra/workspace-cli/src/lib/package-move/logger.ts"
import { changeBranchWorktree } from "../../lib/branch-worktree.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { commitWorktree } from "../../lib/worktree-commit.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description:
        "Sequence number of the change branch this runs in — the scaffold and its commit both happen inside that branch's worktree, `~/worktrees/change-<seq>`, and the commit message names the seq. Where `WORKTREE_DIR` is set it names the directory instead.",
    },
    {
      name: "--path",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description:
        "Repo-relative directory path for the new package (POSIX forward slashes), e.g. `packages/stories/engine`. Must be `packages/<scope>/<segment>...`.",
    },
    {
      name: "--type",
      argLabel: "<functionalType>",
      valueShape: "token",
      description:
        'functionalType for the new package. One of: pure, access, next-ui, local-service, next-app, service, worker, program, addon. Defaults to "pure".',
    },
    { name: "--json", description: "Emit JSON result instead of human text" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description:
        "Sequence number of the change branch this runs in — the scaffold and its commit both happen inside that branch's worktree, `~/worktrees/change-<seq>`, and the commit message names the seq. Where `WORKTREE_DIR` is set it names the directory instead.",
    },
  ],
  exits: [
    { code: 0, meaning: "package scaffolded and committed" },
    {
      code: 1,
      meaning:
        "input error: bad args, invalid --type, malformed path, or --seq names a branch with no worktree on disk",
    },
    {
      code: 3,
      meaning:
        "operational error: path exists, fs/bun/subprocess failure during scaffold or commit",
    },
  ],
  examples: [
    "ops package add 19450 --path packages/stories/engine",
    "ops package add --seq 19450 --path packages/stories/engine",
    "ops package add --seq 19450 --path packages/shared/widget --type access",
    "ops package add --seq 19450 --path packages/agents/notifier --type service --json",
  ],
}

export default async function packageAdd(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const seq = parsed.requireNonNegativeInt("--seq")
  const path = parsed.requireString("--path")
  const typeArg = parsed.string("--type") ?? "pure"
  const json = parsed.boolean("--json")

  if (!isFunctionalType(typeArg)) {
    throw inputError(
      `invalid --type "${typeArg}". Must be one of: ${FUNCTIONAL_TYPES.join(", ")}`
    )
  }

  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw inputError(worktree.why)
  const root = worktree.path
  const log = stderrLogger()

  let result: PackageAddResult
  try {
    result = runPackageAdd({ add: { path, functionalType: typeArg }, root, log })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    throw operationalError(`package add failed: ${msg}`)
  }

  const commitMessage = `feat(#${seq}): scaffold ${result.name} (${result.path})`
  log.info(`\n[commit] committing everything standing in ${root}…`)
  const committed = commitWorktree(root, commitMessage)
  if (!committed.ok) throw operationalError(committed.why)
  const sha = committed.sha

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: true, name: result.name, path: result.path, functionalType: result.functionalType, sha })}\n`
    )
  } else {
    process.stdout.write(`${result.name} ${result.path} (${result.functionalType})\n`)
    process.stdout.write(`${sha}\n`)
  }
}

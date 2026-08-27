export const summary = "Move and/or rename one workspace package, rewriting every reference"

import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { z } from "zod"
import { stderrLogger } from "../../../infra/workspace-cli/src/lib/package-move/logger.ts"
import { runPackageMove } from "../../../infra/workspace-cli/src/lib/package-move/run.ts"
import type { WorkspaceMove } from "../../../infra/workspace-cli/src/lib/package-move/types.ts"
import { changeBranchWorktree } from "../../lib/branch-worktree.ts"
import { dataError, inputError, isDataError, operationalError } from "../../lib/exit.ts"
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
        "Sequence number of the change branch this runs in — the move and its commit both happen inside that branch's worktree, `~/worktrees/change-<seq>`, and the commit message names the seq. Where `WORKTREE_DIR` is set it names the directory instead.",
    },
    {
      name: "--from",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "Current repo-relative directory path of the package (POSIX forward slashes).",
    },
    {
      name: "--to",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "Target repo-relative directory path of the package (POSIX forward slashes).",
    },
    {
      name: "--name",
      argLabel: "<new-name>",
      valueShape: "token",
      description:
        "New `name` field for the package. If omitted, the existing name from <from>/package.json is preserved.",
    },
    { name: "--json", description: "Emit JSON result instead of human text" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description:
        "Sequence number of the change branch this runs in — the move and its commit both happen inside that branch's worktree, `~/worktrees/change-<seq>`, and the commit message names the seq. Where `WORKTREE_DIR` is set it names the directory instead.",
    },
  ],
  exits: [
    { code: 0, meaning: "move applied and committed" },
    {
      code: 1,
      meaning:
        "input error: bad args, missing package.json, no-op invocation, or --seq names a branch with no worktree on disk",
    },
    { code: 2, meaning: "data error: dirty worktree, package not found" },
    { code: 3, meaning: "operational error: git/bun/subprocess failure during apply or commit" },
  ],
  examples: [
    "ops package move 19450 --from packages/shared/utils --to packages/shared/utils-v2",
    "ops package move --seq 19450 --from packages/shared/utils --to packages/shared/utils-v2",
    "ops package move --seq 19450 --from packages/shared/utils --to packages/shared/utils --name @shared/utility",
    "ops package move --seq 19450 --from packages/shared/utils --to packages/shared/utility --name @shared/utility --json",
  ],
}

function buildCommitMessage(seq: number, move: WorkspaceMove): string {
  const pathChanged = move.old !== move.new
  const nameChanged = move.oldName !== move.newName
  if (pathChanged && nameChanged) {
    return `refactor(#${seq}): move ${move.oldName} (${move.old}) → ${move.newName} (${move.new})`
  }
  if (pathChanged) {
    return `refactor(#${seq}): move ${move.oldName} from ${move.old} to ${move.new}`
  }
  return `refactor(#${seq}): rename ${move.oldName} → ${move.newName}`
}

export default async function packageMove(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const seq = parsed.requireNonNegativeInt("--seq")
  const from = parsed.requireString("--from")
  const to = parsed.requireString("--to")
  const overrideName = parsed.string("--name")
  const json = parsed.boolean("--json")

  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw inputError(worktree.why)
  const root = worktree.path

  const fromAbs = join(root, from)
  const fromPkgJson = join(fromAbs, "package.json")
  if (!existsSync(fromPkgJson)) {
    throw dataError(`package.json not found at ${fromPkgJson}`)
  }

  const packageJsonNameSchema = z.object({ name: z.string().min(1) }).passthrough()

  const pkgRaw = await readFile(fromPkgJson, "utf8")
  let oldName: string
  try {
    const pkg = packageJsonNameSchema.parse(JSON.parse(pkgRaw))
    oldName = pkg.name
  } catch (err) {
    if (isDataError(err)) throw err
    const msg = err instanceof Error ? err.message : String(err)
    throw dataError(`failed to parse ${fromPkgJson}: ${msg}`)
  }

  const newName = overrideName ?? oldName

  if (from === to && oldName === newName) {
    throw inputError(
      "no-op invocation: --from === --to and --name unchanged. Either change the path or pass --name."
    )
  }

  const move: WorkspaceMove = { old: from, new: to, oldName, newName }
  const log = stderrLogger()

  try {
    await runPackageMove({ move, root, log })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    throw operationalError(`package move failed: ${msg}`)
  }

  const commitMessage = buildCommitMessage(seq, move)
  log.info(`\n[commit] committing everything standing in ${root}…`)
  const committed = commitWorktree(root, commitMessage)
  if (!committed.ok) throw operationalError(committed.why)
  const sha = committed.sha

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: true, oldName, newName, oldPath: from, newPath: to, sha })}\n`
    )
  } else {
    process.stdout.write(`${oldName} ${from} -> ${newName} ${to}\n`)
    process.stdout.write(`${sha}\n`)
  }
}

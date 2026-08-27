import { instructionsTreePath } from "../ci-container-dispatcher/container-name.ts"
import { IMAGES } from "../workflow-dsl/images.ts"
import type { StepPlan } from "./create.ts"

export const INSTRUCTIONS_TREE_STEP_NAME = "preparation-instructions-tree"

const DEPENDS_ON = "preparation-provision-ci-toolchain"

const IMAGE = IMAGES.BUN_GIT

const TRANSPORT_HOST = "git-transport.git.svc.cluster.local:3000"

const REPO_PATH = "alan/instructions.git"

const CLONE_TIMEOUT_SECONDS = 120

const INSTALL_TIMEOUT_SECONDS = 600

const COMMIT_MARKER = ".instructions-commit"

export const DEPENDENCIES_PROBE = "tools/lib/instructions-tree/dependencies.ts"

const BUN_CACHE = "/ci-storage/bun-cache"

const BUN_SCRATCH = "/ci-storage/tmp"

function acquireCommands(instructionsCommit: string): readonly string[] {
  const tree = instructionsTreePath(instructionsCommit)
  const clone =
    `timeout ${String(CLONE_TIMEOUT_SECONDS)} git clone --bare --quiet --single-branch ` +
    `--branch main "http://x-access-token:\${GIT_ACCESS_TOKEN}@${TRANSPORT_HOST}/${REPO_PATH}" ` +
    '"$SCRATCH/instructions.git"'
  const install =
    `( cd "$INCOMING" && timeout ${String(INSTALL_TIMEOUT_SECONDS)} bun install --frozen-lockfile ) ` +
    '|| { echo "the instructions tree $COMMIT extracted at $INCOMING, and bun install ' +
    "--frozen-lockfile either refused this commit's bun.lock or did not finish inside " +
    `${String(INSTALL_TIMEOUT_SECONDS)}s, so no code in the tree can be run" >&2; exit 1; }`
  return [
    "set -eu",
    `TREE=${tree}`,
    `COMMIT=${instructionsCommit}`,
    `PROBE=${DEPENDENCIES_PROBE}`,
    'command -v bun >/dev/null 2>&1 || { echo "no bun stands on PATH ($PATH), and an instructions tree is only useful installed, so this step cannot stand one up" >&2; exit 1; }',
    `if [ "$(cat "$TREE/${COMMIT_MARKER}" 2>/dev/null)" = "$COMMIT" ] && bun "$TREE/$PROBE" >/dev/null 2>&1; then`,
    '  echo "instructions tree $COMMIT already stands at $TREE, installed and running"',
    "  exit 0",
    "fi",
    'INCOMING="$TREE.incoming-$$"',
    'STALE="$TREE.stale-$$"',
    'SCRATCH="$(mktemp -d /var/tmp/instructions-tree-XXXXXX)"',
    `trap 'rm -rf "$SCRATCH" "$INCOMING" "$STALE"' EXIT`,
    'rm -rf "$INCOMING"',
    `mkdir -p "$INCOMING" "$(dirname "$TREE")" ${BUN_CACHE} ${BUN_SCRATCH}`,
    clone,
    `git -C "$SCRATCH/instructions.git" cat-file -e "$COMMIT^{commit}" || { echo "the instructions commit $COMMIT this pipeline was created against is not reachable from ${TRANSPORT_HOST}, so the tree it fixes cannot be stood up" >&2; exit 1; }`,
    'git -C "$SCRATCH/instructions.git" archive --format=tar -o "$SCRATCH/instructions.tar" "$COMMIT"',
    'tar -x -f "$SCRATCH/instructions.tar" -C "$INCOMING"',
    install,
    'bun "$INCOMING/$PROBE"',
    `printf '%s\\n' "$COMMIT" > "$INCOMING/${COMMIT_MARKER}"`,
    'mv "$TREE" "$STALE" 2>/dev/null || true',
    'mv "$INCOMING" "$TREE"',
    'echo "instructions tree $COMMIT landed at $TREE, installed and running"',
  ]
}

export function instructionsTreeStep(instructionsCommit: string): StepPlan {
  return {
    title: INSTRUCTIONS_TREE_STEP_NAME,
    dependsOn: [DEPENDS_ON],
    whenConditions: [],
    alwaysRuns: true,
    definition: {
      image: IMAGE,
      environment: { BUN_INSTALL_CACHE_DIR: BUN_CACHE, BUN_TMPDIR: BUN_SCRATCH },
      commands: acquireCommands(instructionsCommit),
    },
  }
}

import { IMAGES } from "@akasha/workflow-language/images"
import { akashaTreePath } from "../ci-container-dispatcher/container-name.ts"
import type { StepPlan } from "./create.ts"

export const AKASHA_TREE_STEP_NAME = "preparation-akasha-tree"

const DEPENDS_ON = "preparation-provision-ci-toolchain"

const IMAGE = IMAGES.BUN_GIT

const TRANSPORT_HOST = "git-transport.git.svc.cluster.local:3000"

const REPO_PATH = "alan/akasha.git"

const BRANCH = "main"

const CLONE_TIMEOUT_SECONDS = 120

const INSTALL_TIMEOUT_SECONDS = 600

const COMMIT_MARKER = ".akasha-commit"

export const COMPILER_PROBE = "akasha/language-design/lua-compiler/tstl-cli/tstl-cli.module.code.ts"

const BUN_CACHE = "/ci-storage/bun-cache"

const BUN_SCRATCH = "/ci-storage/tmp"

function acquireCommands(instructionsCommit: string): readonly string[] {
  const tree = akashaTreePath(instructionsCommit)
  const clone =
    `timeout ${String(CLONE_TIMEOUT_SECONDS)} git clone --bare --quiet --single-branch ` +
    `--branch ${BRANCH} "http://x-access-token:\${GIT_ACCESS_TOKEN}@${TRANSPORT_HOST}/${REPO_PATH}" ` +
    '"$SCRATCH/akasha.git"'
  const install =
    `( cd "$INCOMING" && timeout ${String(INSTALL_TIMEOUT_SECONDS)} bun install --frozen-lockfile ) ` +
    '|| { echo "the akasha tree $COMMIT extracted at $INCOMING, and bun install ' +
    "--frozen-lockfile either refused this commit's bun.lock or did not finish inside " +
    `${String(INSTALL_TIMEOUT_SECONDS)}s, so no code in the tree can be run" >&2; exit 1; }`
  return [
    "set -eu",
    `TREE=${tree}`,
    `PROBE=${COMPILER_PROBE}`,
    'command -v bun >/dev/null 2>&1 || { echo "no bun is on PATH ($PATH), and an akasha tree is only useful installed, so this step cannot stand one up" >&2; exit 1; }',
    'command -v git >/dev/null 2>&1 || { echo "no git is on PATH ($PATH), and the akasha tree is only reachable over git, so this step cannot stand one up" >&2; exit 1; }',
    'SCRATCH="$(mktemp -d /var/tmp/akasha-tree-XXXXXX)"',
    'INCOMING="$TREE.incoming-$$"',
    'STALE="$TREE.stale-$$"',
    `trap 'rm -rf "$SCRATCH" "$INCOMING" "$STALE"' EXIT`,
    clone,
    `COMMIT="$(git -C "$SCRATCH/akasha.git" rev-parse refs/heads/${BRANCH})"`,
    `[ -n "$COMMIT" ] || { echo "${TRANSPORT_HOST}/${REPO_PATH} named no tip for refs/heads/${BRANCH}, so there is no akasha tree to stand up" >&2; exit 1; }`,
    `if [ "$(cat "$TREE/${COMMIT_MARKER}" 2>/dev/null)" = "$COMMIT" ] && [ -f "$TREE/$PROBE" ]; then`,
    '  echo "akasha tree $COMMIT already at $TREE, installed and running"',
    "  exit 0",
    "fi",
    'rm -rf "$INCOMING"',
    `mkdir -p "$INCOMING" "$(dirname "$TREE")" ${BUN_CACHE} ${BUN_SCRATCH}`,
    'git -C "$SCRATCH/akasha.git" archive --format=tar -o "$SCRATCH/akasha.tar" "$COMMIT"',
    'tar -x -f "$SCRATCH/akasha.tar" -C "$INCOMING"',
    install,
    '[ -f "$INCOMING/$PROBE" ] || { echo "the akasha tree $COMMIT holds no $PROBE, so the compiler an addon build runs is not there" >&2; exit 1; }',
    `printf '%s\\n' "$COMMIT" > "$INCOMING/${COMMIT_MARKER}"`,
    'mv "$TREE" "$STALE" 2>/dev/null || true',
    'mv "$INCOMING" "$TREE"',
    'echo "akasha tree $COMMIT landed at $TREE, installed and running"',
  ]
}

export function akashaTreeStep(instructionsCommit: string): StepPlan {
  return {
    title: AKASHA_TREE_STEP_NAME,
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

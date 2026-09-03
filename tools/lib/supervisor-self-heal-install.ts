import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { REPO_ROOT } from "@akasha/seat-system/supervisor-config"

export type SelfHealInstallResult = { ok: true } | { ok: false; stderr: string }
export type SelfHealRunInstall = (version: string) => Promise<SelfHealInstallResult>

const SINGLE_FLIGHT_LOCK_TIMEOUT_S = 600

export const SINGLE_FLIGHT_FLOCK_SH = [
  "set -e",
  "lock=$1",
  "limit=$2",
  "shift 2",
  'exec 9>"$lock"',
  "waited=0",
  "until flock -x -n 9; do",
  '  if [ "$waited" -ge "$limit" ]; then',
  '    echo "waited ${limit}s for the supervisor self-heal install lock $lock and another supervisor holds it still, so the install was not run — this supervisor stays on its current image and retries on the next version change" >&2',
  "    exit 1",
  "  fi",
  "  sleep 1",
  "  waited=$((waited + 1))",
  "done",
  'exec "$@"',
].join("\n")

const VERIFY_WORKSPACE_BINS = `${ownRepoRoot()}/akasha/workspace-paths/workspace-bins-verifying/workspace-bins-verifying.module.code.ts`

export const SINGLE_FLIGHT_INSTALL_SCRIPT = [
  'if [ -e "$1" ]; then exit 0; fi',
  "bun install --frozen-lockfile 1>&2 || exit 1",
  `if ! bun "${VERIFY_WORKSPACE_BINS}" 1>&2; then`,
  "  bun install --frozen-lockfile 1>&2 || exit 1",
  `  bun "${VERIFY_WORKSPACE_BINS}" 1>&2 || exit 1`,
  "fi",
  ': > "$1"',
].join("\n")

function sanitizeVersionForPath(version: string): string {
  const cleaned = version.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 128)
  return cleaned.length > 0 ? cleaned : "unknown"
}

export const defaultRunInstall: SelfHealRunInstall = async (version) => {
  const safe = sanitizeVersionForPath(version)
  const lockPath = `/tmp/supervisor-self-heal-install-${safe}.lock`
  const sentinelPath = `/tmp/supervisor-self-heal-install-${safe}.done`
  const proc = Bun.spawn({
    cmd: [
      "sh",
      "-c",
      SINGLE_FLIGHT_FLOCK_SH,
      "supervisor-self-heal-flock",
      lockPath,
      String(SINGLE_FLIGHT_LOCK_TIMEOUT_S),
      "bash",
      "-c",
      SINGLE_FLIGHT_INSTALL_SCRIPT,
      "bash",
      sentinelPath,
    ],
    cwd: REPO_ROOT,
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stderrText, exitCode] = await Promise.all([new Response(proc.stderr).text(), proc.exited])
  if (exitCode === 0) return { ok: true }
  return { ok: false, stderr: stderrText }
}

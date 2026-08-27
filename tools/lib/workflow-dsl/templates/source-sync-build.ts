import { IMAGES } from "../images.ts"
import type { CIContext, Step } from "../types.ts"
import { selectLivePodCommands } from "./pod-selection.ts"
import { BUILD_SHA_STAMP_FILE } from "./source-sync-build-provenance.ts"

const SOURCE_SYNC_MAX_ATTEMPTS = 4

interface DeploySourceSyncBuildAndRestartConfig {
  name: string
  namespace: string
  deployment: string
  syncContainer?: string
  sha: string | ((ci: CIContext) => string)
  buildPackagePath: string
  buildEnv?: readonly BuildEnvEntry[]
  noDefaultSupabaseEnv?: boolean
  dependsOn?: readonly string[]
}

export type BuildEnvEntry =
  | { readonly name: string; readonly value: string }
  | {
      readonly name: string
      readonly fromSecret: { readonly name: string; readonly key: string }
    }

export function deploySourceSyncBuildAndRestart(
  config: DeploySourceSyncBuildAndRestartConfig
): Step {
  const { name, namespace, deployment, buildPackagePath } = config
  const syncContainer = config.syncContainer ?? "code-sync"
  const effectiveBuildEnv = resolveBuildEnv(namespace, config.buildEnv, config.noDefaultSupabaseEnv)

  const commands = (ci: CIContext): readonly string[] => {
    const sha = typeof config.sha === "function" ? config.sha(ci) : config.sha
    const buildEnvForExec: readonly BuildEnvEntry[] | undefined =
      effectiveBuildEnv == null
        ? effectiveBuildEnv
        : [{ name: "NEXT_PUBLIC_BUILD_SHA", value: sha }, ...effectiveBuildEnv]
    return [
      "set -e",
      `kubectl wait --for=jsonpath='{.status.phase}'=Running pod -n ${namespace} -l app.kubernetes.io/name=${deployment} --timeout=180s`,
      ...selectLivePodCommands({
        fnLabel: "deploySourceSyncBuildAndRestart",
        namespace,
        deployment,
      }),
      'if [ -z "$POD" ]; then',
      `  echo "deploySourceSyncBuildAndRestart: no Running pod found for name=${deployment} in ${namespace}" >&2`,
      "  exit 1",
      "fi",
      `echo "deploySourceSyncBuildAndRestart: target pod $POD (container ${syncContainer}) → ${sha}"`,
      `CURRENT_HEAD=$(kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- sh -c 'cd /app/repo && git rev-parse HEAD' 2>/dev/null || echo "")`,
      `ARTIFACT_PRESENT=$(kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- sh -c 'test -f /app/repo/${buildPackagePath}/build/server/index.js && echo yes || echo no' 2>/dev/null || echo "no")`,
      `STAMP_SHA=$(kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- sh -c 'cat /app/repo/${buildPackagePath}/${BUILD_SHA_STAMP_FILE} 2>/dev/null || echo ""' 2>/dev/null || echo "")`,
      `if [ "$CURRENT_HEAD" = "${sha}" ] && [ "$ARTIFACT_PRESENT" = "yes" ] && [ "$STAMP_SHA" = "${sha}" ]; then`,
      `  echo "deploySourceSyncBuildAndRestart: pod HEAD at ${sha}, build/server/index.js present, and provenance stamp ${BUILD_SHA_STAMP_FILE} matches — skipping fetch/build/restart"`,
      "  exit 0",
      "fi",
      `if [ "$CURRENT_HEAD" = "${sha}" ]; then`,
      `  echo "deploySourceSyncBuildAndRestart: pod HEAD at ${sha} but artifact missing or provenance stamp stale/absent (ARTIFACT_PRESENT=$ARTIFACT_PRESENT STAMP_SHA=$STAMP_SHA), falling through to rebuild"`,
      "fi",
      "sync_attempt=1",
      `sync_max=${SOURCE_SYNC_MAX_ATTEMPTS}`,
      "while :; do",
      "  sync_code=0",
      `  sync_out=$(kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- sh -c 'trap "rm -f /app/repo/.git/index.lock" EXIT INT TERM; cd /app/repo && git fetch origin ${sha} && git reset --hard ${sha}' 2>&1) || sync_code=$?`,
      '  if [ "$sync_code" -eq 0 ]; then',
      "    printf '%s\\n' \"$sync_out\"",
      "    break",
      "  fi",
      "  printf '%s\\n' \"$sync_out\" >&2",
      '  case "$sync_out" in',
      '    *"not our ref"*|*"remote end hung up"*)',
      '      if [ "$sync_attempt" -lt "$sync_max" ]; then',
      '        echo "deploySourceSyncBuildAndRestart: transient fetch advertisement race on attempt $sync_attempt of $sync_max, retrying" >&2',
      "        sync_attempt=$((sync_attempt+1))",
      '        sleep "$((sync_attempt * 3))"',
      "        continue",
      "      fi",
      "      ;;",
      "  esac",
      `  echo "deploySourceSyncBuildAndRestart: SOURCE SYNC FAILED for ${deployment} in ${namespace} — pod remains at HEAD \${CURRENT_HEAD:-unknown} and keeps SERVING THAT STALE CODE, expected ${sha}. Re-run this step to converge." >&2`,
      '  exit "$sync_code"',
      "done",
      `echo "deploySourceSyncBuildAndRestart: source advanced to ${sha}"`,
      `echo "deploySourceSyncBuildAndRestart: running bun install + bun run build in /app/repo/${buildPackagePath}"`,
      ...buildSecretExports(namespace, buildEnvForExec),
      `kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- ${buildExecPrefix(buildEnvForExec)}sh -c 'cd /app/repo/${buildPackagePath} && bun install --frozen-lockfile && bun run build && printf %s "${sha}" > ${BUILD_SHA_STAMP_FILE}'`,
      `echo "deploySourceSyncBuildAndRestart: build complete"`,
      `kubectl rollout restart deployment/${deployment} -n ${namespace}`,
      `kubectl rollout status deployment/${deployment} -n ${namespace} --timeout=180s`,
      `echo "deploySourceSyncBuildAndRestart: pod restarted at ${sha}"`,
    ]
  }

  return {
    name,
    image: IMAGES.CI,
    environment: { HOME: "/tmp" },
    commands,
    backendOptions: {
      kubernetes: {
        serviceAccountName: "pipeline-engine",
        resources: { requests: { cpu: "1500m" } },
      },
    },
    ...(config.dependsOn && { dependsOn: config.dependsOn }),
  }
}

const SHARED_SUPABASE_URL = "https://supabase.alanwalton.com"

const SHARED_ELECTRIC_URL = "https://supabase.alanwalton.com/electric/v1/shape"

function defaultSupabaseBuildEnv(namespace: string): readonly BuildEnvEntry[] {
  return [
    { name: "NEXT_PUBLIC_SUPABASE_URL", value: SHARED_SUPABASE_URL },
    { name: "NEXT_PUBLIC_ELECTRIC_URL", value: SHARED_ELECTRIC_URL },
    {
      name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      fromSecret: {
        name: `${namespace}-secrets`,
        key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      },
    },
  ]
}

function resolveBuildEnv(
  namespace: string,
  buildEnv: readonly BuildEnvEntry[] | undefined,
  noDefaultSupabaseEnv: boolean | undefined
): readonly BuildEnvEntry[] | undefined {
  if (noDefaultSupabaseEnv === true) return buildEnv
  const explicit = buildEnv ?? []
  const explicitNames = new Set(explicit.map((entry) => entry.name))
  const merged = [
    ...defaultSupabaseBuildEnv(namespace).filter((entry) => !explicitNames.has(entry.name)),
    ...explicit,
  ]
  return merged.length === 0 ? undefined : merged
}

function buildSecretExports(
  namespace: string,
  entries: readonly BuildEnvEntry[] | undefined
): readonly string[] {
  if (entries == null) return []
  const out: string[] = []
  for (const entry of entries) {
    if (!("fromSecret" in entry)) continue
    out.push(
      `export ${entry.name}=$(kubectl get secret ${entry.fromSecret.name} -n ${namespace} -o jsonpath='{.data.${entry.fromSecret.key}}' | base64 -d)`
    )
  }
  return out
}

function buildExecPrefix(entries: readonly BuildEnvEntry[] | undefined): string {
  if (entries == null || entries.length === 0) return ""
  const parts: string[] = []
  for (const entry of entries) {
    if ("fromSecret" in entry) {
      parts.push(`${entry.name}="$${entry.name}"`)
    } else {
      parts.push(`${entry.name}=${entry.value}`)
    }
  }
  return `env ${parts.join(" ")} `
}

import { z } from "zod"
import type { CheckConfig } from "./check-configs-types"

export const ROOT_TSCONFIG_PATH = "tsconfig.json"
export const ROOT_MANIFEST_PATH = "package.json"

const RootTsconfigSchema = z
  .object({
    references: z.array(z.object({ path: z.string() }).passthrough()).optional(),
  })
  .passthrough()

export function parseRootReferenceDirs(tsconfigText: string): ReadonlySet<string> {
  const parsed = RootTsconfigSchema.parse(JSON.parse(tsconfigText))
  return new Set(
    (parsed.references ?? []).map((r) => r.path.replace(/^\.\//, "").replace(/\/$/, ""))
  )
}

export const LEAF_SERVICE_FUNCTIONAL_TYPES: ReadonlySet<string> = new Set([
  "service",
  "worker",
  "local-service",
])

export interface LeafPackageEntry {
  readonly name: string
  readonly dir: string
  readonly functionalType: string | null
  readonly inRootReferences: boolean
}

export interface ServiceTypecheckTarget {
  readonly name: string
  readonly dir: string
}

export function selectServiceTypecheckPackages(
  entries: readonly LeafPackageEntry[],
  appTypecheckCovered: ReadonlySet<string>
): readonly ServiceTypecheckTarget[] {
  return entries
    .filter(
      (e) =>
        e.functionalType !== null &&
        LEAF_SERVICE_FUNCTIONAL_TYPES.has(e.functionalType) &&
        !e.inRootReferences &&
        !appTypecheckCovered.has(e.name)
    )
    .map((e) => ({ name: e.name, dir: e.dir }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
}

export function selectRootReferenceExclusions(
  entries: readonly LeafPackageEntry[],
  appTypecheckCovered: ReadonlySet<string>
): readonly ServiceTypecheckTarget[] {
  return entries
    .filter(
      (e) =>
        e.functionalType !== null &&
        LEAF_SERVICE_FUNCTIONAL_TYPES.has(e.functionalType) &&
        e.inRootReferences &&
        !appTypecheckCovered.has(e.name)
    )
    .map((e) => ({ name: e.name, dir: e.dir }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
}

const POPULATION_SCRIPT = "infra/cluster-checks/src/service-typecheck-population.ts"

function populationCommand(
  workspace: string,
  covered: readonly ServiceTypecheckTarget[],
  excluded: readonly ServiceTypecheckTarget[]
): string {
  const dirs = (targets: readonly ServiceTypecheckTarget[]): string =>
    targets.length === 0 ? '""' : targets.map((t) => t.dir).join(",")
  return `cd ${workspace} && bun "$INSTRUCTIONS_ROOT/${POPULATION_SCRIPT}" --covered ${dirs(covered)} --excluded ${dirs(excluded)} || exit 1`
}

function packageCommand(workspace: string, target: ServiceTypecheckTarget): string {
  const label = `${target.dir} (${target.name})`
  const run = `cd ${workspace}/${target.dir} && mkdir -p node_modules && bun run typecheck`
  return `echo '${POPULATION_PREFIX} typechecking ${label}'
{ ${run}; } || { __rc=$?; echo '${POPULATION_PREFIX} FAILED ${label} — the diagnostics above are relative to ${target.dir}' >&2; exit $__rc; }`
}

const POPULATION_PREFIX = "[service-typecheck]"

export function buildServiceTypecheckChecks(
  packages: readonly ServiceTypecheckTarget[],
  rootReferenceExclusions: readonly ServiceTypecheckTarget[] = []
): readonly CheckConfig[] {
  const sorted = [...packages].sort((a, b) => a.dir.localeCompare(b.dir))
  const excluded = [...rootReferenceExclusions].sort((a, b) => a.dir.localeCompare(b.dir))
  return [
    {
      name: "service-typecheck",
      dependsOn: ["app-typecheck"],
      dispatchNodes: [
        ...sorted.map((p) => `package:code:${p.name}`),
        `json-file:code:${ROOT_TSCONFIG_PATH}`,
        `json-file:code:${ROOT_MANIFEST_PATH}`,
        "ts-file:instructions:tools/lib/check-workflow/check-configs-service-typecheck.ts",
        `ts-file:instructions:${POPULATION_SCRIPT}`,
      ],
      environment: {
        NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.invalid",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder-anon-key",
        NEXT_PUBLIC_ELECTRIC_URL: "https://placeholder.invalid/electric/v1/shape",
      },
      backendOptions: {
        kubernetes: {
          resources: { requests: { cpu: "3500m", memory: "1Gi" }, limits: { memory: "4Gi" } },
        },
      },
      commands: (ci) => [
        populationCommand(ci.workspace, sorted, excluded),
        ...sorted.map((p) => packageCommand(ci.workspace, p)),
      ],
    },
  ]
}

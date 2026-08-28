import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { IMAGES } from "../workflow-dsl/images.ts"
import { SECRETS, secret } from "../workflow-dsl/secrets.ts"
import { step } from "../workflow-dsl/step.ts"
import { workflow } from "../workflow-dsl/workflow.ts"
import type { BackendOptions, CIContext, Step, Workflow } from "../workflow-dsl/types.ts"
import { STATIC_CHECKS } from "./check-configs.ts"
import { type CheckConfig } from "./check-configs-types.ts"
import { acyclicityChecks } from "./check-configs-acyclicity.ts"
import { addonChecks } from "./check-configs-addons.ts"
import {
  type AppBuildCandidate,
  buildAppBuildChecks,
  selectAppBuildPackages,
} from "./check-configs-app-build.ts"
import { buildAppTypecheckChecks } from "./check-configs-app-typecheck.ts"
import { ARCHITECTURE_CHECKS } from "./check-configs-architecture.ts"
import {
  buildClientEnvInlinedCheck,
  buildRrServerModuleInClientCheck,
  CAPACITOR_CHECKS,
} from "./check-configs-capacitor.ts"
import { ciMetaChecks } from "./check-configs-ci-meta.ts"
import { buildLcccVendorDriftCheck, CODEGEN_CHECKS } from "./check-configs-codegen.ts"
import { COMPONENT_CHECKS } from "./check-configs-component.ts"
import { K8S_CHECKS } from "./check-configs-k8s.ts"
import { PACKAGE_CHECKS } from "./check-configs-package.ts"
import { RBAC_CHECKS } from "./check-configs-rbac.ts"
import {
  buildServiceTypecheckChecks,
  type LeafPackageEntry,
  parseRootReferenceDirs,
  ROOT_TSCONFIG_PATH,
  selectRootReferenceExclusions,
  selectServiceTypecheckPackages,
} from "./check-configs-service-typecheck.ts"
import { SOURCE_SCANNER_CHECKS } from "./check-configs-source-scanners.ts"
import { TYPESAFETY_CHECKS } from "./check-configs-typesafety.ts"
import { CHECK_WORKFLOW_DISPATCH_NODE_TYPES } from "./check-workflow-watch.ts"
import { readFunctionalType } from "./functional-type.ts"
import { discoverLcccVendorSites } from "./lccc-vendor-sites.ts"
import { discoverRouterApps } from "./router-apps.ts"
import { routedCheckCommand } from "./run-check-routing.ts"
import { loadTestStepInputs } from "./test-step-loader.ts"
import { generateTestSteps, type TestType } from "./test-step-paths.ts"
import { selectUnbuiltRouterApps } from "./unbuilt-router-apps.ts"

const STEP_PREFIX = "check-"

const DEFAULT_CHECK_CPU_REQUEST = "750m"

const DEFAULT_CHECK_MEMORY_LIMIT = "3Gi"

const CPU_REQUEST_BY_TEST_TYPE = {
  unit: "5",
  property: "4",
  component: "4",
} satisfies Record<TestType, string>

function withDefaultCheckResources(options: BackendOptions | undefined): BackendOptions {
  const resources = options?.kubernetes?.resources
  const cpu = resources?.requests?.cpu ?? DEFAULT_CHECK_CPU_REQUEST
  const memoryLimit = resources?.limits?.memory ?? DEFAULT_CHECK_MEMORY_LIMIT
  return {
    ...options,
    kubernetes: {
      ...options?.kubernetes,
      resources: {
        ...resources,
        requests: { ...resources?.requests, cpu },
        limits: { ...resources?.limits, memory: memoryLimit },
      },
    },
  }
}

function makeCheckStep(config: CheckConfig): Step {
  const image = config.image ?? IMAGES.BUN
  const explicitDeps = config.dependsOn?.map((d) => `${STEP_PREFIX}${d}`) ?? []

  const commands = (ci: CIContext): readonly string[] =>
    config.script === undefined
      ? config.commands(ci)
      : [
          routedCheckCommand({
            cwd: ci.workspace,
            script: config.script,
            args: config.args?.(ci),
          }),
        ]

  return step({
    name: `${STEP_PREFIX}${config.name}`,
    image,
    commands,
    script: config.script,
    volumes: config.volumes,
    environment: config.environment,
    backendOptions: withDefaultCheckResources(config.backendOptions),
    dispatchNodes: config.dispatchNodes,
    dispatchNodeTypes: config.dispatchNodeTypes,
    closurePolicy: config.closurePolicy,
    alwaysRun: config.alwaysRun,
    dependsOn: explicitDeps.length === 0 ? undefined : explicitDeps,
  })
}

function testStepInputs(codeRoot: string): ReturnType<typeof loadTestStepInputs> {
  let inputs: ReturnType<typeof loadTestStepInputs>
  try {
    inputs = loadTestStepInputs(codeRoot)
  } catch (err) {
    throw new Error(
      `checkWorkflow: the workspaces under codeRoot ${codeRoot} could not be read (${err instanceof Error ? err.message : String(err)}), so every step computed from that tree would be missing. Point it at a code-repo checkout rather than composing a workflow over nothing.`,
      { cause: err }
    )
  }
  if (inputs.workspaces.length === 0) {
    throw new Error(
      `checkWorkflow: no workspace package stands under codeRoot ${codeRoot}, so every step computed from that tree would be missing. Point it at a code-repo checkout rather than composing a workflow over nothing.`
    )
  }
  return inputs
}

function checkConfigs(codeRoot: string): readonly CheckConfig[] {
  const { workspaces, testsByType, closure, rootToName } = testStepInputs(codeRoot)

  const appBuildCandidates: AppBuildCandidate[] = workspaces.map((ws) => ({
    name: ws.name,
    dir: ws.root,
    hasBuildScript: ws.pkg.scripts?.build !== undefined,
  }))
  const deployableApps = selectAppBuildPackages(appBuildCandidates)
  const deployableAppNames = new Set(deployableApps.map((app) => app.name))

  const rootReferenceDirs = parseRootReferenceDirs(
    readFileSync(resolve(codeRoot, ROOT_TSCONFIG_PATH), "utf-8")
  )
  const leafPackageEntries: LeafPackageEntry[] = workspaces.map((ws) => ({
    name: ws.name,
    dir: ws.root,
    functionalType: readFunctionalType(ws.packageJsonPath).type,
    inRootReferences: rootReferenceDirs.has(ws.root),
  }))

  const routerApps = discoverRouterApps(codeRoot)

  const generatedTestSteps = generateTestSteps({
    testsByType,
    workspaceRoots: workspaces.map((w) => w.root),
    closure,
    rootToName,
  })

  const generatedTestStepConfigs: CheckConfig[] = generatedTestSteps.map(
    (testStep): CheckConfig => ({
      name: testStep.name,
      dispatchNodes: testStep.dispatchNodes,
      backendOptions: {
        kubernetes: {
          resources: {
            requests: { cpu: CPU_REQUEST_BY_TEST_TYPE[testStep.testType], memory: "1Gi" },
            limits: { cpu: "12", memory: "4Gi" },
          },
        },
      },
      dependsOn: ["reverse-reachability-graph"],
      environment: {
        SUPABASE_URL: secret(SECRETS.SUPABASE_URL),
        SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.SUPABASE_SERVICE_ROLE_KEY),
      },
      commands: (ci) => [
        `bash "$AKASHA_ROOT/tools/lib/ci-test-fanout/run-typed-tests.sh" ${ci.workspace} ${testStep.testType} ${ci.inputsHash}`,
      ],
    })
  )

  return [
    ...STATIC_CHECKS,
    ...RBAC_CHECKS,
    ...acyclicityChecks(),
    ...addonChecks(codeRoot),
    ...buildAppBuildChecks(deployableApps),
    ...buildAppTypecheckChecks(deployableApps),
    ...CAPACITOR_CHECKS,
    buildClientEnvInlinedCheck(routerApps),
    buildRrServerModuleInClientCheck(
      selectUnbuiltRouterApps(routerApps, new Set(deployableApps.map((app) => app.dir)))
    ),
    ...buildServiceTypecheckChecks(
      selectServiceTypecheckPackages(leafPackageEntries, deployableAppNames),
      selectRootReferenceExclusions(leafPackageEntries, deployableAppNames)
    ),
    ...ARCHITECTURE_CHECKS,
    ...ciMetaChecks(codeRoot),
    ...CODEGEN_CHECKS,
    ...COMPONENT_CHECKS,
    buildLcccVendorDriftCheck(discoverLcccVendorSites(codeRoot)),
    ...K8S_CHECKS,
    ...PACKAGE_CHECKS,
    ...SOURCE_SCANNER_CHECKS,
    ...TYPESAFETY_CHECKS,
    ...generatedTestStepConfigs,
  ]
}

export function checkWorkflow(codeRoot: string): Workflow {
  return workflow("check", {
    kind: "checks",
    dependsOn: ["preparation"],
    when: { event: "push", branch: "!main" },
    alwaysRun: true,
    dispatchNodeTypes: CHECK_WORKFLOW_DISPATCH_NODE_TYPES,
    steps: checkConfigs(codeRoot).map(makeCheckStep),
  })
}

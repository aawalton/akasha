import type { PopulationEntry } from "../graph/queries/membership.ts"
import { IMAGES } from "../workflow-dsl/images"
import { SECRETS, secret } from "../workflow-dsl/secrets"
import { GRAPH_ARTIFACT_CHECKS } from "./check-configs-graph.ts"
import { REPO_PATH_CHECKS } from "./check-configs-repo-paths.ts"
import { SHELL_CHECKS } from "./check-configs-shell.ts"
import { TYPECHECK_CHECKS } from "./check-configs-typecheck.ts"
import { type CheckConfig, treeShaArgs, WORKFLOW_SURFACE_POPULATION } from "./check-configs-types.ts"
import { WIDGET_MIRROR_CHECKS } from "./check-configs-widget.ts"


const TS_POPULATION: readonly PopulationEntry[] = ["ts-file", "tsx-file"]
const YAML_POPULATION: readonly PopulationEntry[] = ["yaml-file", "yml-file"]
const PACKAGE_POPULATION: readonly PopulationEntry[] = ["package"]

export const STATIC_CHECKS: CheckConfig[] = [
  ...SHELL_CHECKS,
  {
    name: "bin-mode",
    dispatchNodeTypes: PACKAGE_POPULATION,
    script: "infra/cluster-checks/src/checks/check-bin-mode.ts",
  },
  {
    name: "healthkit-read-only",
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-healthkit-read-only.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/healthkit-read-only-violations.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-healthkit-read-only.ts",
  },
  {
    name: "app-intent-brand-words",
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-app-intent-brand-words.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/app-intent-brand-word-violations.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/alanwalton-ios-seam.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/swift-masked-source.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-app-intent-brand-words.ts",
  },
  {
    name: "health-samples-stream",
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-health-samples-stream.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/health-samples-stream-violations.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/alanwalton-ios-seam.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-health-samples-stream.ts",
  },
  ...WIDGET_MIRROR_CHECKS,
  {
    name: "eso-live-dir-candidate-order",
    dispatchNodeTypes: ["rust-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/eso-live-dir-candidate-order.ts",
      "json-file:code:temper/shared-foundation-misc-eso-paths/package.json",
      "ts-file:code:temper/shared-foundation-misc-eso-paths/src/index.ts",
      "ts-file:code:temper/shared-foundation-misc-eso-paths/src/eso-paths.ts",
      "rust-file:code:packages/temper/watcher-tray/src/tray.rs",
    ],
    script: "infra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts",
  },
  ...TYPECHECK_CHECKS,
  {
    name: "image-tags",
    dispatchNodeTypes: [...YAML_POPULATION, "dockerfile-file", "workflow"],
    dispatchNodes: ["ts-file:instructions:tools/lib/workflow-dsl/images.ts"],
    script: "infra/cluster-checks/src/checks/check-image-tags.ts",
    args: treeShaArgs,
  },
  {
    name: "service-dockerfiles-gitignored",
    alwaysRun: true,
    dispatchNodeTypes: [...PACKAGE_POPULATION, "json-file", "dockerfile-file"],
    dispatchNodes: [
      "ts-file:code:packages/infra/scripts/src/generate-dockerfiles-registry.ts",
      "ts-file:code:packages/infra/scripts/src/generate-dockerfiles-tool.ts",
      "ts-file:code:packages/infra/scripts/src/generate-dockerfiles-types.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-service-dockerfiles-gitignored.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-service-dockerfiles-gitignored.ts",
  },
  {
    name: "memory-qos",
    dispatchNodeTypes: [...YAML_POPULATION, "workflow"],
    script: "infra/cluster-checks/src/checks/check-memory-qos.ts",
    args: treeShaArgs,
  },
  {
    name: "image-tools",
    closurePolicy: "import-graph",
    dispatchNodeTypes: ["workflow", WORKFLOW_SURFACE_POPULATION],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-image-tools.ts",
      "ts-file:instructions:tools/lib/check-workflow/shell-command-binaries.ts",
      "ts-file:instructions:tools/lib/workflow-dsl/images.ts",
    ],
    script: "tools/commands/check-image-tools.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
  {
    name: "sops-manifests",
    dispatchNodeTypes: YAML_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-sops-manifests.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/sops-manifest.ts",
    ],
    environment: {
      SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
    },
    script: "infra/cluster-checks/src/checks/check-sops-manifests.ts",
    args: treeShaArgs,
  },
  {
    name: "tailwind-sources",
    dispatchNodeTypes: ["css-file", ...PACKAGE_POPULATION],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-tailwind-sources.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/tailwind-sources-violations.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tailwind-sources.ts",
    args: treeShaArgs,
  },
  {
    name: "vite-supabase-rr-define",
    dispatchNodeTypes: [...PACKAGE_POPULATION],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-vite-supabase-rr-define.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-vite-supabase-rr-define.ts",
  },
  ...REPO_PATH_CHECKS,
  {
    name: "yaml-usage",
    alwaysRun: true,
    dispatchNodeTypes: [...YAML_POPULATION],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-yaml-usage.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/yaml-usage.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-yaml-usage.ts",
    args: treeShaArgs,
    backendOptions: {
      kubernetes: {
        resources: { requests: { memory: "1Gi" }, limits: { memory: "2Gi" } },
      },
    },
  },
  {
    name: "test-step-paths",
    dispatchNodeTypes: [...TS_POPULATION, ...PACKAGE_POPULATION],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks.workflow.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-test-step-paths.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/test-step-paths.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/test-step-loader.ts",
      "ts-file:instructions:tools/lib/ci-test-fanout/list-typed-workspaces.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-test-step-paths.ts",
  },
  ...GRAPH_ARTIFACT_CHECKS,
]

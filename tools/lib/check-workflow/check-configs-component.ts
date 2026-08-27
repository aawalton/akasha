import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const COMPONENT_CHECKS: CheckConfig[] = [
  {
    name: "no-hardcoded-surface",
    dispatchNodeTypes: ["ts-file", "tsx-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-no-hardcoded-surface.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/surface-literal-sites.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/jsx-surface-tokens.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-no-hardcoded-surface.ts",
    args: treeShaArgs,
  },
  {
    name: "color-literals",
    dispatchNodeTypes: ["ts-file", "tsx-file", "css-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-color-literals.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/color-literal-scan.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-color-literals.ts",
  },
  {
    name: "instruction-references",
    dispatchNodeTypes: [
      "ts-file",
      "tsx-file",
      "js-file",
      "jsx-file",
      "css-file",
      "json-file",
      "yaml-file",
      "yml-file",
      "toml-file",
      "sh-file",
      "sql-file",
      "md-file",
      "txt-file",
      "swift-file",
      "lua-file",
      "rust-file",
      "dockerfile-file",
      "systemd-unit-file",
    ],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-instruction-references.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/instruction-reference-scan.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-instruction-references.ts",
  },
  {
    name: "design-tokens",
    dispatchNodeTypes: [{ kind: "ts-file", under: "shared/design-tokens" }],
    dispatchNodes: [
      "css-file:code:packages/shared/design/system/src/styles/tokens.css",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-design-tokens.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/design-token-parity.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/oklch-to-srgb.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-design-tokens.ts",
  },
  {
    name: "spacing-scale",
    dispatchNodeTypes: ["swift-file", "sh-file"],
    dispatchNodes: [
      "css-file:code:packages/shared/design/system/src/styles/tokens.css",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-spacing-scale.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/spacing-scale.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/widget-sites.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-spacing-scale.ts",
  },
]

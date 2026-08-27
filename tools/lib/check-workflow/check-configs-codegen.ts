import type { NodeId } from "../graph/types.ts"
import type { CheckConfig } from "./check-configs-types"
import type { LcccVendorSites } from "./lccc-vendor-sites.ts"

const LCCC_VENDOR_DRIFT_INPUTS: readonly NodeId[] = [
  "ts-file:instructions:infra/cluster-checks/src/checks/check-lccc-vendor-drift.ts",
  "ts-file:instructions:infra/cluster-checks/src/lib/lccc-vendor-drift.ts",
  "ts-file:instructions:infra/cluster-checks/src/lib/lccc-vendor-sites.ts",
]

export function buildLcccVendorDriftCheck(sites: LcccVendorSites): CheckConfig {
  return {
    name: "lccc-vendor-drift",
    dispatchNodeTypes: [sites.referenceDir, ...sites.mirrorDirs].map((dir) => ({
      kind: "ts-file" as const,
      under: dir,
    })),
    dispatchNodes: LCCC_VENDOR_DRIFT_INPUTS,
    script: "infra/cluster-checks/src/checks/check-lccc-vendor-drift.ts",
  }
}

export const CODEGEN_CHECKS: CheckConfig[] = [
  {
    name: "codegen-type-identity-drift",
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/codegen-type-identity-drift.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/codegen-type-identity-pairs.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/rule-types.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/skill-line-categories.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-character-role.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-activation-buff.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-armor-slot.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-jewelry-slot.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-role.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-skill-slot.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-trait.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-weapon-role.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-companion-weapon-slot.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-comparison-op.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-rotation-breakdown-row.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-skill-bars.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-skill-point.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-skill-slot.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-skill-type.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-special-effect-type.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-status-effect-type.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-target-scope.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-target-type.ts",
      "ts-file:instructions:tools/lib/temper-addon-data/generators/temper-weapon-bar.ts",
      "ts-file:code:packages/temper/game/characters/character/src/generated/temper-character-role.generated.ts",
      "ts-file:code:packages/temper/game/characters/equipment/src/weapons/generated/temper-weapon-bar.generated.ts",
      "ts-file:code:packages/temper/game/characters/skill-lines/src/generated/temper-skill-line-category.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-skill-bars.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-skill-slot.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-skill-type.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-special-effect-type.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-status-effect-type.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-target-scope.generated.ts",
      "ts-file:code:packages/temper/game/characters/skills/src/generated/temper-target-type.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-activation-buff.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-armor-slot.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-jewelry-slot.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-role.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-skill-slot.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-trait.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-weapon-role.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-companion-weapon-slot.generated.ts",
      "ts-file:code:packages/temper/game/companions/core/src/generated/temper-rotation-breakdown-row.generated.ts",
      "ts-file:code:packages/temper/game/items/addon/src/generated/rule-types.generated.ts",
      "ts-file:code:packages/temper/game/items/rules/core/src/buy-rule-types.ts",
      "ts-file:code:packages/temper/game/items/rules/core/src/generated/temper-comparison-op.generated.ts",
      "ts-file:code:packages/temper/game/items/rules/core/src/inventory-rule-compiler-types.ts",
      "ts-file:code:packages/temper/game/items/rules/core/src/inventory-rule-types.ts",
      "ts-file:code:packages/temper/player/completion/addon/src/skill-point-data.ts",
      "ts-file:code:packages/temper/player/completion/src/generated/temper-skill-point.generated.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts",
  },
]

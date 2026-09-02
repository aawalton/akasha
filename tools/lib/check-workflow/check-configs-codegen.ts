import type { NodeId } from "../graph/types.ts"
import type { CheckConfig } from "./check-configs-types"
import type { LcccVendorSites } from "./lccc-vendor-sites.ts"

const LCCC_VENDOR_DRIFT_INPUTS: readonly NodeId[] = [
  "ts-file:instructions:infra/cluster-checks/src/checks/check-lccc-vendor-drift.ts",
  "ts-file:instructions:infra/cluster-checks/src/lib/lccc-vendor-drift.ts",
  "ts-file:instructions:tools/lib/check-workflow/lccc-vendor-sites.ts",
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
      "ts-file:instructions:akasha/temper/temper-addon-generators/rule-types/rule-types.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/skill-line-categories/skill-line-categories.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-character-role/temper-character-role.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-activation-buff/temper-companion-activation-buff.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-armor-slot/temper-companion-armor-slot.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-jewelry-slot/temper-companion-jewelry-slot.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-role/temper-companion-role.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-skill-slot/temper-companion-skill-slot.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-trait/temper-companion-trait.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-weapon-role/temper-companion-weapon-role.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-companion-weapon-slot/temper-companion-weapon-slot.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-comparison-op/temper-comparison-op.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-rotation-breakdown-row/temper-rotation-breakdown-row.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-skill-bars/temper-skill-bars.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-skill-point/temper-skill-point.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-skill-slot/temper-skill-slot.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-skill-type/temper-skill-type.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-special-effect-type/temper-special-effect-type.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-status-effect-type/temper-status-effect-type.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-target-scope/temper-target-scope.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-target-type/temper-target-type.module.code.ts",
      "ts-file:instructions:akasha/temper/temper-addon-generators/temper-weapon-bar/temper-weapon-bar.module.code.ts",
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
      "ts-file:code:temper/game-items-addon/src/generated/rule-types.generated.ts",
      "ts-file:code:temper/game-items-rules-core/src/buy-rule-types.ts",
      "ts-file:code:temper/game-items-rules-core/src/generated/temper-comparison-op.generated.ts",
      "ts-file:code:temper/game-items-rules-core/src/inventory-rule-compiler-types.ts",
      "ts-file:code:temper/game-items-rules-core/src/inventory-rule-types.ts",
      "ts-file:code:temper/player-completion-addon/src/skill-point-data.ts",
      "ts-file:code:temper/player-completion/src/generated/temper-skill-point.generated.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-codegen-type-identity-drift.ts",
  },
]

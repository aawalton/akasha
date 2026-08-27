/**
 * Temper Target Scopes (Generated)
 *
 * Four target-scope kinds — single, cone, area, line — sourced from the
 * universal pages table (page type: temper-target-scope).
 *
 * Each entry's `id` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * `TEMPER_TARGET_SCOPES["single"]` is well-typed and feeds the
 * `targetScopes` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { TargetScopeTemplate } from "../target-scope-data"

export const TEMPER_TARGET_SCOPES = {
  "single": { id: "single", name: "Single" },
  "cone": { id: "cone", name: "Cone" },
  "area": { id: "area", name: "Area" },
  "line": { id: "line", name: "Line" },
} as const satisfies Record<string, TargetScopeTemplate>

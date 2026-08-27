export type TestedByAttrs = Record<string, never>

export type TestedByEdgeType = "tested-by"

export const TESTED_BY_EDGE_TYPE: TestedByEdgeType = "tested-by"

export const TEST_FILE_ENDINGS = [".test.ts", ".test.tsx"] as const

export const isTestFilePath = (repoRel: string): boolean =>
  TEST_FILE_ENDINGS.some((ending) => repoRel.endsWith(ending))

export const COMPILE_TIME_ASSERTION_MODULE =
  "packages/temper/shared/capture/host/src/assert-schema-matches-payload.ts"

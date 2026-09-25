import type { TemperBuildVersion } from "akasha/temper/player/character/temper-build-version/temper-build-version.page-type.types.ts"

export const beforeTanking = {
  id: "7057161f-8ce4-4eea-b34b-245379fde52d",
  type: "page-type/temper-build-version",
  slug: "before-tanking",
  title: "Before tanking",
  description: "",
  accountPage: "temper-account/alanarre",
  build: "dbc0e9b5-8b21-4f2f-8357-6e38ad6099c5",
  versionNumber: 1790309607102,
  buildHash: "AjEIFzHMcxzHMcxzExMTAzGzAAAAAAN4",
  isCheckpoint: true,
  checkpointName: "Before tanking",
  targetCount: 1,
  baseRoles: ["tank"],
} as const satisfies TemperBuildVersion

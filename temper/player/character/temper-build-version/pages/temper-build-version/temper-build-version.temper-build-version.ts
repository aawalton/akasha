import type { TemperBuildVersion } from "akasha/temper/player/character/temper-build-version/temper-build-version.page-type.types.ts"

export const temperBuildVersion = {
  id: "24006be2-cacf-45b6-8937-f2135e878695",
  type: "page-type/temper-build-version",
  slug: "temper-build-version",
  title: "",
  description: "",
  accountPage: "temper-account/alanarre",
  build: "e905df53-f68a-49b5-8514-2bf34dce7da3",
  versionNumber: 1790308251338,
  buildHash: "AjEIUxDEMQxDEMQxERERGRARAAAAAAXI",
  isCheckpoint: "true",
  checkpointName: "Test checkpoint",
  targetCount: 1,
  baseRoles: ["healer"],
} as const satisfies TemperBuildVersion

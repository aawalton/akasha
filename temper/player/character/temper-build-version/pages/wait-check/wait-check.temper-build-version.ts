import type { TemperBuildVersion } from "akasha/temper/player/character/temper-build-version/temper-build-version.page-type.types.ts"

export const waitCheck = {
  id: "01a0d703-9edc-742f-b925-a64ec5762359",
  type: "page-type/temper-build-version",
  slug: "wait-check",
  title: "Wait check",
  description: "",
  accountPage: "temper-account/alanarre",
  build: "01a0d703-291f-7706-a22e-1f84790ecaf2",
  versionNumber: 1790313733852,
  buildHash: "AjEIZDEMQxDEMQxDAwMDCDAjAAAAAAK4",
  isCheckpoint: true,
  checkpointName: "Wait check",
  targetCount: 1,
  baseRoles: ["dps"],
} as const satisfies TemperBuildVersion

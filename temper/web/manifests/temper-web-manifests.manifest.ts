import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const temperWebManifests = {
  id: "01a07384-ba71-7e7e-83f4-b7564fa65954",
  type: "page-type/manifest",
  slug: "temper-web-manifests",
  definition: "the deployment and service serving the parts of Temper that run in a browser",
  code: "ts",
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
} as const satisfies Manifest

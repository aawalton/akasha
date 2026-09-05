import type { Manifest } from "@akasha/k8s-types/manifest"

export const temperWebManifests = {
  id: "01a07384-ba71-7e7e-83f4-b7564fa65954",
  pageTypeSlug: "manifest",
  slug: "temper-web-manifests",
  definition: "the deployment and service serving the parts of Temper that run in a browser",
  code: "ts",
} as const satisfies Manifest

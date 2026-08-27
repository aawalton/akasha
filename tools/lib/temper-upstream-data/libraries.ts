export const UPSTREAM_LIBRARIES = ["housing", "lib-map-data", "lib-treasure", "lib-zone"] as const

export type UpstreamLibrary = (typeof UPSTREAM_LIBRARIES)[number]

export const PACKAGE_OF: Record<UpstreamLibrary, string> = {
  housing: "packages/temper/game/housing/addon",
  "lib-map-data": "packages/temper/shared/addon-libraries/lib-map-data",
  "lib-treasure": "packages/temper/shared/addon-libraries/lib-treasure",
  "lib-zone": "packages/temper/shared/addon-libraries/lib-zone",
}

export class PortMismatch extends Error {}

export interface Porter {
  readonly port: (codeRoot: string) => Promise<void>
}

export interface Verifier {
  readonly verify: (codeRoot: string) => Promise<void>
}

export async function porterFor(library: UpstreamLibrary): Promise<Porter> {
  switch (library) {
    case "housing":
      return await import("./housing/port.ts")
    case "lib-map-data":
      return await import("./lib-map-data/port.ts")
    case "lib-treasure":
      return await import("./lib-treasure/port.ts")
    case "lib-zone":
      return await import("./lib-zone/port.ts")
  }
}

export async function verifierFor(library: UpstreamLibrary): Promise<Verifier> {
  switch (library) {
    case "housing":
      return await import("./housing/verify.ts")
    case "lib-map-data":
      return await import("./lib-map-data/verify.ts")
    case "lib-treasure":
      return await import("./lib-treasure/verify.ts")
    case "lib-zone":
      return await import("./lib-zone/verify.ts")
  }
}

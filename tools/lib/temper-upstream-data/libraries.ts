export const UPSTREAM_LIBRARIES = ["housing", "lib-map-data", "lib-treasure", "lib-zone"] as const

export type UpstreamLibrary = (typeof UPSTREAM_LIBRARIES)[number]

export const PACKAGE_OF: Record<UpstreamLibrary, string> = {
  housing: "temper/game-housing-addon",
  "lib-map-data": "temper/shared-addon-libraries-lib-map-data",
  "lib-treasure": "temper/shared-addon-libraries-lib-treasure",
  "lib-zone": "temper/shared-addon-libraries-lib-zone",
}

export interface Porter {
  readonly port: (codeRoot: string) => Promise<void>
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

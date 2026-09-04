interface TemperCatalogConfigGlobal {
  readonly version: number
  readonly invalidateVersion: number
  readonly invalidateDomains?: readonly string[]
}

declare var TemperCatalogConfig: TemperCatalogConfigGlobal | undefined

import type { DomainKey } from "../domain-keys/domain-keys.module.code.ts"

export interface CatalogDomainEntry {
  readonly key: DomainKey
  readonly collect: (this: void, onComplete: (this: void) => void) => void
}

const REGISTRY: CatalogDomainEntry[] = []

export function registerCatalogDomain(this: void, entry: CatalogDomainEntry): undefined {
  REGISTRY[REGISTRY.length] = entry
}

export function getCatalogDomains(this: void): readonly CatalogDomainEntry[] {
  return REGISTRY
}

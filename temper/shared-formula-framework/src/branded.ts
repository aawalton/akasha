export type BuildHash = string & { readonly __brand: "BuildHash" }

export function BuildHash(hash: string): BuildHash {
  return hash as BuildHash
}

export type BuildId = string & { readonly __brand: "BuildId" }

export function BuildId(id: string): BuildId {
  return id as BuildId
}

export type EsoCharacterId = string & { readonly __brand: "EsoCharacterId" }

export function EsoCharacterId(id: string): EsoCharacterId {
  return id as EsoCharacterId
}

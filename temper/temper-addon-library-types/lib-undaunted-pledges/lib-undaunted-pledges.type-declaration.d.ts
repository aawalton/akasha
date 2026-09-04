interface LibUndauntedPledgesApi {
  IsPledge: (zoneId: number, dayOffset: number, server: string | undefined) => boolean
}

declare const LibUndauntedPledges: LibUndauntedPledgesApi | undefined

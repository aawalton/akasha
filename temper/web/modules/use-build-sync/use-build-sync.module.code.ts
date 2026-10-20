"use client"

import { useSingleFlight } from "akasha/design/interface/primitive/modules/use-single-flight/use-single-flight.module.code.ts"
import { useEffect, useRef } from "react"

export class StaleBuildRefused extends Error {
  readonly pageTypeSlug: string

  constructor(pageTypeSlug: string) {
    super(
      `${pageTypeSlug}: the server's build is no longer the one this save was made over, so the save is refused`
    )
    this.name = "StaleBuildRefused"
    this.pageTypeSlug = pageTypeSlug
  }
}

interface UseBuildSyncOptions<TBuild, TAction, TMeta> {
  localBuild: TBuild
  zeroBuildHash: string | null
  zeroBuildMetadata: TMeta | null
  updateRemote: (hash: string, metadata: TMeta, replacing: string) => Promise<void>
  dispatch: React.Dispatch<TAction>
  createResetAction: (payload: TBuild) => TAction
  initialBuildHash: string
  encode: (build: TBuild) => string
  decode: (hash: string, metadata: TMeta) => TBuild
  extractMetadata: (build: TBuild) => TMeta
}

export function useBuildSync<TBuild, TAction, TMeta>({
  localBuild,
  zeroBuildHash,
  zeroBuildMetadata,
  updateRemote,
  dispatch,
  createResetAction,
  initialBuildHash,
  encode,
  decode,
  extractMetadata,
}: UseBuildSyncOptions<TBuild, TAction, TMeta>) {
  const hasReceivedRemoteData = useRef(false)
  const lastSyncedHashRef = useRef<string>(initialBuildHash)
  const seenBuildRef = useRef<TBuild>(localBuild)
  const resetBuildRef = useRef<TBuild | null>(null)
  const serverHashRef = useRef<string>(initialBuildHash)
  const singleFlightUpdate = useSingleFlight(updateRemote)

  useEffect(() => {
    if (zeroBuildHash == null || !zeroBuildMetadata) return

    const servedBefore = serverHashRef.current
    serverHashRef.current = zeroBuildHash

    if (!hasReceivedRemoteData.current) {
      hasReceivedRemoteData.current = true
      if (zeroBuildHash === initialBuildHash) return
    } else if (zeroBuildHash === servedBefore || zeroBuildHash === lastSyncedHashRef.current) {
      return
    }

    const decoded = decode(zeroBuildHash, zeroBuildMetadata)
    resetBuildRef.current = decoded
    dispatch(createResetAction(decoded))
    lastSyncedHashRef.current = encode(decoded)
  }, [
    zeroBuildHash,
    zeroBuildMetadata,
    initialBuildHash,
    dispatch,
    createResetAction,
    decode,
    encode,
  ])

  useEffect(() => {
    if (!hasReceivedRemoteData.current) {
      return
    }

    if (localBuild === seenBuildRef.current) {
      return
    }
    seenBuildRef.current = localBuild

    if (localBuild === resetBuildRef.current) {
      return
    }

    const currentHash = encode(localBuild)

    if (currentHash === lastSyncedHashRef.current) {
      return
    }

    lastSyncedHashRef.current = currentHash
    const metadata = extractMetadata(localBuild)
    singleFlightUpdate(currentHash, metadata, serverHashRef.current).catch((cause: unknown) => {
      if (cause instanceof StaleBuildRefused) {
        console.warn(`[use-build-sync] ${cause.message}; the server's build is shown instead`)
        return
      }
      console.error("[use-build-sync] saving the build failed:", cause)
    })
  }, [localBuild, singleFlightUpdate, encode, extractMetadata])
}

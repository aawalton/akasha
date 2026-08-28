"use client"

import { Button } from "@shared/design-primitives/components/button"
import { SurfaceProvider, useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { isRecord } from "@shared/utils-narrow/is-record"
import { useCallback, useState } from "react"
import { type CliLinkFailure, describeCliLinkFailure } from "./cli-link-failure"

interface CliLinkContentProps {
  port: number
  state: string
  userEmail: string
}

type MintResponse = {
  access_token?: string
  refresh_token?: string
  expires_in?: number
  error?: string
}

function readMintResponse(value: unknown): MintResponse {
  if (!isRecord(value)) return {}
  const out: MintResponse = {}
  if (typeof value.access_token === "string") out.access_token = value.access_token
  if (typeof value.refresh_token === "string") out.refresh_token = value.refresh_token
  if (typeof value.expires_in === "number") out.expires_in = value.expires_in
  if (typeof value.error === "string") out.error = value.error
  return out
}

export function CliLinkContent({ port, state, userEmail }: CliLinkContentProps) {
  const surface = useSurface()
  const [status, setStatus] = useState<"idle" | "linking" | "success">("idle")
  const [failure, setFailure] = useState<CliLinkFailure | null>(null)

  const handleLink = useCallback(async () => {
    setStatus("linking")
    setFailure(null)

    const fail = (next: CliLinkFailure) => {
      setFailure(next)
      setStatus("idle")
    }

    let response: Response
    try {
      response = await fetch("/api/cli-link/mint", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ port, state }),
      })
    } catch {
      fail({ kind: "unreachable" })
      return
    }

    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      fail({ kind: "unreadable-response", status: response.status })
      return
    }

    const data = readMintResponse(payload)
    if (!response.ok) {
      fail(
        data.error != null
          ? { kind: "rejected", serverError: data.error }
          : { kind: "no-session", status: response.status }
      )
      return
    }
    if (data.access_token == null || data.refresh_token == null) {
      fail({ kind: "no-session", status: response.status })
      return
    }

    const callbackUrl =
      `http://localhost:${port}/callback` +
      `?access_token=${encodeURIComponent(data.access_token)}` +
      `&refresh_token=${encodeURIComponent(data.refresh_token)}` +
      `&state=${encodeURIComponent(state)}`
    setStatus("success")
    window.location.href = callbackUrl
  }, [port, state])

  return (
    <SurfaceProvider level={0}>
      <div className="flex min-h-screen items-center justify-center">
        <div className={cn("w-full max-w-sm space-y-6 rounded-lg p-6", surfaceClass(1))}>
          <div className="space-y-1">
            <h1 className="font-semibold text-lg text-primary">
              Link this computer to your Temper account?
            </h1>
            <p className="text-secondary text-sm">
              The Temper CLI on this computer is requesting a session linked to your account.
            </p>
          </div>

          <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
            <p className="text-tertiary text-xs">Signed in as</p>
            <p className="font-medium text-primary text-sm">{userEmail}</p>
          </div>

          {}
          {status === "success" ? (
            <p className="text-tertiary text-xs">
              Session sent to the Watcher. It will send you back to Temper, where the Watcher page
              reports what has actually reached us — linking on its own moves no game data.
            </p>
          ) : (
            <p className="text-tertiary text-xs">
              Confirming will mint a fresh Supabase session and send it to the CLI listener on{" "}
              <code>localhost:{port}</code>. You can revoke the session at any time by signing out.
            </p>
          )}

          <div className="space-y-4">
            {failure !== null && (
              <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
                <p className="text-orange text-xs">{describeCliLinkFailure(failure)}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleLink}
                disabled={status === "linking" || status === "success"}
              >
                {status === "linking" ? "Linking..." : status === "success" ? "Linked" : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SurfaceProvider>
  )
}

"use client"

import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { Input } from "@shared/design-primitives/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { SupabaseUser } from "@shared/supabase-rr/auth/server"
import type { ProfileMetadata } from "@temper/game-characters/build-metadata"
import { useCraftBagAccess } from "@temper/player-inventory-management-ui/hooks-inventory-settings"
import { usePlayer } from "@temper/player-profile/use-player"
import { useCallback, useEffect, useState } from "react"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"
import {
  type CraftBagAccessValue,
  fromCraftBagAccessValue,
  toCraftBagAccessValue,
} from "./craft-bag-access-select"

const HANDLE_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/

function validateHandle(value: string): string | null {
  if (value.length < 3) return "Must be at least 3 characters"
  if (value.length > 20) return "Must be 20 characters or fewer"
  if (!HANDLE_REGEX.test(value))
    return "Letters, numbers, and hyphens only (no leading/trailing hyphens)"
  return null
}

interface AccountTabProps {
  active: boolean
  user: SupabaseUser
}

export function AccountTab({ active, user }: AccountTabProps) {
  const surface = useSurface()
  const { handle, setHandle, profileMetadata, updateProfileMeta } = usePlayer()
  const { craftBagAccess, updateCraftBagAccess } = useCraftBagAccess()
  const [draftHandle, setDraftHandle] = useState(handle ?? "")
  const [handleError, setHandleError] = useState<string | null>(null)

  useEffect(() => {
    setDraftHandle(handle ?? "")
  }, [handle])

  const saveHandle = useCallback(async () => {
    const trimmed = draftHandle.trim()
    if (trimmed === (handle ?? "")) return

    if (trimmed === "") {
      setHandleError(null)
      try {
        await setHandle(null)
      } catch {
        setHandleError("Failed to clear handle")
      }
      return
    }

    const error = validateHandle(trimmed)
    if (error != null) {
      setHandleError(error)
      return
    }

    setHandleError(null)
    try {
      await setHandle(trimmed)
    } catch {
      setHandleError("Couldn't save your handle. Try again.")
    }
  }, [draftHandle, handle, setHandle])

  if (!active) return null

  return (
    <ResponsiveColumns>
      <InputPanelCard id="account" title="Account">
        <InputPanelCard.Row label="Platform">
          <Select<NonNullable<ProfileMetadata["platform"]> | "no-platform">
            value={profileMetadata.platform ?? "no-platform"}
            onValueChange={(value) =>
              updateProfileMeta({ platform: value === "no-platform" ? undefined : value })
            }
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent nullSentinel={{ value: "no-platform", label: "Select..." }}>
              <SelectItem<NonNullable<ProfileMetadata["platform"]>> value="PC">PC/Mac</SelectItem>
              <SelectItem<NonNullable<ProfileMetadata["platform"]>> value="Xbox">Xbox</SelectItem>
              <SelectItem<NonNullable<ProfileMetadata["platform"]>> value="PlayStation">
                PlayStation
              </SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
        <InputPanelCard.Row label="Server">
          <Select<NonNullable<ProfileMetadata["server"]> | "no-server">
            value={profileMetadata.server ?? "no-server"}
            onValueChange={(value) =>
              updateProfileMeta({ server: value === "no-server" ? undefined : value })
            }
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent nullSentinel={{ value: "no-server", label: "Select..." }}>
              <SelectItem<NonNullable<ProfileMetadata["server"]>> value="NA">NA</SelectItem>
              <SelectItem<NonNullable<ProfileMetadata["server"]>> value="EU">EU</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
        <InputPanelCard.Row label="Email">
          {}
          <span className="min-w-0 max-w-[240px] select-text break-all text-right text-secondary text-sm">
            {user.email ?? ""}
          </span>
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label="Handle"
          description="3–20 characters. Letters, numbers, and hyphens."
          error={handleError}
        >
          <Input
            value={draftHandle}
            onChange={(e) => {
              setDraftHandle(e.target.value)
              setHandleError(null)
            }}
            onBlur={saveHandle}
            placeholder="your-handle"
            maxLength={20}
            className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          />
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label="ESO Plus"
          description="Whether you subscribe. When active, crafting material rules route to the craft bag instead of the bank."
        >
          <Select<CraftBagAccessValue>
            value={toCraftBagAccessValue(craftBagAccess)}
            onValueChange={(value) => updateCraftBagAccess(fromCraftBagAccessValue(value))}
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent nullSentinel={{ value: "no-eso-plus-answer", label: "Select..." }}>
              <SelectItem<CraftBagAccessValue> value="true">Active</SelectItem>
              <SelectItem<CraftBagAccessValue> value="false">Not Active</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      </InputPanelCard>
    </ResponsiveColumns>
  )
}

"use client"

import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { ProfileMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import {
  type CraftBagAccessValue,
  fromCraftBagAccessValue,
  toCraftBagAccessValue,
} from "akasha/temper/web/modules/craft-bag-access-select/craft-bag-access-select.module.code.ts"
import { usePlayer } from "akasha/temper/web/modules/use-player/use-player.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { accountTabActive } from "akasha/temper/web/phrase/pages/account-tab-active.temper-web-phrase.ts"
import { accountTabBadCharacters } from "akasha/temper/web/phrase/pages/account-tab-bad-characters.temper-web-phrase.ts"
import { accountTabClearFailed } from "akasha/temper/web/phrase/pages/account-tab-clear-failed.temper-web-phrase.ts"
import { accountTabEmail } from "akasha/temper/web/phrase/pages/account-tab-email.temper-web-phrase.ts"
import { accountTabEsoPlus } from "akasha/temper/web/phrase/pages/account-tab-eso-plus.temper-web-phrase.ts"
import { accountTabEsoPlusDescription } from "akasha/temper/web/phrase/pages/account-tab-eso-plus-description.temper-web-phrase.ts"
import { accountTabEu } from "akasha/temper/web/phrase/pages/account-tab-eu.temper-web-phrase.ts"
import { accountTabHandle } from "akasha/temper/web/phrase/pages/account-tab-handle.temper-web-phrase.ts"
import { accountTabHandleDescription } from "akasha/temper/web/phrase/pages/account-tab-handle-description.temper-web-phrase.ts"
import { accountTabHandlePlaceholder } from "akasha/temper/web/phrase/pages/account-tab-handle-placeholder.temper-web-phrase.ts"
import { accountTabNa } from "akasha/temper/web/phrase/pages/account-tab-na.temper-web-phrase.ts"
import { accountTabNotActive } from "akasha/temper/web/phrase/pages/account-tab-not-active.temper-web-phrase.ts"
import { accountTabPc } from "akasha/temper/web/phrase/pages/account-tab-pc.temper-web-phrase.ts"
import { accountTabPlatform } from "akasha/temper/web/phrase/pages/account-tab-platform.temper-web-phrase.ts"
import { accountTabPlaystation } from "akasha/temper/web/phrase/pages/account-tab-playstation.temper-web-phrase.ts"
import { accountTabSaveFailed } from "akasha/temper/web/phrase/pages/account-tab-save-failed.temper-web-phrase.ts"
import { accountTabSelect } from "akasha/temper/web/phrase/pages/account-tab-select.temper-web-phrase.ts"
import { accountTabServer } from "akasha/temper/web/phrase/pages/account-tab-server.temper-web-phrase.ts"
import { accountTabTitle } from "akasha/temper/web/phrase/pages/account-tab-title.temper-web-phrase.ts"
import { accountTabTooLong } from "akasha/temper/web/phrase/pages/account-tab-too-long.temper-web-phrase.ts"
import { accountTabTooShort } from "akasha/temper/web/phrase/pages/account-tab-too-short.temper-web-phrase.ts"
import { accountTabXbox } from "akasha/temper/web/phrase/pages/account-tab-xbox.temper-web-phrase.ts"
import { useCraftBagAccess } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { useCallback, useEffect, useState } from "react"

const HANDLE_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/

function validateHandle(value: string, phrase: Phrase): string | null {
  if (value.length < 3) return phrase(accountTabTooShort.slug)
  if (value.length > 20) return phrase(accountTabTooLong.slug)
  if (!HANDLE_REGEX.test(value)) return phrase(accountTabBadCharacters.slug)
  return null
}

interface AccountTabProps {
  active: boolean
  user: { email: string | null }
}

export function AccountTab({ active, user }: AccountTabProps) {
  const surface = useSurface()
  const phrase = usePhrase()
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
        setHandleError(phrase(accountTabClearFailed.slug))
      }
      return
    }

    const error = validateHandle(trimmed, phrase)
    if (error != null) {
      setHandleError(error)
      return
    }

    setHandleError(null)
    try {
      await setHandle(trimmed)
    } catch {
      setHandleError(phrase(accountTabSaveFailed.slug))
    }
  }, [draftHandle, handle, setHandle, phrase])

  if (!active) return null

  return (
    <ResponsiveColumns>
      <InputPanelCard id="account" title={phrase(accountTabTitle.slug)}>
        <InputPanelCard.Row label={phrase(accountTabPlatform.slug)}>
          <Select<NonNullable<ProfileMetadata["platform"]> | "no-platform">
            value={profileMetadata.platform ?? "no-platform"}
            onValueChange={(value) =>
              updateProfileMeta({ platform: value === "no-platform" ? undefined : value })
            }
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue placeholder={phrase(accountTabSelect.slug)} />
            </SelectTrigger>
            <SelectContent
              nullSentinel={{ value: "no-platform", label: phrase(accountTabSelect.slug) }}
            >
              <SelectItem<NonNullable<ProfileMetadata["platform"]>> value="PC">
                {phrase(accountTabPc.slug)}
              </SelectItem>
              <SelectItem<NonNullable<ProfileMetadata["platform"]>> value="Xbox">
                {phrase(accountTabXbox.slug)}
              </SelectItem>
              <SelectItem<NonNullable<ProfileMetadata["platform"]>> value="PlayStation">
                {phrase(accountTabPlaystation.slug)}
              </SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
        <InputPanelCard.Row label={phrase(accountTabServer.slug)}>
          <Select<NonNullable<ProfileMetadata["server"]> | "no-server">
            value={profileMetadata.server ?? "no-server"}
            onValueChange={(value) =>
              updateProfileMeta({ server: value === "no-server" ? undefined : value })
            }
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue placeholder={phrase(accountTabSelect.slug)} />
            </SelectTrigger>
            <SelectContent
              nullSentinel={{ value: "no-server", label: phrase(accountTabSelect.slug) }}
            >
              <SelectItem<NonNullable<ProfileMetadata["server"]>> value="NA">
                {phrase(accountTabNa.slug)}
              </SelectItem>
              <SelectItem<NonNullable<ProfileMetadata["server"]>> value="EU">
                {phrase(accountTabEu.slug)}
              </SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
        <InputPanelCard.Row label={phrase(accountTabEmail.slug)}>
          {}
          <span className="min-w-0 max-w-[240px] select-text break-all text-right text-secondary text-sm">
            {user.email ?? ""}
          </span>
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label={phrase(accountTabHandle.slug)}
          description={phrase(accountTabHandleDescription.slug)}
          error={handleError}
        >
          <Input
            value={draftHandle}
            onChange={(e) => {
              setDraftHandle(e.target.value)
              setHandleError(null)
            }}
            onBlur={saveHandle}
            placeholder={phrase(accountTabHandlePlaceholder.slug)}
            maxLength={20}
            className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          />
        </InputPanelCard.Row>
        <InputPanelCard.Row
          label={phrase(accountTabEsoPlus.slug)}
          description={phrase(accountTabEsoPlusDescription.slug)}
        >
          <Select<CraftBagAccessValue>
            value={toCraftBagAccessValue(craftBagAccess)}
            onValueChange={(value) => updateCraftBagAccess(fromCraftBagAccessValue(value))}
          >
            <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue placeholder={phrase(accountTabSelect.slug)} />
            </SelectTrigger>
            <SelectContent
              nullSentinel={{ value: "no-eso-plus-answer", label: phrase(accountTabSelect.slug) }}
            >
              <SelectItem<CraftBagAccessValue> value="true">
                {phrase(accountTabActive.slug)}
              </SelectItem>
              <SelectItem<CraftBagAccessValue> value="false">
                {phrase(accountTabNotActive.slug)}
              </SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      </InputPanelCard>
    </ResponsiveColumns>
  )
}

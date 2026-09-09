import "akasha/temper/temper-eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
let cachedMaxRapport: number | undefined

function getMaxRapport(): number {
  if (cachedMaxRapport === undefined) {
    cachedMaxRapport = GetMaximumRapport()
  }
  return cachedMaxRapport
}

export function installCompanionOverviewRapportOverlay(): undefined {
  const maxRapport = getMaxRapport()

  SecurePostHook(
    COMPANION_OVERVIEW_KEYBOARD,
    "RefreshCompanionRapport",
    function (this: void, self: CompanionOverviewKeyboard): undefined {
      const control = self.rapportStatusLabel
      if (control != null) {
        control.SetText(
          string.format("%s (%d/%d)", control.GetText(), GetActiveCompanionRapport(), maxRapport)
        )
      }
    }
  )
}

export function notifyCompanionRapportChange(
  companionId: number,
  previousRapport: number,
  currentRapport: number
): undefined {
  CHAT_ROUTER.AddSystemMessage(
    zo_strformat(
      "<<1>> <<2>>: <<3>> <<4>>",
      os.date("[%H:%M:%S]", GetTimeStamp()),
      GetString(SI_COMPANION_OVERVIEW_RAPPORT),
      GetCompanionName(companionId),
      string.format(
        "%+d (%d/%d)",
        currentRapport - previousRapport,
        currentRapport,
        getMaxRapport()
      )
    )
  )
}

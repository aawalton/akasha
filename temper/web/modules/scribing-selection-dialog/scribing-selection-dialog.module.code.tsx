import { ItemCard } from "akasha/design/interface/pattern/modules/item-card/item-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Command,
  CommandInput,
  CommandList,
} from "akasha/design/interface/primitive/modules/command/command.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import type { FocusScriptId } from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import { getEsoIconUrl } from "akasha/temper/player/character/formula-framework/modules/eso-icon-url/eso-icon-url.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"
import { getScribedSkillName } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import {
  type GrimoireId,
  getGrimoireCompatibleScripts,
  grimoires,
} from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { scribingSelectionDialogAllInUse } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-all-in-use.temper-web-phrase.ts"
import { scribingSelectionDialogBack } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-back.temper-web-phrase.ts"
import { scribingSelectionDialogNoFocusScriptsMatch } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-no-focus-scripts-match.temper-web-phrase.ts"
import { scribingSelectionDialogNoGrimoiresMatch } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-no-grimoires-match.temper-web-phrase.ts"
import { scribingSelectionDialogSearchFocusScripts } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-search-focus-scripts.temper-web-phrase.ts"
import { scribingSelectionDialogSearchGrimoires } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-search-grimoires.temper-web-phrase.ts"
import { scribingSelectionDialogSelectFocusScript } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-select-focus-script.temper-web-phrase.ts"
import { scribingSelectionDialogSelectGrimoire } from "akasha/temper/web/phrase/pages/scribing-selection-dialog-select-grimoire.temper-web-phrase.ts"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

type SelectionStep = "grimoire" | "focus-script"

interface ScribingSelectionDialogProps {
  open: boolean
  onClose: () => void
  onComplete: (grimoireId: GrimoireId, focusScriptId: FocusScriptId) => void
  scribing: readonly ScribedSkill[]
}

export function ScribingSelectionDialog({
  open,
  onClose,
  onComplete,
  scribing,
}: ScribingSelectionDialogProps) {
  const phrase = usePhrase()
  const [step, setStep] = useState<SelectionStep>("grimoire")
  const [selectedGrimoire, setSelectedGrimoire] = useState<GrimoireId | null>(null)
  const [searchFilter, setSearchFilter] = useState("")

  const handleClose = () => {
    setStep("grimoire")
    setSelectedGrimoire(null)
    setSearchFilter("")
    onClose()
  }

  const availableGrimoires = grimoires.list
    .filter((grimoire) => !scribing.some((s) => s.grimoireId === grimoire.id))
    .sort((a, b) => {
      const orderA = skillLines.data[a.skillLineId].displayOrder
      const orderB = skillLines.data[b.skillLineId].displayOrder
      return orderA - orderB
    })

  const searchLower = searchFilter.toLowerCase()
  const filteredGrimoires =
    searchFilter !== ""
      ? availableGrimoires.filter(
          (g) =>
            g.name.toLowerCase().includes(searchLower) ||
            skillLines.data[g.skillLineId].name.toLowerCase().includes(searchLower)
        )
      : availableGrimoires

  const compatibleFocusScripts =
    selectedGrimoire != null
      ? getGrimoireCompatibleScripts(selectedGrimoire)
          .focus.map((id) => skillCatalog().focusScripts.data[id])
          .sort((a, b) => a.name.localeCompare(b.name))
      : []

  const filteredFocusScripts =
    searchFilter !== ""
      ? compatibleFocusScripts.filter((script) => {
          const skillName =
            selectedGrimoire != null ? getScribedSkillName(selectedGrimoire, script.id) : ""
          return (
            script.name.toLowerCase().includes(searchLower) ||
            skillName.toLowerCase().includes(searchLower)
          )
        })
      : compatibleFocusScripts

  const handleGrimoireSelect = (grimoireId: GrimoireId) => {
    setSelectedGrimoire(grimoireId)
    setSearchFilter("")
    setStep("focus-script")
  }

  const handleFocusScriptSelect = (focusScriptId: FocusScriptId) => {
    if (selectedGrimoire != null) {
      onComplete(selectedGrimoire, focusScriptId)
      handleClose()
    }
  }

  const handleBack = () => {
    setStep("grimoire")
    setSelectedGrimoire(null)
    setSearchFilter("")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md overflow-hidden">
        <Command className="max-h-none" shouldFilter={false}>
          <DialogHeader className="space-y-3 pb-3">
            <div className="flex items-center gap-2">
              {step === "focus-script" && (
                <Button
                  variant="tertiary"
                  size="icon"
                  onClick={handleBack}
                  className="shrink-0"
                  title={phrase(scribingSelectionDialogBack.slug)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle>
                {phrase(
                  step === "grimoire"
                    ? scribingSelectionDialogSelectGrimoire.slug
                    : scribingSelectionDialogSelectFocusScript.slug
                )}
              </DialogTitle>
            </div>
            <CommandInput
              placeholder={phrase(
                step === "grimoire"
                  ? scribingSelectionDialogSearchGrimoires.slug
                  : scribingSelectionDialogSearchFocusScripts.slug
              )}
              value={searchFilter}
              onValueChange={setSearchFilter}
            />
          </DialogHeader>

          <DialogBody className="pt-3">
            <CommandList className="max-h-none overflow-y-auto">
              {step === "grimoire" && (
                <>
                  {filteredGrimoires.length === 0 && searchFilter !== "" && (
                    <div className="py-6 text-center text-sm">
                      {phrase(scribingSelectionDialogNoGrimoiresMatch.slug, {
                        search: searchFilter,
                      })}
                    </div>
                  )}
                  {filteredGrimoires.length === 0 && searchFilter === "" && (
                    <div className="py-6 text-center text-sm">
                      {phrase(scribingSelectionDialogAllInUse.slug)}
                    </div>
                  )}
                  <div className="space-y-2">
                    {filteredGrimoires.map((grimoire) => {
                      const iconUrl = getEsoIconUrl(grimoire.abilityIcon)
                      return (
                        <ItemCard
                          key={grimoire.id}
                          onClick={() => handleGrimoireSelect(grimoire.id)}
                          renderIcon={() =>
                            iconUrl != null ? (
                              <img
                                src={iconUrl !== "" ? iconUrl : "/placeholder.svg"}
                                alt={grimoire.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            ) : null
                          }
                          renderContent={() => (
                            <div className="min-w-0">
                              <div className="truncate font-medium text-sm">{grimoire.name}</div>
                              <div className="truncate text-secondary text-xs">
                                {skillLines.data[grimoire.skillLineId].name}
                              </div>
                            </div>
                          )}
                        />
                      )
                    })}
                  </div>
                </>
              )}

              {step === "focus-script" && (
                <>
                  {filteredFocusScripts.length === 0 && searchFilter !== "" && (
                    <div className="py-6 text-center text-sm">
                      {phrase(scribingSelectionDialogNoFocusScriptsMatch.slug, {
                        search: searchFilter,
                      })}
                    </div>
                  )}
                  <div className="space-y-2">
                    {filteredFocusScripts.map((script) => {
                      const iconUrl = getEsoIconUrl(script.icon)
                      const skillName =
                        selectedGrimoire != null
                          ? getScribedSkillName(selectedGrimoire, script.id)
                          : script.name
                      return (
                        <ItemCard
                          key={script.id}
                          onClick={() => handleFocusScriptSelect(script.id)}
                          renderIcon={() =>
                            iconUrl != null ? (
                              <img
                                src={iconUrl !== "" ? iconUrl : "/placeholder.svg"}
                                alt={script.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            ) : null
                          }
                          renderContent={() => (
                            <div className="min-w-0">
                              <div className="truncate font-medium text-sm">{skillName}</div>
                              <div className="truncate text-secondary text-xs">{script.name}</div>
                            </div>
                          )}
                        />
                      )
                    })}
                  </div>
                </>
              )}
            </CommandList>
          </DialogBody>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

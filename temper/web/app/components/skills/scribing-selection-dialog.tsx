import { Button } from "@shared/design-primitives/components/button"
import { Command, CommandInput, CommandList } from "@shared/design-primitives/components/command"
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { ItemCard } from "@shared/design-patterns/components/item-card"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import type { ScribedSkill } from "@temper/game-characters-skills/scribing/scribed-skill-types"
import {
  type FocusScriptId,
  focusScripts,
} from "@temper/game-characters-skills/scribing/focus-scripts-data"
import {
  type GrimoireId,
  getGrimoireCompatibleScripts,
  grimoires,
} from "@temper/game-characters-skills/scribing/grimoires-data"
import { getScribedSkillName } from "@temper/game-characters-skills/scribing/scribed-skills-data"
import { getEsoIconUrl } from "@temper/shared-formula-framework/icon-utils"
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
          .focus.map((id) => focusScripts.data[id])
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
                  title="Back to grimoire selection"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle>
                {step === "grimoire" ? "Select Grimoire" : "Select Focus Script"}
              </DialogTitle>
            </div>
            <CommandInput
              placeholder={step === "grimoire" ? "Search grimoires..." : "Search focus scripts..."}
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
                      No grimoires match "{searchFilter}"
                    </div>
                  )}
                  {filteredGrimoires.length === 0 && searchFilter === "" && (
                    <div className="py-6 text-center text-sm">All grimoires are already in use</div>
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
                      No focus scripts match "{searchFilter}"
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

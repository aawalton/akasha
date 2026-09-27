import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"
import {
  getGrimoireCompatibleScripts,
  grimoires,
} from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"
import { getCombinedScriptDescription } from "akasha/temper/player/character/skill/modules/scribing-script-description/scribing-script-description.module.code.ts"
import type { PendingScriptEdits } from "akasha/temper/web/modules/skills-types/skills-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { scriptEditDialogAffix } from "akasha/temper/web/phrase/pages/script-edit-dialog-affix.temper-web-phrase.ts"
import { scriptEditDialogCancel } from "akasha/temper/web/phrase/pages/script-edit-dialog-cancel.temper-web-phrase.ts"
import { scriptEditDialogDescription } from "akasha/temper/web/phrase/pages/script-edit-dialog-description.temper-web-phrase.ts"
import { scriptEditDialogEditScripts } from "akasha/temper/web/phrase/pages/script-edit-dialog-edit-scripts.temper-web-phrase.ts"
import { scriptEditDialogFocus } from "akasha/temper/web/phrase/pages/script-edit-dialog-focus.temper-web-phrase.ts"
import { scriptEditDialogInvalid } from "akasha/temper/web/phrase/pages/script-edit-dialog-invalid.temper-web-phrase.ts"
import { scriptEditDialogNone } from "akasha/temper/web/phrase/pages/script-edit-dialog-none.temper-web-phrase.ts"
import { scriptEditDialogSave } from "akasha/temper/web/phrase/pages/script-edit-dialog-save.temper-web-phrase.ts"
import { scriptEditDialogSelectFocusScript } from "akasha/temper/web/phrase/pages/script-edit-dialog-select-focus-script.temper-web-phrase.ts"
import { scriptEditDialogSignature } from "akasha/temper/web/phrase/pages/script-edit-dialog-signature.temper-web-phrase.ts"
import { useMemo } from "react"

interface ScriptEditDialogProps {
  open: boolean
  skill: ScribedSkill | null
  pendingEdits: PendingScriptEdits | null
  onSave: () => void
  onCancel: () => void
  onEditChange: (edits: PendingScriptEdits) => void
}

export function ScriptEditDialog({
  open,
  skill,
  pendingEdits,
  onSave,
  onCancel,
  onEditChange,
}: ScriptEditDialogProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const none = phrase(scriptEditDialogNone.slug)
  const catalog = skillCatalog()
  const { focusScripts, signatureScripts, affixScripts } = catalog
  const compatible =
    skill?.grimoireId != null ? getGrimoireCompatibleScripts(skill.grimoireId) : null
  let grimoireName = phrase(scriptEditDialogEditScripts.slug)
  if (skill?.grimoireId != null && grimoires.has(skill.grimoireId)) {
    grimoireName = grimoires.data[skill.grimoireId].name
  }

  const description = useMemo(() => {
    if (skill?.grimoireId == null || pendingEdits?.focusScriptId == null) {
      return null
    }

    return getCombinedScriptDescription(
      skill.grimoireId,
      pendingEdits.focusScriptId,
      pendingEdits.signatureScriptId === "no-signature-script"
        ? undefined
        : pendingEdits.signatureScriptId,
      pendingEdits.affixScriptId === "no-affix-script" ? undefined : pendingEdits.affixScriptId
    )
  }, [skill?.grimoireId, pendingEdits, catalog])

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{grimoireName}</DialogTitle>
        </DialogHeader>
        {pendingEdits && (
          <DialogBody className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">{phrase(scriptEditDialogFocus.slug)}</span>
              <Select<FocusScriptId>
                value={pendingEdits.focusScriptId}
                onValueChange={(v) =>
                  onEditChange({
                    ...pendingEdits,
                    focusScriptId: v,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={phrase(scriptEditDialogSelectFocusScript.slug)} />
                </SelectTrigger>
                <SelectContent nullSentinel={{ value: "no-focus-script", label: none }} sorted>
                  {compatible?.focus
                    .map((id) => focusScripts.data[id])
                    .map((script) => (
                      <SelectItem key={script.id} value={script.id}>
                        {script.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">
                {phrase(scriptEditDialogSignature.slug)}
              </span>
              <Select<SignatureScriptId>
                value={pendingEdits.signatureScriptId}
                onValueChange={(v) =>
                  onEditChange({
                    ...pendingEdits,
                    signatureScriptId: v,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent nullSentinel={{ value: "no-signature-script", label: none }} sorted>
                  {compatible?.signature
                    .map((id) => signatureScripts.data[id])
                    .map((script) => (
                      <SelectItem key={script.id} value={script.id}>
                        {script.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-tertiary">{phrase(scriptEditDialogAffix.slug)}</span>
              <Select<AffixScriptId>
                value={pendingEdits.affixScriptId}
                onValueChange={(v) =>
                  onEditChange({
                    ...pendingEdits,
                    affixScriptId: v,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent nullSentinel={{ value: "no-affix-script", label: none }} sorted>
                  {compatible?.affix
                    .map((id) => affixScripts.data[id])
                    .map((script) => (
                      <SelectItem key={script.id} value={script.id}>
                        {script.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <span className="text-secondary text-sm">
                {phrase(scriptEditDialogDescription.slug)}
              </span>
              <div
                className={`max-h-[300px] overflow-y-auto rounded-md ${surfaceClass(surface + 1)} p-3`}
              >
                {description != null ? (
                  <div className="space-y-2 text-secondary text-sm leading-relaxed">
                    {description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <Text className="italic">{phrase(scriptEditDialogInvalid.slug)}</Text>
                )}
              </div>
            </div>
          </DialogBody>
        )}
        <DialogFooter className="gap-2">
          <Button variant="tertiary" onClick={onCancel}>
            {phrase(scriptEditDialogCancel.slug)}
          </Button>
          <Button onClick={onSave}>{phrase(scriptEditDialogSave.slug)}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { mailContextMenuSetup } from "../fco-mail-buttons/fco-mail-buttons.module.code.ts"

export function mailStuff(this: void, whatType?: string): undefined {
  const typesToPrepare: Record<string, boolean> = {
    ContextMenu: false,
  }
  if (whatType === undefined) {
    for (const [k] of pairs(typesToPrepare)) {
      typesToPrepare[k] = true
    }
  } else {
    typesToPrepare[whatType] = true
  }

  if (typesToPrepare.ContextMenu === true) {
    mailContextMenuSetup()
  }
}

interface ZoDialog1Control extends Control {
  name?: string
  data?: { profileIndex?: number; editBoxText?: string }
}

function isZoDialog1Control(this: void, control: Control): control is ZoDialog1Control {
  return type(control) === "table" || type(control) === "userdata"
}

function resolveZoDialog1(this: void): ZoDialog1Control {
  if (isZoDialog1Control(ZO_Dialog1)) {
    return ZO_Dialog1
  }
  error("FCOCS mail: ZO_Dialog1 control missing")
}

const zoDialog1 = resolveZoDialog1()

function onDialogShownHook(this: void): undefined {
  zo_callLater(() => {
    if (!ZO_Dialogs_IsShowingDialog()) {
      return
    }
    if (zoDialog1.name !== "FCOCS_ADD_MAIL_PROFILE_DIALOG") {
      return
    }
    const data = zoDialog1.data
    if (data === undefined) {
      return
    }
    if (data.profileIndex !== undefined && data.editBoxText !== undefined) {
      const editControl = ZO_Dialog1EditBox
      if (editControl !== undefined) {
        editControl.SetText(data.editBoxText)
      }
    }
  }, 50)
}

if (zoDialog1.GetHandler("OnEffectivelyShown") !== undefined) {
  ZO_PostHookHandler(zoDialog1, "OnEffectivelyShown", onDialogShownHook)
} else {
  zoDialog1.SetHandler("OnEffectivelyShown", onDialogShownHook)
}

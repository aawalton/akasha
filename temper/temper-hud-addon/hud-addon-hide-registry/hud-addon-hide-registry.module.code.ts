import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-functions-06"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"

import { HUD_SCENE_CATALOG } from "@akasha/temper-hud-components/hud-scene-catalog"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { isRecord } from "@akasha/utils-narrow/is-record"
import {
  computeHidePlan,
  indexInventoryById,
} from "../hud-addon-hide-plan/hud-addon-hide-plan.module.code.ts"
import type {
  CompassHideTarget,
  RequestHideTarget,
  SupressHideTarget,
  TopLevelHideTarget,
  TutorialSuppressTarget,
} from "../hud-addon-hide-targets/hud-addon-hide-targets.module.code.ts"
import type {
  HidePlanEntry,
  HideRegistration,
} from "../hud-addon-hide-types/hud-addon-hide-types.module.code.ts"

export interface HideRegistry {
  register: (this: void, registration: HideRegistration) => undefined
  setHidden: (this: void, id: string, hidden: boolean) => undefined
  plan: (this: void) => readonly HidePlanEntry[]
  apply: (this: void) => undefined
  applyOne: (this: void, id: string) => undefined
  list: (this: void) => readonly HideRegistration[]
}

function isReasonHideTarget(value: unknown): value is HUDFadeSceneFragment {
  return isRecord(value) && typeof value.SetHiddenForReason === "function"
}

function isControlHideTarget(value: unknown): value is Control {
  return isRecord(value) && typeof value.SetHidden === "function"
}

function isCompassHideTarget(value: unknown): value is CompassHideTarget {
  return isRecord(value) && typeof value.SetCompassHidden === "function"
}

function isTopLevelHideTarget(value: unknown): value is TopLevelHideTarget {
  return isRecord(value) && typeof value.SetTopLevelHidden === "function"
}

function isRequestHideTarget(value: unknown): value is RequestHideTarget {
  return isRecord(value) && typeof value.RequestHidden === "function"
}

function isSupressHideTarget(value: unknown): value is SupressHideTarget {
  return isRecord(value) && typeof value.SetSupressed === "function"
}

function isTutorialSuppressTarget(value: unknown): value is TutorialSuppressTarget {
  return isRecord(value) && typeof value.SuppressTutorialType === "function"
}

function applyTutorialSuppress(target: unknown, hidden: boolean): undefined {
  if (!isTutorialSuppressTarget(target)) return
  const tutorialType: unknown = TUTORIAL_TYPE_HUD_INFO_BOX
  const suppressedByScene: unknown = TUTORIAL_SUPPRESSED_BY_SCENE
  if (typeof tutorialType !== "number") return
  if (typeof suppressedByScene !== "number") return
  target.SuppressTutorialType(tutorialType, hidden, suppressedByScene)
}

export function createHideRegistry(): HideRegistry {
  const inventoryIndex = indexInventoryById(HUD_SCENE_CATALOG)
  const registrations: HideRegistration[] = []
  const hiddenById: Record<string, boolean> = {}

  function register(registration: HideRegistration): undefined {
    const existing = registrations.findIndex((held) => held.id === registration.id)
    if (existing >= 0) {
      registrations[existing] = registration
      return
    }
    registrations.push(registration)
  }

  function setHidden(id: string, hidden: boolean): undefined {
    hiddenById[id] = hidden
  }

  function plan(): readonly HidePlanEntry[] {
    return computeHidePlan(inventoryIndex, registrations, hiddenById)
  }

  function resolveTarget(id: string): unknown {
    const registration = registrations.find((held) => held.id === id)
    return registration === undefined ? undefined : registration.resolve()
  }

  function applyEntry(entry: HidePlanEntry): undefined {
    const target = resolveTarget(entry.id)
    switch (entry.mechanism) {
      case "fragment-group":
      case "SetHiddenForReason": {
        if (isReasonHideTarget(target)) target.SetHiddenForReason(entry.reason, entry.hidden)
        return
      }
      case "scene-fragment": {
        if (isReasonHideTarget(target)) target.SetHiddenForReason(entry.reason, entry.hidden)
        else if (isControlHideTarget(target)) target.SetHidden(entry.hidden)
        return
      }
      case "SetCompassHidden": {
        if (isCompassHideTarget(target)) target.SetCompassHidden(entry.hidden)
        return
      }
      case "SetTopLevelHidden": {
        if (isTopLevelHideTarget(target)) target.SetTopLevelHidden(entry.hidden)
        return
      }
      case "RequestHidden": {
        if (isRequestHideTarget(target)) target.RequestHidden(entry.hidden)
        return
      }
      case "SetSupressed": {
        if (isSupressHideTarget(target)) target.SetSupressed(entry.hidden, entry.reason)
        return
      }
      case "SuppressTutorialType": {
        applyTutorialSuppress(target, entry.hidden)
        return
      }
      case "SetFloatingMarkerGlobalAlpha": {
        SetFloatingMarkerGlobalAlpha?.(entry.hidden ? 0 : 1)
        return
      }
      case "RefreshVisibility": {
        if (isControlHideTarget(target)) target.SetHidden(entry.hidden)
        return
      }
      default:
        assertNever(entry.mechanism)
    }
  }

  function apply(): undefined {
    for (const entry of plan()) {
      if (entry.hidden) applyEntry(entry)
    }
  }

  function applyOne(id: string): undefined {
    for (const entry of plan()) {
      if (entry.id === id) {
        applyEntry(entry)
        return
      }
    }
  }

  function list(): readonly HideRegistration[] {
    return registrations
  }

  return { register, setHidden, plan, apply, applyOne, list }
}

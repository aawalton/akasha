export interface WindowPosition {
  left: number
  top: number
}

export interface MovableWindowConfig {
  window: TopLevelWindow
  dragHandle: Control
  loadPosition: (this: void) => WindowPosition | undefined
  savePosition: (this: void, position: WindowPosition) => undefined
  applyDefaultAnchor: (this: void) => undefined
}

export interface MovableWindowHandle {
  reanchor: (this: void) => undefined
}

export function createMovableWindow(config: MovableWindowConfig): MovableWindowHandle {
  const { window, dragHandle, loadPosition, savePosition, applyDefaultAnchor } = config

  window.SetMovable(true)
  window.SetClampedToScreen(true)
  window.SetMouseEnabled(true)

  dragHandle.SetMouseEnabled(true)
  dragHandle.SetHandler("OnMouseDown", function (this: void): undefined {
    window.StartMoving()
  })
  dragHandle.SetHandler("OnMouseUp", function (this: void): undefined {
    window.StopMovingOrResizing()
  })

  window.SetHandler("OnMoveStop", function (this: void): undefined {
    savePosition({ left: window.GetLeft(), top: window.GetTop() })
  })

  function reanchor(this: void): undefined {
    window.ClearAnchors()
    const saved = loadPosition()
    if (saved !== undefined) {
      window.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, saved.left, saved.top)
      return
    }
    applyDefaultAnchor()
  }

  reanchor()
  return { reanchor }
}

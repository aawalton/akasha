type UnbindFn = (this: void, layerIndex: number, categoryIndex: number, actionIndex: number) => void
type BindFn = (
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number,
  keyCode: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
) => void

let unbindFn: UnbindFn | undefined
let bindFn: BindFn | undefined

if (IsProtectedFunction("UnbindAllKeysFromAction")) {
  unbindFn = (layerIndex, categoryIndex, actionIndex) => {
    CallSecureProtected("UnbindAllKeysFromAction", layerIndex, categoryIndex, actionIndex)
  }
  bindFn = (
    layerIndex,
    categoryIndex,
    actionIndex,
    bindingIndex,
    keyCode,
    mod1,
    mod2,
    mod3,
    mod4
  ) => {
    CallSecureProtected(
      "BindKeyToAction",
      layerIndex,
      categoryIndex,
      actionIndex,
      bindingIndex,
      keyCode,
      mod1,
      mod2,
      mod3,
      mod4
    )
  }
} else if (!IsPrivateFunction("UnbindAllKeysFromAction")) {
  unbindFn = UnbindAllKeysFromAction
  bindFn = BindKeyToAction
}

export function bindingFunctionsAvailable(this: void): boolean {
  return unbindFn !== undefined && bindFn !== undefined
}

export function unbindAllKeysFromAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number
): undefined {
  if (unbindFn !== undefined) unbindFn(layerIndex, categoryIndex, actionIndex)
}

export function bindKeyToAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number,
  keyCode: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): undefined {
  if (bindFn !== undefined) {
    bindFn(layerIndex, categoryIndex, actionIndex, bindingIndex, keyCode, mod1, mod2, mod3, mod4)
  }
}

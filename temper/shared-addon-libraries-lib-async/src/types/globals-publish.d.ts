declare global {
  var LibAsync: import("../types").AsyncLib
  var AsyncSavedVars: import("../types").AsyncSavedVarsTable | undefined
  var InitSavedVar: (this: void) => void
}

export {}

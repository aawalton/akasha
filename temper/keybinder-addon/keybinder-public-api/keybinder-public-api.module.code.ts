import "../../addon-library-types/temper-keybinder-global/temper-keybinder-global.type-declaration.d.ts"

import { toggleShareState } from "../keybinder-share/keybinder-share.module.code.ts"

globalThis.TemperKeybinder = { ToggleShareState: toggleShareState }

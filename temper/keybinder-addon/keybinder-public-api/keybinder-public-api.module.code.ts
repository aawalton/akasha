import "@akasha/temper-addon-library-types/temper-keybinder-global"

import { toggleShareState } from "../keybinder-share/keybinder-share.module.code.ts"

globalThis.TemperKeybinder = { ToggleShareState: toggleShareState }

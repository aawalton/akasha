import "akasha/temper/addon-library-types/temper-keybinder-global/temper-keybinder-global.type-declaration.d.ts"

import { toggleShareState } from "akasha/temper/keybinder-addon/keybinder-share/keybinder-share.module.code.ts"

globalThis.TemperKeybinder = { ToggleShareState: toggleShareState }

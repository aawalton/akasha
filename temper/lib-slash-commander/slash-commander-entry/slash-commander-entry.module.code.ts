import "akasha/temper/lib-slash-commander/slash-commander-descriptions/slash-commander-descriptions.module.code.ts"
import "akasha/temper/lib-slash-commander/slash-command/slash-command.module.code.ts"
import "akasha/temper/lib-slash-commander/slash-commander-providers/slash-commander-providers.module.code.ts"
import "akasha/temper/lib-slash-commander/slash-commander-chat-hooks/slash-commander-chat-hooks.module.code.ts"
import { SLASH_COMMANDER } from "akasha/temper/lib-slash-commander/slash-commander-surface/slash-commander-surface.module.code.ts"

globalThis.LibSlashCommander = SLASH_COMMANDER

SLASH_COMMANDER.Init()

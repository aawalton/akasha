import "./public-api"

import { installChatProxy } from "./chat-proxy"
import { installFormatters } from "./formatters"
import { registerLifecycle } from "./lifecycle"
import { registerUnknownLinkString } from "./strings"

registerUnknownLinkString()
installFormatters()
installChatProxy()
registerLifecycle()

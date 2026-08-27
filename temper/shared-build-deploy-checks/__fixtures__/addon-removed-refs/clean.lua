-- synthetic fixture — project #12106
-- A clean Temper-native bundle: references only ESO base APIs and the
-- legitimately-kept optional integration (TTC). No removed external
-- addon globals. (Comments must avoid the bare blocklisted names — the
-- scanner does not strip comments, matching the sandbox-safety sibling.)
local price = TamrielTradeCentrePrice and TamrielTradeCentrePrice.GetPriceInfo(itemLink)
EVENT_MANAGER:RegisterForEvent("TemperInventory", EVENT_ADD_ON_LOADED, function() end)
-- A removed-addon name inside a string literal is data, not a reference:
local note = "ported away from AwesomeGuildStore and AdvancedFilters"

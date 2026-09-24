local _G = _G
local pairs = pairs
local type = type
local match = string.match

local BOUNDS = { ITERATION_BEGIN = true, ITERATION_END = true, MIN_VALUE = true, MAX_VALUE = true }

local currencyOfMarket = {}
local marketOfCurrency = {}

for name, market in pairs(_G) do
  local rest = type(name) == "string" and match(name, "^MKCT_(.+)$") or nil
  if rest ~= nil and not BOUNDS[rest] and type(market) == "number" then
    local currency = _G["CURT_" .. rest]
    if type(currency) == "number" then
      currencyOfMarket[market] = currency
      marketOfCurrency[currency] = market
    end
  end
end

function _G.GetCurrencyTypeFromMarketCurrencyType(market)
  return currencyOfMarket[market] or _G.CURT_NONE
end

function _G.GetMarketCurrencyTypeFromCurrencyType(currency)
  return marketOfCurrency[currency] or _G.MKCT_NONE
end

-- synthetic fixture — project #12106
-- Hand-authored to trigger the removed-external-addon-reference scanner via a
-- hard reference to AwesomeGuildStore (the dormant-crash class behind #12076).
local function hook()
  if AwesomeGuildStore then
    AwesomeGuildStore:RegisterCallback("StoreTabChanged", onTab)
  end
end

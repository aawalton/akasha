TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["diagnostics"] =
                {
                    ["lastBankProfile"] =
                    {
                        ["schemaVersion"] = 1,
                        ["timestamp"] = 1751500000,
                        ["bankingBag"] = 2,
                        ["profilerAvailable"] = true,
                        ["frameCount"] = 312,
                        ["recordCount"] = 84120,
                        ["truncated"] = false,
                        ["totalLuaMs"] = 1180,
                        ["totalSelfMs"] = 1175.5,
                        ["gcMs"] = 42.5,
                        ["bySource"] =
                        {
                            [1] =
                            {
                                ["source"] = "EsoUI/",
                                ["selfMs"] = 910.5,
                                ["inclusiveMs"] = 1120,
                                ["callCount"] = 48200,
                            },
                            [2] =
                            {
                                ["source"] = "AddOns/TemperInventory",
                                ["selfMs"] = 210,
                                ["inclusiveMs"] = 360,
                                ["callCount"] = 12040,
                            },
                            [3] =
                            {
                                ["source"] = "[C]",
                                ["selfMs"] = 55,
                                ["inclusiveMs"] = 55,
                                ["callCount"] = 23980,
                            },
                        },
                        ["topByInclusive"] =
                        {
                            [1] =
                            {
                                ["kind"] = "closure",
                                ["name"] = "ZO_InventoryManager:UpdateList",
                                ["source"] = "EsoUI/Ingame/Inventory/Inventory.lua",
                                ["line"] = 1442,
                                ["callCount"] = 46,
                                ["inclusiveMs"] = 820,
                                ["selfMs"] = 120,
                            },
                            [2] =
                            {
                                ["kind"] = "closure",
                                ["name"] = "refreshBankActionPanel",
                                ["source"] = "user:/AddOns/TemperInventory/src/bank-action-panel.lua",
                                ["line"] = 88,
                                ["callCount"] = 23,
                                ["inclusiveMs"] = 300,
                                ["selfMs"] = 40,
                            },
                        },
                        ["topBySelf"] =
                        {
                            [1] =
                            {
                                ["kind"] = "closure",
                                ["name"] = "ZO_ScrollList_UpdateScroll",
                                ["source"] = "EsoUI/Libraries/ZO_SortFilterList/ZO_SortFilterList.lua",
                                ["line"] = 611,
                                ["callCount"] = 920,
                                ["inclusiveMs"] = 540,
                                ["selfMs"] = 505,
                            },
                            [2] =
                            {
                                ["kind"] = "cfunction",
                                ["name"] = "GetItemLinkName",
                                ["source"] = "[C]",
                                ["line"] = 0,
                                ["callCount"] = 23980,
                                ["inclusiveMs"] = 55,
                                ["selfMs"] = 55,
                            },
                        },
                    },
                },
            },
        },
    },
}

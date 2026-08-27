TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["sellCompiled"] =
                {
                    ["version"] = 3,
                    ["orderedRules"] =
                    {
                        {
                            ["id"] = "r1",
                            ["action"] = "use",
                            ["destination"] = "character:by-priority",
                            ["categoryId"] = "motifs",
                        },
                        {
                            ["id"] = "r2",
                            ["action"] = "nothing",
                            ["categoryId"] = "all",
                        },
                    },
                    ["itemRules"] = {},
                    ["wantedEquipment"] = {},
                    ["wantedCompanionEquipment"] = {},
                    ["wantedConsumables"] =
                    {
                        [12345] =
                        {
                            ["qtyPerChar"] = 5,
                        },
                    },
                    ["consumableStock"] = {},
                    ["characterPriority"] =
                    {
                        "char-1",
                        "char-2",
                    },
                },
            },
        },
    },
}

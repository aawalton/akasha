-- synthetic fixture — project #12106
-- Hand-authored to trigger the scanner on the LibFilters / LibFilters3 filter
-- registry that AdvancedFilters and AGS both used. `\bLibFilters\b` must match
-- LibFilters without also matching the distinct LibFilters3 token.
local lf = LibFilters
local lf3 = LibFilters3
lf3:RegisterFilter("Temper", LAF_BANK, callback)

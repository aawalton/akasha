-- synthetic fixture — project #7209
-- Hand-authored to trigger the `package` family of the banned-symbol scanner.
local p = package.path
package.loaded["x"] = nil

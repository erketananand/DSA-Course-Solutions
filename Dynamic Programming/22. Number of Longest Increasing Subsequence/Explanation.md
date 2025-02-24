#### HINTS:
1. Maintain an additional `count[]` array to track how many such LIS(`nums[j] < nums[i]; j<i`) exist.
2. If a new LIS is found(`dp[j] + 1 > dp[i]`), update `dp[i]=dp[j] + 1` and inherit `count[i]` from `count[j]`.
3. If a LIS of the same length is found, add `count[j]` to `count[i]`.
4. After DP computation, sum all counts where `dp[i] == max LIS length`.

#### Bottom-Up (Iterative DP) Approach:
**Time Complexity:** `O(n²)` (Nested loops checking previous LIS values)

**Space Complexity:** `O(n)` (For dp[] and count[] arrays)
```
Function findNumberOfLIS(nums):
    l = length of nums
    dp = array of size l filled with 1
    count = array of size l filled with 1
    maxLIS = 1

    For i from 1 to l-1:
        For j from 0 to i-1:
            If nums[j] < nums[i]:
                If dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    count[i] = count[j]  // Inherit LIS count
                Else if dp[j] + 1 == dp[i]:
                    count[i] += count[j]  // Add count to existing LIS
                
        maxLIS = max(maxLIS, dp[i])

    result = 0
    For i from 0 to l-1:
        If dp[i] == maxLIS:
            result += count[i]
    Return result
```
#### Top-Down (Recursion + Memoization) Approach:
**Time Complexity:** `O(n²)` (Each dfs(i) checks all j < i)

**Space Complexity:** `O(n)` (Recursion stack + Memoization arrays)
```
Function findNumberOfLIS(nums):
    l = length of nums
    dp = array of size l filled with -1
    count = array of size l filled with -1
    maxLIS = 1

    Function dfs(i):
        If dp[i] != -1: return (dp[i], count[i])
        
        maxLen = 1, ways = 1
        For j from 0 to i-1:
            If nums[j] < nums[i]:
                (prevLen, prevCount) = dfs(j)
                If prevLen + 1 > maxLen:
                    maxLen = prevLen + 1
                    ways = prevCount
                Else if prevLen + 1 == maxLen:
                    ways += prevCount

        dp[i] = maxLen, count[i] = ways
        Return (maxLen, ways)

    result = 0
    For i from 0 to l-1:
        (length, ways) = dfs(i)
        maxLIS = max(maxLIS, length)
    
    For i from 0 to l-1:
        If dp[i] == maxLIS:
            result += count[i]

    Return result
```

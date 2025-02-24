#include <vector>
#include <algorithm>

// Bottom-Up (Iterative DP) Approach:
int findNumberOfLISUsingBottomUp(std::vector<int>& nums) {
    int l = nums.size();
    if (l == 0) return 0;

    // dp[i] stores the length of the longest increasing subsequence ending at nums[i].
    std::vector<int> dp(l, 1);
    // count[i] stores the number of longest increasing subsequences ending at nums[i].
    std::vector<int> count(l, 1);
    // res stores the maximum length of any longest increasing subsequence.
    int res = 1;

    // Iterate through the array starting from the second element.
    for (int i = 1; i < l; i++) {
        // Iterate through the elements before nums[i].
        for (int j = 0; j < i; j++) {
            // If nums[j] is less than nums[i], it can be part of an increasing subsequence ending at nums[i].
            if (nums[j] < nums[i]) {
                // If adding nums[i] to the subsequence ending at nums[j] creates a longer subsequence,
                // update dp[i] and inherit the count from count[j].
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    count[i] = count[j]; // Inherit count from previous LIS
                } else if (dp[j] + 1 == dp[i]) {
                    // If adding nums[i] to the subsequence ending at nums[j] creates a subsequence of the same length,
                    // add the count from count[j] to count[i].
                    count[i] += count[j]; // Add counts if LIS length is the same
                }
            }
        }
        // Update the maximum length of the longest increasing subsequence.
        res = std::max(res, dp[i]);
    }

    // Initialize the result to 0.
    int result = 0;
    // Iterate through the array and add the counts of all subsequences with length equal to the maximum length.
    for (int i = 0; i < l; i++) {
        if (dp[i] == res) {
            result += count[i];
        }
    }
    // Return the total number of longest increasing subsequences.
    return result;
}

// Top-Down (Recursion + Memoization) Approach
int findNumberOfLISUsingTopDown(std::vector<int>& nums) {
    int l = nums.size();
    if (l == 0) return 0;

    // dp[i] stores the length of the longest increasing subsequence ending at nums[i].
    std::vector<int> dp(l, -1);
    // count[i] stores the number of longest increasing subsequences ending at nums[i].
    std::vector<int> count(l, -1);
    int maxLIS = 1;

    // Recursive function to calculate the length and count of LIS ending at index i.
    std::pair<int, int> dfs(int i, std::vector<int>& nums, std::vector<int>& dp, std::vector<int>& count) {
        // If the result is already computed, return it.
        if (dp[i] != -1) {
            return {dp[i], count[i]};
        }

        int maxLen = 1;
        int ways = 1;

        // Iterate through all previous elements.
        for (int j = 0; j < i; j++) {
            // If nums[j] is less than nums[i], it can be part of an increasing subsequence.
            if (nums[j] < nums[i]) {
                std::pair<int, int> prev = dfs(j, nums, dp, count);

                // If adding nums[i] to the subsequence ending at nums[j] creates a longer subsequence,
                // update maxLen and ways.
                if (prev.first + 1 > maxLen) {
                    maxLen = prev.first + 1;
                    ways = prev.second;
                } else if (prev.first + 1 == maxLen) {
                    // If adding nums[i] creates a subsequence of the same length, add the counts.
                    ways += prev.second;
                }
            }
        }

        // Store the computed result in dp and count.
        dp[i] = maxLen;
        count[i] = ways;
        return {maxLen, ways};
    }

    int result = 0;

    // Iterate through the array and find the maximum length of LIS.
    for (int i = 0; i < l; i++) {
        std::pair<int, int> current = dfs(i, nums, dp, count);
        maxLIS = std::max(maxLIS, current.first);
    }

    // Iterate through the array and add the counts of all subsequences with length equal to maxLIS.
    for (int i = 0; i < l; i++) {
        if (dp[i] == maxLIS) {
            result += count[i];
        }
    }

    return result;
}
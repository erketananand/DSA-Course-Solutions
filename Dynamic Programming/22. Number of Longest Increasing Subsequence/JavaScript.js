// Bottom-Up (Iterative DP) Approach:

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
    let l = nums.length;
    // dp[i] stores the length of the longest increasing subsequence ending at nums[i].
    let dp = Array(l).fill(1);
    // count[i] stores the number of longest increasing subsequences ending at nums[i].
    let count = Array(l).fill(1)
    // res stores the maximum length of any longest increasing subsequence.
    let res = 1;

    // Iterate through the array starting from the second element.
    for(let i=1; i<l; i++){
        // Iterate through the elements before nums[i].
        for(let j=0; j<i; j++){
            // If nums[j] is less than nums[i], it can be part of an increasing subsequence ending at nums[i].
            if(nums[j] < nums[i]){
                // If adding nums[i] to the subsequence ending at nums[j] creates a longer subsequence,
                // update dp[i] and inherit the count from count[j].
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    count[i] = count[j]; // Inherit count from previous LIS
                } else if (dp[j] + 1 === dp[i]) {
                    // If adding nums[i] to the subsequence ending at nums[j] creates a subsequence of the same length,
                    // add the count from count[j] to count[i].
                    count[i] += count[j]; // Add counts if LIS length is the same
                }
            }
        }
        // Update the maximum length of the longest increasing subsequence.
        res = Math.max(res, dp[i]);
    }

    // Initialize the result to 0.
    let result = 0;
    // Iterate through the array and add the counts of all subsequences with length equal to the maximum length.
    for (let i = 0; i < l; i++) {
        if (dp[i] === res) {
            result += count[i];
        }
    }
    // Return the total number of longest increasing subsequences.
    return result;
};





// Top-Down (Recursion + Memoization) Approach
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
    const l = nums.length;
    // dp[i] stores the length of the longest increasing subsequence ending at nums[i].
    const dp = Array(l).fill(-1);
    // count[i] stores the number of longest increasing subsequences ending at nums[i].
    const count = Array(l).fill(-1);
    let maxLIS = 1;

    /**
     * Recursive function to calculate the length and count of LIS ending at index i.
     * @param {number} i - The current index.
     * @return {number[]} - An array containing [length, count] of LIS ending at i.
     */
    function dfs(i) {
        // If the result is already computed, return it.
        if (dp[i] !== -1) {
            return [dp[i], count[i]];
        }

        let maxLen = 1;
        let ways = 1;

        // Iterate through all previous elements.
        for (let j = 0; j < i; j++) {
            // If nums[j] is less than nums[i], it can be part of an increasing subsequence.
            if (nums[j] < nums[i]) {
                const [prevLen, prevCount] = dfs(j);

                // If adding nums[i] to the subsequence ending at nums[j] creates a longer subsequence,
                // update maxLen and ways.
                if (prevLen + 1 > maxLen) {
                    maxLen = prevLen + 1;
                    ways = prevCount;
                } else if (prevLen + 1 === maxLen) {
                    // If adding nums[i] creates a subsequence of the same length, add the counts.
                    ways += prevCount;
                }
            }
        }

        // Store the computed result in dp and count.
        dp[i] = maxLen;
        count[i] = ways;
        return [maxLen, ways];
    }

    let result = 0;

    // Iterate through the array and find the maximum length of LIS.
    for (let i = 0; i < l; i++) {
        const [length, ways] = dfs(i);
        maxLIS = Math.max(maxLIS, length);
    }

    // Iterate through the array and add the counts of all subsequences with length equal to maxLIS.
    for (let i = 0; i < l; i++) {
        if (dp[i] === maxLIS) {
            result += count[i];
        }
    }

    return result;
};
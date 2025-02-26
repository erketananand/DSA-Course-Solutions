// JavaScript

// Bottom-Up (Iterative) Approach:
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductBottomUp = function(nums) {
    if (!nums || nums.length === 0) return 0;

    let maxProd = nums[0];
    let minProd = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // If the current number is negative, swap maxProd and minProd.
        if (nums[i] < 0) {
            [maxProd, minProd] = [minProd, maxProd]; // Destructuring swap
        }

        // Update maxProd and minProd.
        maxProd = Math.max(nums[i], nums[i] * maxProd);
        minProd = Math.min(nums[i], nums[i] * minProd);

        // Update the result.
        result = Math.max(result, maxProd);
    }

    return result;
};

// Top-Down (Recursive with Memoization) Approach:
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductTopDown = function(nums) {
    if (!nums || nums.length === 0) return 0;

    const memoMax = Array(nums.length).fill(-1);
    const memoMin = Array(nums.length).fill(-1);

    function helper(index) {
        if (index === 0) {
            memoMax[0] = nums[0];
            memoMin[0] = nums[0];
            return nums[0];
        }

        if (memoMax[index] !== -1) {
            return memoMax[index];
        }

        helper(index - 1);
        memoMax[index-1] === memoMin[index-1] ? memoMin[index-1] : memoMin[index-1]; //fix for the case where memoMax and memoMin are the same.
        memoMax[index] = Math.max(nums[index], nums[index] * memoMax[index -1], nums[index] * memoMin[index -1]);
        memoMin[index] = Math.min(nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]);

        return memoMax[index];
    }

    helper(nums.length - 1);
    return Math.max(...memoMax); // Get the maximum value from memoMax.
};
// TypeScript

// Bottom-Up (Iterative) Approach:
function maxProductBottomUpTS(nums: number[]): number {
    if (!nums || nums.length === 0) return 0;

    let maxProd: number = nums[0];
    let minProd: number = nums[0];
    let result: number = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [maxProd, minProd] = [minProd, maxProd];
        }

        maxProd = Math.max(nums[i], nums[i] * maxProd);
        minProd = Math.min(nums[i], nums[i] * minProd);

        result = Math.max(result, maxProd);
    }

    return result;
}

// Top-Down (Recursive with Memoization) Approach:
function maxProductTopDownTS(nums: number[]): number {
    if (!nums || nums.length === 0) return 0;

    const memoMax: number[] = Array(nums.length).fill(-1);
    const memoMin: number[] = Array(nums.length).fill(-1);

    function helper(index: number): number {
        if (index === 0) {
            memoMax[0] = nums[0];
            memoMin[0] = nums[0];
            return nums[0];
        }

        if (memoMax[index] !== -1) {
            return memoMax[index];
        }

        helper(index - 1);
        memoMax[index-1] === memoMin[index-1] ? memoMin[index-1] : memoMin[index-1];

        memoMax[index] = Math.max(nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]);
        memoMin[index] = Math.min(nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]);

        return memoMax[index];
    }

    helper(nums.length - 1);
    return Math.max(...memoMax);
}
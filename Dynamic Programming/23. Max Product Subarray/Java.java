// Java

class Solution {
    // Bottom-Up (Iterative) Approach:
    public int maxProductBottomUpJava(int[] nums) {
        if (nums == null || nums.length == 0) return 0;

        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                int temp = maxProd;
                maxProd = minProd;
                minProd = temp;
            }

            maxProd = Math.max(nums[i], nums[i] * maxProd);
            minProd = Math.min(nums[i], nums[i] * minProd);

            result = Math.max(result, maxProd);
        }

        return result;
    }

    // Top-Down (Recursive with Memoization) Approach:
    public int maxProductTopDownJava(int[] nums) {
        if (nums == null || nums.length == 0) return 0;

        int[] memoMax = new int[nums.length];
        int[] memoMin = new int[nums.length];
        java.util.Arrays.fill(memoMax, -1);
        java.util.Arrays.fill(memoMin, -1);

        helper(nums, nums.length - 1, memoMax, memoMin);

        int max = Integer.MIN_VALUE;
        for(int val : memoMax){
            max = Math.max(max, val);
        }

        return max;
    }

    private int helper(int[] nums, int index, int[] memoMax, int[] memoMin) {
        if (index == 0) {
            memoMax[0] = nums[0];
            memoMin[0] = nums[0];
            return nums[0];
        }

        if (memoMax[index] != -1) {
            return memoMax[index];
        }

        helper(nums, index - 1, memoMax, memoMin);
        memoMax[index-1] == memoMin[index-1] ? memoMin[index-1] : memoMin[index-1];

        memoMax[index] = Math.max(nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]);
        memoMin[index] = Math.min(nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]);

        return memoMax[index];
    }
}
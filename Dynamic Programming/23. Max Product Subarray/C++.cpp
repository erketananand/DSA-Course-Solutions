// C++

#include <vector>
#include <algorithm>

// Bottom-Up (Iterative) Approach:
int maxProductBottomUpCpp(std::vector<int>& nums) {
    if (nums.empty()) return 0;

    int maxProd = nums[0];
    int minProd = nums[0];
    int result = nums[0];

    for (size_t i = 1; i < nums.size(); i++) {
        if (nums[i] < 0) {
            std::swap(maxProd, minProd);
        }

        maxProd = std::max(nums[i], nums[i] * maxProd);
        minProd = std::min(nums[i], nums[i] * minProd);

        result = std::max(result, maxProd);
    }

    return result;
}

// Top-Down (Recursive with Memoization) Approach:
iint maxProductTopDownCpp(std::vector<int>& nums) {
    if (nums.empty()) return 0;

    std::vector<int> memoMax(nums.size(), -1);
    std::vector<int> memoMin(nums.size(), -1);

    std::function<int(int)> helper = [&](int index) {
        if (index == 0) {
            memoMax[0] = nums[0];
            memoMin[0] = nums[0];
            return nums[0];
        }

        if (memoMax[index] != -1) {
            return memoMax[index];
        }

        helper(index - 1);
        memoMax[index-1] == memoMin[index-1] ? memoMin[index-1] : memoMin[index-1];

        memoMax[index] = std::max({nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]});
        memoMin[index] = std::min({nums[index], nums[index] * memoMax[index - 1], nums[index] * memoMin[index - 1]});

        return memoMax[index];
    };

    helper(nums.size() - 1);
    return *std::max_element(memoMax.begin(), memoMax.end());
}
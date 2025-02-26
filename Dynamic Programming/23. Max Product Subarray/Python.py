# Python

def max_product_bottom_up_python(nums):
    if not nums:
        return 0

    max_prod = nums[0]
    min_prod = nums[0]
    result = nums[0]

    for i in range(1, len(nums)):
        if nums[i] < 0:
            max_prod, min_prod = min_prod, max_prod

        max_prod = max(nums[i], nums[i] * max_prod)
        min_prod = min(nums[i], nums[i] * min_prod)

        result = max(result, max_prod)

    return result

def max_product_top_down_python(nums):
    if not nums:
        return 0

    memo_max = [-1] * len(nums)
    memo_min = [-1] * len(nums)

    def helper(index):
        if index == 0:
            memo_max[0] = nums[0]
            memo_min[0] = nums[0]
            return nums[0]

        if memo_max[index] != -1:
            return memo_max[index]

        prev_max = helper(index - 1)
        prev_min = helper(index - 1)

        memo_max[index] = max(nums[index], nums[index] * prev_max, nums[index] * prev_min)
        memo_min[index] = min(nums[index], nums[index] * prev_max, nums[index] * prev_min)

        return memo_max[index]

    helper(len(nums) - 1)
    return max(memo_max)
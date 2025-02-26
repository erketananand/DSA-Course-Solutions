#### HINTS:
1. **Keep track of both max & min products** at each step, since a negative number can flip the product.
2. **Swap** `maxProd` **and** `minProd` when encountering a negative number.
3. **Reset products if** `0` **appears**, as it breaks continuity.
4. **Use Kadane’s-like approach but for product**, instead of sum.

#### Bottom-Up (Iterative DP):
**Time Complexity:** `O(n)`, since we iterate once.

**Space Complexity:** `O(1)`, using constant extra space.
```
Function maxProduct(nums):
    Initialize maxProd, minProd, result = nums[0]

    Loop i from 1 to length(nums) - 1:
        If nums[i] < 0:
            Swap maxProd and minProd

        maxProd = max(nums[i], nums[i] * maxProd)
        minProd = min(nums[i], nums[i] * minProd)

        result = max(result, maxProd)

    Return result
```

#### Top-Down (Recursive + Memoization):
**Time Complexity:** `O(n)`, since we iterate once.

**Space Complexity:** `O(n)`, Recursive call stack O(n) + Memoization arrays O(n).
```
Function helper(index, nums, memoMax, memoMin):
    If index == 0:
        Return nums[0]

    If memoMax[index] is not -1:
        Return memoMax[index]

    prevMax = helper(index-1, nums, memoMax, memoMin)
    prevMin = helper(index-1, nums, memoMax, memoMin)

    memoMax[index] = max(nums[index], nums[index] * prevMax, nums[index] * prevMin)
    memoMin[index] = min(nums[index], nums[index] * prevMax, nums[index] * prevMin)

    Return memoMax[index]

Function maxProduct(nums):
    Initialize memoMax, memoMin as arrays of size len(nums) with -1
    Call helper(len(nums)-1, nums, memoMax, memoMin)
    Return max value in memoMax
```

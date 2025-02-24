# Bottom-Up (Iterative DP) Approach:

def findNumberOfLIS_bottom_up(nums):
    """
    Finds the number of longest increasing subsequences using bottom-up dynamic programming.

    Args:
        nums: A list of integers.

    Returns:
        The number of longest increasing subsequences.
    """
    l = len(nums)
    if l == 0:
        return 0

    # dp[i] stores the length of the longest increasing subsequence ending at nums[i].
    dp = [1] * l
    # count[i] stores the number of longest increasing subsequences ending at nums[i].
    count = [1] * l
    # res stores the maximum length of any longest increasing subsequence.
    res = 1

    # Iterate through the array starting from the second element.
    for i in range(1, l):
        # Iterate through the elements before nums[i].
        for j in range(i):
            # If nums[j] is less than nums[i], it can be part of an increasing subsequence ending at nums[i].
            if nums[j] < nums[i]:
                # If adding nums[i] to the subsequence ending at nums[j] creates a longer subsequence,
                # update dp[i] and inherit the count from count[j].
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    count[i] = count[j]  # Inherit count from previous LIS
                elif dp[j] + 1 == dp[i]:
                    # If adding nums[i] to the subsequence ending at nums[j] creates a subsequence of the same length,
                    # add the count from count[j] to count[i].
                    count[i] += count[j]  # Add counts if LIS length is the same
        # Update the maximum length of the longest increasing subsequence.
        res = max(res, dp[i])

    # Initialize the result to 0.
    result = 0
    # Iterate through the array and add the counts of all subsequences with length equal to the maximum length.
    for i in range(l):
        if dp[i] == res:
            result += count[i]
    # Return the total number of longest increasing subsequences.
    return result


# Top-Down (Recursion + Memoization) Approach:

def findNumberOfLIS_top_down(nums):
    """
    Finds the number of longest increasing subsequences using top-down dynamic programming (recursion with memoization).

    Args:
        nums: A list of integers.

    Returns:
        The number of longest increasing subsequences.
    """
    l = len(nums)
    if l == 0:
        return 0

    # dp[i] stores the length of the longest increasing subsequence ending at nums[i].
    dp = [-1] * l
    # count[i] stores the number of longest increasing subsequences ending at nums[i].
    count = [-1] * l
    max_lis = 1

    def dfs(i):
        """
        Recursive function to calculate the length and count of LIS ending at index i.

        Args:
            i: The current index.

        Returns:
            A tuple containing (length, count) of LIS ending at i.
        """
        # If the result is already computed, return it.
        if dp[i] != -1:
            return dp[i], count[i]

        max_len = 1
        ways = 1

        # Iterate through all previous elements.
        for j in range(i):
            # If nums[j] is less than nums[i], it can be part of an increasing subsequence.
            if nums[j] < nums[i]:
                prev_len, prev_count = dfs(j)

                # If adding nums[i] to the subsequence ending at nums[j] creates a longer subsequence,
                # update max_len and ways.
                if prev_len + 1 > max_len:
                    max_len = prev_len + 1
                    ways = prev_count
                elif prev_len + 1 == max_len:
                    # If adding nums[i] creates a subsequence of the same length, add the counts.
                    ways += prev_count

        # Store the computed result in dp and count.
        dp[i] = max_len
        count[i] = ways
        return max_len, ways

    result = 0

    # Iterate through the array and find the maximum length of LIS.
    for i in range(l):
        length, ways = dfs(i)
        max_lis = max(max_lis, length)

    # Iterate through the array and add the counts of all subsequences with length equal to max_lis.
    for i in range(l):
        if dp[i] == max_lis:
            result += count[i]

    return result
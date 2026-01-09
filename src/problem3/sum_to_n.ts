/**
 * Three different implementations of sum_to_n function
 * Each function calculates the summation from 1 to n
 */

/**
 * Implementation A: Iterative approach using a for loop
 * 
 * Complexity:
 * - Time Complexity: O(n) - loops through n iterations
 * - Space Complexity: O(1) - uses only a constant amount of extra space
 * 
 * This is a straightforward approach that's easy to understand and debug.
 * Performance is good for most practical use cases.
 */
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Implementation B: Mathematical formula approach
 * Uses the arithmetic series formula: sum = n * (n + 1) / 2
 * 
 * Complexity:
 * - Time Complexity: O(1) - constant time, performs only arithmetic operations
 * - Space Complexity: O(1) - uses only a constant amount of extra space
 * 
 * This is the most efficient approach in terms of time complexity.
 * No loops or recursion needed - just a direct mathematical calculation.
 * Best choice for performance-critical applications.
 */
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Implementation C: Recursive approach
 * 
 * Complexity:
 * - Time Complexity: O(n) - makes n recursive calls
 * - Space Complexity: O(n) - uses call stack space for n recursive calls
 * 
 * This approach is elegant but least efficient due to:
 * - Function call overhead for each recursion
 * - Risk of stack overflow for large values of n
 * - Higher memory usage from the call stack
 * 
 * Not recommended for production use with large n values.
 */
function sum_to_n_c(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}

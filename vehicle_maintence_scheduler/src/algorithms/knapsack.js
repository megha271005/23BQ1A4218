export function knapsack(tasks, capacity) {
  if (!Array.isArray(tasks) || capacity <= 0) {
    return { totalImpact: 0, totalDuration: 0, selected: [] };
  }

  const n = tasks.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: capacity + 1 }, () => 0)
  );

  for (let i = 1; i <= n; i += 1) {
    const { Duration, Impact } = tasks[i - 1];
    for (let w = 0; w <= capacity; w += 1) {
      if (Duration > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - Duration] + Impact);
      }
    }
  }

  const selected = [];
  let w = capacity;

  for (let i = n; i > 0; i -= 1) {
    if (dp[i][w] !== dp[i - 1][w]) {
      const task = tasks[i - 1];
      selected.push(task);
      w -= task.Duration;
    }
  }

  const totalImpact = dp[n][capacity];
  const totalDuration = selected.reduce((sum, t) => sum + t.Duration, 0);

  return { totalImpact, totalDuration, selected: selected.reverse() };
}
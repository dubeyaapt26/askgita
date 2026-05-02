import pLimit from "p-limit";

export interface BatchOptions {
  concurrency?: number;
  retries?: number;
}

export function isRateLimitError(err: unknown): boolean {
  if (err && typeof err === "object" && "status" in err) {
    return (err as { status: number }).status === 429;
  }
  return false;
}

export async function batchProcess<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  options: BatchOptions = {}
): Promise<R[]> {
  const { concurrency = 4 } = options;
  const limit = pLimit(concurrency);
  return Promise.all(items.map((item) => limit(() => fn(item))));
}

export async function batchProcessWithSSE<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  onResult: (result: R, index: number) => void,
  options: BatchOptions = {}
): Promise<R[]> {
  const { concurrency = 4 } = options;
  const limit = pLimit(concurrency);
  const results: R[] = [];
  await Promise.all(
    items.map((item, index) =>
      limit(async () => {
        const result = await fn(item);
        results[index] = result;
        onResult(result, index);
      })
    )
  );
  return results;
}

const target = process.env.PERF_URL || "http://127.0.0.1:3000/calc-demo";
const totalRequests = Number(process.env.PERF_TOTAL || 500);
const concurrency = Number(process.env.PERF_CONCURRENCY || 25);

const payload = {
  attack: 300,
  defense: 120,
  skillMultiplier: 1.4,
  flatBonus: 10,
  isCrit: true,
  critMultiplier: 1.8,
  elementBonus: 0.12
};

function percentile(sorted, p) {
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

async function runRequest() {
  const start = process.hrtime.bigint();
  const res = await fetch(target, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1_000_000;
  return { ok: res.ok, latencyMs: ms };
}

async function main() {
  const latencies = [];
  let okCount = 0;
  let errorCount = 0;
  let sent = 0;

  async function worker() {
    while (sent < totalRequests) {
      sent += 1;
      const result = await runRequest();
      latencies.push(result.latencyMs);
      if (result.ok) okCount += 1;
      else errorCount += 1;
    }
  }

  const workers = [];
  const actualConcurrency = Math.min(concurrency, totalRequests);
  for (let i = 0; i < actualConcurrency; i += 1) {
    workers.push(worker());
  }

  const benchmarkStart = Date.now();
  await Promise.all(workers);
  const benchmarkDurationSec = (Date.now() - benchmarkStart) / 1000;

  latencies.sort((a, b) => a - b);
  const p50 = percentile(latencies, 50);
  const p95 = percentile(latencies, 95);
  const rps = totalRequests / benchmarkDurationSec;

  const report = {
    target,
    totalRequests,
    concurrency: actualConcurrency,
    okCount,
    errorCount,
    p50Ms: Number(p50.toFixed(2)),
    p95Ms: Number(p95.toFixed(2)),
    rps: Number(rps.toFixed(2))
  };

  console.log(JSON.stringify(report, null, 2));
  if (errorCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

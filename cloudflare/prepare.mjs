import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const result = spawnSync("npm", ["run", "build"], {
  cwd: root, stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_SITE_ORIGIN: "https://vyaparai.in", NEXT_PUBLIC_SITE_BASE_PATH: "/lucknow-ai-growth-journey" },
});
if (result.status !== 0) process.exit(result.status ?? 1);
const configPath = resolve(root, "dist/server/wrangler.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));
config.name = "lucknow-ai-growth-journey";
config.workers_dev = false;
config.routes = [{ pattern: "vyaparai.in/lucknow-ai-growth-journey*", zone_name: "vyaparai.in" }];
config.assets = { ...config.assets, binding: "ASSETS", run_worker_first: true };
writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("Prepared https://vyaparai.in/lucknow-ai-growth-journey/ for Cloudflare deployment.");

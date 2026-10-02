import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const buildCmd = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(buildCmd, ["vinext", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_ORIGIN: "https://blogs.vyapai.in",
    NEXT_PUBLIC_SITE_BASE_PATH: "",
  },
});
if (result.status !== 0) process.exit(result.status ?? 1);

const configPath = resolve(root, "dist/server/wrangler.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));
config.name = "blogs-vyapai-in";
config.workers_dev = false;
config.routes = [
  { pattern: "blogs.vyapai.in", custom_domain: true },
];
config.assets = {
  ...config.assets,
  binding: "ASSETS",
  run_worker_first: true,
};
writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("Prepared https://blogs.vyapai.in/ for Cloudflare deployment.");

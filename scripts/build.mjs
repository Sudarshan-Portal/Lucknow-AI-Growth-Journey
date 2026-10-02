import { spawnSync } from "node:child_process";

if (process.platform === "win32") {
  const result = spawnSync("npx.cmd", ["vinext", "build"], { stdio: "inherit", shell: true });
  process.exit(result.status ?? 0);
} else {
  const result = spawnSync("bash", ["scripts/build-verified.sh"], { stdio: "inherit" });
  process.exit(result.status ?? 0);
}

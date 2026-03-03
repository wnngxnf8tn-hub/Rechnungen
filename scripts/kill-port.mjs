import { execSync } from "node:child_process";

const ports = process.argv
  .slice(2)
  .map((entry) => Number(entry))
  .filter((entry) => Number.isFinite(entry));

if (ports.length === 0) {
  ports.push(3001);
}

const listPids = (port) => {
  try {
    const output = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN -t`, {
      stdio: ["ignore", "pipe", "pipe"]
    })
      .toString()
      .trim();

    if (!output) return [];
    return output
      .split("\n")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isFinite(entry));
  } catch {
    return [];
  }
};

const describeListeners = (port) => {
  try {
    return execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN`, {
      stdio: ["ignore", "pipe", "pipe"]
    })
      .toString()
      .trim();
  } catch {
    return "";
  }
};

const uniquePids = new Set();

for (const port of ports) {
  const pids = listPids(port);
  for (const pid of pids) {
    uniquePids.add(pid);
  }
}

for (const pid of uniquePids) {
  try {
    process.kill(pid, "SIGKILL");
  } catch {
    // ignore and validate below
  }
}

for (const port of ports) {
  const remaining = listPids(port);
  if (remaining.length > 0) {
    console.error(`Port ${port} ist weiterhin belegt. Aktive Listener:`);
    const listeners = describeListeners(port);
    if (listeners) {
      console.error(listeners);
    } else {
      console.error(remaining.join(", "));
    }
    console.error(`Bitte diese Prozesse manuell beenden und erneut starten.`);
    process.exit(1);
  }
}

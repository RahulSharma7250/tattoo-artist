/**
 * node-version-polyfill
 * ---------------------------------------------------------------------------
 * Some Node-ecosystem packages (fast-glob → @nodelib/fs.scandir, semver, …)
 * expect `process.versions.node` to be a valid semver string. In Next.js
 * it’s '', which causes a runtime error when they call semver.parse().
 *
 * We patch it **once** and only when the value is missing/empty.
 * This runs in every environment (Edge, browser, Node) but is a no-op if the
 * value is already set correctly (i.e. during `next build` on real Node).
 */
declare const process: {
  versions?: { node?: string }
}

if (
  typeof process !== "undefined" &&
  process.versions &&
  (!process.versions.node || process.versions.node.length === 0)
) {
  // Use the current active LTS.  Any valid semver string is fine.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – process is writable here.
  process.versions.node = "20.11.1"
}

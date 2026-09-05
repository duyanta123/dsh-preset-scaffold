import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const patch = await readFile(join(root, "cordis.patch.yml"), "utf8");

const requiredTemplates = {
  "node-ts": ["package.json", "tsconfig.json", "src/index.ts"],
  "react-vite": ["package.json", "vite.config.ts", "src/main.tsx"],
  python: ["pyproject.toml", "src/app/main.py"],
  go: ["go.mod", "cmd/server/main.go"],
  "spring-boot": ["pom.xml", "src/main/java/com/example/app/Application.java"],
  monorepo: ["package.json", "pnpm-workspace.yaml"],
};

test("bundle manifest and plugin entry are publishable", async () => {
  assert.equal(pkg.main, "./plugin/index.js");
  assert.ok(existsSync(join(root, pkg.main)), "main must point to an existing plugin entry");
  assert.equal(pkg.dsh?.bundle?.patch, "./cordis.patch.yml");
  assert.ok(Array.isArray(pkg.files));
  assert.match(patch, /^- insert:/m);
  assert.match(patch, /id:\s*dsh-preset-scaffold/);
  for (const path of ["plugin/", "cordis.patch.yml", "skills/", "templates/", "preset.yml", "agent.cordis.yml"]) {
    assert.ok(pkg.files.some((entry) => entry === path || entry.startsWith(path)), `files whitelist misses ${path}`);
  }
});

test("all skill frontmatter has name and description", async () => {
  const skillNames = ["engineering-configuration-standard", "project-structure-best-practices", "scaffold-runbook", "scaffold-templates"];
  for (const name of skillNames) {
    const text = await readFile(join(root, "skills", name, "SKILL.md"), "utf8");
    const frontmatter = text.match(/^---\s*\n([\s\S]*?)\n---/);
    assert.ok(frontmatter, `${name} must have YAML frontmatter`);
    assert.match(frontmatter[1], /^name:\s*[a-z0-9][a-z0-9-]*$/m);
    assert.match(frontmatter[1], /^description:\s*\S/m);
  }
});

test("six template directories and core files exist", () => {
  for (const [name, files] of Object.entries(requiredTemplates)) {
    const templateRoot = join(root, "templates", name);
    assert.ok(existsSync(templateRoot), `missing template ${name}`);
    for (const file of files) assert.ok(existsSync(join(templateRoot, file)), `${name} missing ${file}`);
  }
});

test("template metadata reflects current React/Vite and Spring/Java baselines", async () => {
  const skill = await readFile(join(root, "skills", "scaffold-templates", "SKILL.md"), "utf8");
  assert.match(skill, /React 19/);
  assert.match(skill, /Vite 8/);
  assert.match(skill, /Java 25/);
  assert.match(skill, /Spring Boot 4\.0/);
  assert.doesNotMatch(skill, /React 18|Spring Boot 3\.4|Java 21/);
  const reactPkg = JSON.parse(await readFile(join(root, "templates/react-vite/package.json"), "utf8"));
  assert.match(reactPkg.dependencies.react, /^\^19/);
  assert.match(reactPkg.devDependencies.vite, /^\^8/);
  const springPom = await readFile(join(root, "templates/spring-boot/pom.xml"), "utf8");
  assert.match(springPom, /<version>4\.0\.0<\/version>/);
  assert.match(springPom, /<java\.version>25<\/java\.version>/);
});

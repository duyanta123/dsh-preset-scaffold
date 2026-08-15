/**
 * dsh-preset-scaffold — DSH (DeepSeek Harness) 插件入口。
 *
 * 复用官方 @deepseek-ai/dsh-skill-filesystem 提供者，把本包自带的 skills/
 * 目录注册为技能根（includeDefaultRoots: false，避免与宿主 profile 的
 * 技能根重复）。零构建：本 ESM 模块由 harness 直接加载。
 *
 * 模板资产 templates/ 与 skills/ 的相对位置在 preset 与 bundle 两种安装
 * 形态下保持一致，scaffold-templates 技能内 `../../templates` 的引用
 * 均可解析。
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { FileSystemSkillProvider } from "@deepseek-ai/dsh-skill-filesystem";

export const name = "dsh-preset-scaffold";
export const inject = ["skills"];

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(rootDir, "skills");

export function apply(ctx, config = {}) {
  let provider;
  ctx.skills.registerProvider((control) => {
    provider = new FileSystemSkillProvider(ctx, control, {
      providerName: "dsh-preset-scaffold",
      includeDefaultRoots: false,
      customSkillDirs: [skillsDir],
      ...config,
    });
    return provider;
  });
  ctx.effect(
    function* () {
      yield async () => {
        await provider?.dispose();
      };
    },
    "dsh-preset-scaffold skill provider"
  );
}

# AimatraLab 品牌迁移

品牌定位：AI-assisted materials research laboratory and scientific software platform。

短说明：AimatraLab develops practical tools for materials research, characterization, simulation, data analysis and scientific visualization.

保持原设计、页面路由、工具 ID、科学算法、注册表内容及 Windows 授权机制。主页、导航、页脚、About、各页面标题、SEO/Open Graph、工具截图、包名和发布文档统一使用 AimatraLab。图标延续原节点连线和颜色，仅将首字母换为 A。

## 文件与发布约定

- `docs/nexoralab-manifest.md` → `docs/aimatralab-manifest.md`
- `templates/nexoralab.json` → `templates/aimatralab.json`
- 新独立项目使用 `aimatralab.json`。
- 未来工作流名称：`publish-to-aimatralab`。
- 发布指令：`Publish this project to AimatraLab.`

## GitHub 与路径

本次不自动改名 GitHub 仓库或本地工作区目录。网站继续部署在 [当前地址](https://bingule.github.io/NexoraLab/)，仓库及已发布下载地址继续使用 `Bingule/NexoraLab`。这些是现有 URL 的兼容名称，而不是可见品牌。

GitHub Actions 从实际仓库名生成 `NEXT_PUBLIC_BASE_PATH`，从 `actions/configure-pages` 的 `base_url` 设置 `NEXT_PUBLIC_SITE_URL`。页面 canonical、Open Graph URL 与 sitemap 使用该实际 URL，不写死未来的地址。根路径和子路径资产沿用 `asset()` 与 Next.js basePath，没有另设 assetPrefix。

仓库同步改名时：

1. GitHub **Settings → General → Repository name**：将 `NexoraLab` 改为 `AimatraLab`。
2. 更新本地 remote：`git remote set-url origin https://github.com/Bingule/AimatraLab.git`。
3. 在 **Actions → Deploy AimatraLab to GitHub Pages → Run workflow** 重新部署。页面路径会改为 `/AimatraLab/`，新网址为 `https://bingule.github.io/AimatraLab/`。
4. 将 README 和 `lib/site.ts` 的本地构建默认网址改为新地址，并更新 `content/tools/` 中指向本站仓库的 GitHub/Release/下载 URL。其余独立工具仓库和工具 ID 保持不变。
5. 复核新网址、图片、导航和历史下载。GitHub 仓库链接有改名重定向，GitHub Pages 的项目网址没有自动重定向，见 [GitHub 官方说明](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository)。

## 有意保留的兼容名称

- 旧仓库、Pages 路径和历史 Release 链接；历史 ZIP 原样保留，不覆盖已发布附件。
- `nexoralab.json`：当独立项目没有 `aimatralab.json` 时作为导入回退；新清单优先。
- `nexoralab-language`：迁移用户已保存的语言选择，并兼容旧独立 iframe 应用的消息协议；新存储键和主消息类型为 `aimatralab-language`。未保存选择时默认中文。
- 历史迁移记录中的部署路径：表示当时验证的真实路径。已发布科学文件来源和哈希记录不改写。

改名检查覆盖所有页面的生产导出、图片和内部链接，以及旧/新两种 base path。科学工具沿用既有数值测试和来源哈希检查。

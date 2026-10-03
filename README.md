# AimatraLab

[网站](https://bingule.github.io/NexoraLab/) · [GitHub 仓库](https://github.com/Bingule/NexoraLab)

由 Bing Wu 创立的 AI 辅助材料研究实验室与科学软件平台，开发面向材料研究、表征、模拟、数据分析与科学可视化的实用工具。

AimatraLab develops practical tools for materials research, characterization, simulation, data analysis and scientific visualization.

AI-assisted tools for materials research · Explore · Analyze · Simulate · Build

采用 Next.js、TypeScript 和普通 CSS，构建为静态网站；主站没有数据库或登录。已发布工具保留各自的运行方式，科学单位换算器在浏览器本地计算，CrystalDesk Windows 离线版需要机器码激活。规划中的工具仍明确标注为规划中。创始人照片来自用户提供的原始图片。

## 本地运行

需要 Node.js 22.18 或更新版本及 npm。

```sh
npm install
npm run dev
```

打开 http://127.0.0.1:3000 。

Windows 当前工作区依赖已安装，可直接双击 `start.cmd`，或在本目录终端运行 `.\start.cmd`。它优先使用系统 Node.js，也兼容 Codex 提供的 Node.js，无需全局 npm 即可启动现有安装。

```sh
npm test
npm run typecheck
npm run check:publication
npm run build
npm run check:links
npm run preview
```

构建产物位于 `out/`；预览地址为 http://127.0.0.1:4173 。预览脚本仅用于本地检查，不是生产后端。若 4173 已占用，可用环境变量 `PORT` 指定其他端口。

## 注册下一个工具

1. 在独立软件目录内维护 `aimatralab.json`，填写版本、截图、GitHub Release 与直接下载地址。
2. 在 AimatraLab 目录执行 `npm run register -- "D:/projects/MyTool" --dry-run` 预检，然后去掉 `--dry-run` 导入。更新已有工具加 `--replace`。
3. 在线工具可声明 `web: "dist/index.html"`；导入网页构建后自动生成 `/lab/<id>/`。桌面工具只需清单与下载链接，不需要网页文件。
4. 执行测试、类型检查、构建和链接检查，然后提交推送；GitHub Pages 会更新目录、详情页与最新发布。

软件源代码留在各自项目。导入命令仅复制清单、声明的图片和网页发布产物，不自动编译、创建仓库或发布 Release。完整流程与示例见 [docs/aimatralab-manifest.md](docs/aimatralab-manifest.md)。

新项目使用 `aimatralab.json`；旧项目的 `nexoralab.json` 仍可导入，同时存在时优先使用新清单。未来工作流名称为 `publish-to-aimatralab`，项目发布指令使用 “Publish this project to AimatraLab.”。

Windows 客户端保留现有机器码激活，在清单中设置 `windowsActivationRequired: true`。客户端通过 GitHub Releases 分发；签发器、私钥、主密钥和客户授权记录留在私有目录，激活由开发者手动签发。网站不提供激活签发或支付后端。

## TMCCDB 工具来源

五个既有工具接入 `/lab/`，上游科学代码固定在 `vendor/tmccdb/`，来源提交及哈希见 `vendor/tmccdb/UPSTREAM.json`。更新来源时需保留原项目，明确记录集成差异，运行 `npm run test:tmcc` 和 `npm test` 后再发布。Crystal Description 使用原 Streamlit 服务；Reviewer Two 标记为 `skill`，原 `/lab/reviewer-two/` 提供双语安装与使用指南，审阅在获授权的私有宿主执行。Skill 的版本与更新仍在注册表登记，不计入在线工具数量。无需在 AimatraLab 配置 API 密钥。详见 [迁移说明](docs/tmccdb-migration-report.md)。

## GitHub Pages

已包含 `.github/workflows/deploy.yml`，发布源使用 **GitHub Actions**。推送到 `main` 会自动触发测试、检查、构建和部署，网站发布到 https://bingule.github.io/NexoraLab/ 。首次部署或迁移仓库时，在 GitHub **Settings → Pages → Source** 选择 **GitHub Actions**。

默认使用实际仓库名作为 base path。当前 GitHub 仓库名称仍为 `NexoraLab`，因此网站路径保持 `/NexoraLab/`；该名称仅作为部署与历史下载链接的兼容路径，不作为网站品牌。用户名站点（`username.github.io`）自动使用根路径。自定义域名时，在仓库的 **Settings → Secrets and variables → Actions → Variables** 中设置 `PAGES_CUSTOM_DOMAIN=true`，并在 Pages 设置域名、按 GitHub 指引配置 DNS，工作流会改用根路径。

工作流从 `actions/configure-pages` 的 `base_url` 获取 `NEXT_PUBLIC_SITE_URL`，用于页面 canonical、Open Graph URL 和 sitemap；`NEXT_PUBLIC_BASE_PATH` 继续由实际仓库名或自定义域名配置生成。没有单独设置 `assetPrefix`，Next.js 的 basePath 与现有资产路径函数负责子路径资源。

如需仓库同步改名，在 GitHub **Settings → General → Repository name** 将 `NexoraLab` 改为 `AimatraLab`，更新本地 remote，并在 Actions 手动运行部署。新网址为 `https://bingule.github.io/AimatraLab/`。详情及保留的兼容名称见 [品牌迁移说明](docs/brand-rename.md)。GitHub Pages 的旧项目网址不会自动重定向；仓库改名和重新部署应一起完成。

其他静态托管直接发布 `out/`，并设置对应的 `NEXT_PUBLIC_SITE_URL`。本地测试未来的新路径：PowerShell 中设置 `$env:NEXT_PUBLIC_BASE_PATH='/AimatraLab'` 和 `$env:NEXT_PUBLIC_SITE_URL='https://bingule.github.io/AimatraLab/'`，再运行 `npm run build`、`npm run check:links`、`npm run preview` 并访问 `/AimatraLab/`。当前部署测试使用 `/NexoraLab` 与对应的实际网址。测试后用 `Remove-Item Env:NEXT_PUBLIC_BASE_PATH,Env:NEXT_PUBLIC_SITE_URL` 恢复。

## 主要文件

- `app/`：页面与样式
- `components/`：共享组件
- `content/tools/`：软件注册表，每个软件一个 JSON
- `lib/manifest.ts`：元数据格式与校验
- `public/founder/`：创始人照片
- `public/tools/`：可选软件展示资源
- `templates/aimatralab.json`：独立软件项目使用的模板

网站支持中文/英文切换并记住选择，首次访问默认英文；文档为中文。工具原名保留，中文描述通过清单中的可选 `zh` 提供。Google Scholar、GitHub、ORCID、Email、CV 当前是无链接的“待添加”文本；提供真实 URL 后可在 `components/Founder.tsx` 替换。

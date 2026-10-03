# NexoraLab

[网站](https://bingule.github.io/NexoraLab/) · [GitHub 仓库](https://github.com/Bingule/NexoraLab)

Bing Wu 创立的在线材料科学实验室与科研软件平台。首版包括首页、可搜索和筛选的软件目录、Online Lab、研究方向、创始人介绍和由 JSON 自动生成的软件详情页。

采用 Next.js、TypeScript 和普通 CSS，构建为静态网站；没有数据库、登录或计算后端。科学单位换算器已可在线使用与离线下载；五个尚未发布的工具明确标注为规划中。创始人照片来自用户提供的原始图片。

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
npm run build
npm run check:links
npm run preview
```

构建产物位于 `out/`；预览地址为 http://127.0.0.1:4173 。预览脚本仅用于本地检查，不是生产后端。若 4173 已占用，可用环境变量 `PORT` 指定其他端口。

## 注册下一个工具

1. 在独立软件目录内维护 `nexoralab.json`，填写版本、截图、GitHub Release 与直接下载地址。
2. 在 NexoraLab 目录执行 `npm run register -- "D:/projects/MyTool" --dry-run` 预检，然后去掉 `--dry-run` 导入。更新已有工具加 `--replace`。
3. 在线工具可声明 `web: "dist/index.html"`；导入网页构建后自动生成 `/lab/<id>/`。桌面工具只需清单与下载链接，不需要网页文件。
4. 执行测试、类型检查、构建和链接检查，然后提交推送；GitHub Pages 会更新目录、详情页与最新发布。

软件源代码留在各自项目。导入命令仅复制清单、声明的图片和网页发布产物，不自动编译、创建仓库或发布 Release。完整流程与示例见 [docs/nexoralab-manifest.md](docs/nexoralab-manifest.md)。

## GitHub Pages

已包含 `.github/workflows/deploy.yml`，发布源使用 **GitHub Actions**。推送到 `main` 会自动触发测试、检查、构建和部署，网站发布到 https://bingule.github.io/NexoraLab/ 。首次部署或迁移仓库时，在 GitHub **Settings → Pages → Source** 选择 **GitHub Actions**。

默认使用仓库名作为 base path，例如 `/NexoraLab`；用户名站点（`username.github.io`）自动使用根路径。自定义域名时，在仓库的 **Settings → Secrets and variables → Actions → Variables** 中设置 `PAGES_CUSTOM_DOMAIN=true`，并在 Pages 设置域名、按 GitHub 指引配置 DNS，工作流会改用根路径。

其他静态托管直接发布 `out/`。本地测试子路径部署：PowerShell 中设置 `$env:NEXT_PUBLIC_BASE_PATH='/NexoraLab'`，再运行 `npm run build`、`npm run preview` 并访问 `/NexoraLab/`；测试后用 `Remove-Item Env:NEXT_PUBLIC_BASE_PATH` 恢复。

## 主要文件

- `app/`：页面与样式
- `components/`：共享组件
- `content/tools/`：软件注册表，每个软件一个 JSON
- `lib/manifest.ts`：元数据格式与校验
- `public/founder/`：创始人照片
- `public/tools/`：可选软件展示资源
- `templates/nexoralab.json`：独立软件项目使用的模板

网站支持中文/英文切换并记住选择，首次访问默认英文；文档为中文。工具原名保留，中文描述通过清单中的可选 `zh` 提供。Google Scholar、GitHub、ORCID、Email、CV 当前是无链接的“待添加”文本；提供真实 URL 后可在 `components/Founder.tsx` 替换。

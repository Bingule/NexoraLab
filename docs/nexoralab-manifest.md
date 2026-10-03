# NexoraLab 软件发布约定

每个科学软件保持独立项目。在软件项目根目录维护 `nexoralab.json`；NexoraLab 只保存其发布元数据副本和展示资源，不复制源代码，不负责构建软件。

## 文件格式

从 `templates/nexoralab.json` 复制模板。UTF-8 编码，标准 JSON，不包含注释或尾随逗号。

| 字段 | 含义 |
| --- | --- |
| `id` | 必填。唯一、小写、数字和连字符，例如 `xrd-analyzer`，发布后尽量不改动 |
| `name` | 必填。软件显示名称 |
| `version` | 必填。软件发布版本，建议语义版本，例如 `1.0.0` |
| `category` | 必填。`structure` / `diffraction` / `microscopy` / `electrochemistry` / `simulation` / `utilities` |
| `type` | 必填。`desktop` / `online` / `hybrid` |
| `description` | 必填。简短、准确描述，避免未经验证的功能声明 |
| `platforms` | 必填。字符串数组，如 `["Windows", "Web"]` 或 `["Python"]` |
| `icon` | 可选。空字符串、HTTPS 地址、站内绝对路径或资源文件名 |
| `screenshots` | 必填数组。可为空；支持 HTTPS 地址、站内绝对路径或文件名 |
| `download` | 可选。直接下载 URL，推荐独立软件 GitHub Release 中的 `.exe` / `.zip` 资源地址 |
| `online` | 可选。可运行应用的 HTTPS URL 或真实的 `/lab/tool-name/` 路径 |
| `github` | 可选。独立软件仓库的 HTTPS URL |
| `documentation` | 可选。HTTPS 文档地址或已存在的站内资源路径 |
| `citation` | 可选。引用文本或 DOI 引用信息，以纯文本呈现 |
| `demo` | 可选布尔值。展示用占位记录设为 `true`，真实软件设为 `false` |
| `featured` | 可选布尔值。首页展示最多三个精选工具 |
| `updated` | 可选。`YYYY-MM-DD`，用于最新动态排序 |
| `developer` | 可选。开发者名称 |
| `features` | 可选字符串数组。真实、已验证的功能 |
| `history` | 可选数组：`[{"version":"1.0.0","date":"2026-10-03","notes":"首次发布"}]` |

链接仅接受 HTTPS 或以单个 `/` 开头的站内路径。空 URL 隐藏相应操作按钮；不要填写 `#`、虚构地址、`javascript:` 或不存在的下载。

示例 `0.0.0` 是演示版本，不代表真实发布。网站不会仅凭 `type` 自动声称工具可用，也不会将演示工作区作为可运行科学软件。

## 最小发布步骤

1. 在独立软件项目内填写 `nexoralab.json`，准备真实图标、截图、文档和发布包。
2. 发布包由软件项目自行发布。桌面程序推荐使用 GitHub Releases，设置 `download` 为对应文件的直接 URL。
3. 把元数据复制到 NexoraLab 的 `content/tools/<id>.json`。文件名必须与 `id` 相同。
4. 本地图标、截图复制到 `public/tools/<id>/`。例如 `icon: "icon.png"` 与 `screenshots: ["screenshot-1.png"]` 会分别解析为 `/tools/<id>/icon.png` 和 `/tools/<id>/screenshot-1.png`。嵌套资源路径可以使用 `screenshots/view.png`。
5. 运行 `npm test`、`npm run typecheck`、`npm run build`，检查页面与链接，再提交网站仓库。

仅添加一份 JSON 就能注册工具，目录、详情页和动态在构建时自动更新；使用外部图标或截图时也无需复制资源。修改 JSON 后开发环境刷新页面，正式网站重新构建部署。

## 浏览器工具集成

目前 `/lab/[id]` 为 `online`、`hybrid` 条目生成明确标注的工作区占位页面，不包含科学计算。Online Lab 页显示这些条目的工作区预览；真正可用的在线应用链接仍以 `online` 字段为准。

最简单的实际集成是填写独立应用的 HTTPS URL。若要把独立应用部署到本站 `/lab/tool-name/`，应先提供经过验证的浏览器构建，并单独实现对应入口，再把 `online` 指向它。不要仅填写 URL 就假设科学计算已接入。

## 未来 `publish-to-nexoralab` 工作流

未来 Codex 工作流可在独立软件目录内检查项目、维护 manifest、准备发布包与资源、更新注册表。此版本只定义约定，没有自动检查其他项目、编译软件、创建仓库或发布 GitHub Release。

构建会拒绝无效字段、重复 ID 和错误 URL。新增记录若失败，先根据错误检查 JSON；不要绕过校验。部署参考 Next.js [静态导出文档](https://nextjs.org/docs/app/guides/static-exports) 和官方 [GitHub Pages 示例](https://github.com/vercel/next.js/tree/canary/examples/github-pages)。

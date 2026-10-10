# AimatraLab 软件发布约定

每个科学软件保持独立项目。在软件项目根目录维护 `aimatralab.json`；AimatraLab 只保存其发布元数据副本、展示资源和静态网页构建，不迁移软件源代码，不负责构建软件。

## 文件格式

从 `templates/aimatralab.json` 复制模板。UTF-8 编码，标准 JSON，不包含注释或尾随逗号。

新软件项目统一使用 `aimatralab.json`。为兼容已发布的独立项目，导入脚本仍接受旧的 `nexoralab.json`；同一目录中有两份清单时优先校验和使用 `aimatralab.json`，不会用旧清单覆盖无效的新清单。项目发布指令为 “Publish this project to AimatraLab.”。

| 字段                        | 含义                                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `id`                        | 必填。唯一、小写、数字和连字符，例如 `xrd-analyzer`，发布后尽量不改动                              |
| `name`                      | 必填。软件显示名称                                                                                 |
| `version`                   | 必填。软件发布版本，建议语义版本，例如 `1.0.0`                                                     |
| `category`                  | 必填。`structure` / `diffraction` / `microscopy` / `electrochemistry` / `simulation` / `utilities` |
| `type`                      | 必填。`desktop` / `online` / `hybrid` / `skill`（宿主中的 AI 技能）                                |
| `description`               | 必填。简短、准确描述，避免未经验证的功能声明                                                       |
| `platforms`                 | 必填。字符串数组，如 `["Windows", "Web"]` 或 `["Python"]`                                          |
| `windowsActivationRequired` | 可选布尔值。现有机器码激活的 Windows 客户端填 `true`；仅用于桌面或混合工具，保留原授权机制         |
| `icon`                      | 可选。空字符串、HTTPS 地址、站内绝对路径或资源文件名                                               |
| `screenshots`               | 必填数组。可为空；支持 HTTPS 地址、站内绝对路径或文件名                                            |
| `offlineDownloadUnavailable` | 可选布尔值。离线版暂不开放下载时填 `true`，此时 `download` 必须为空；在线入口和版本历史仍可保留。 |
| `download`                  | 可选。直接下载 URL，推荐独立软件 GitHub Release 中的 `.exe` / `.zip` 资源地址                      |
| `online`                    | 可选。可运行应用的 HTTPS URL 或真实的 `/lab/tool-name/` 路径                                       |
| `github`                    | 可选。独立软件仓库的 HTTPS URL                                                                     |
| `documentation`             | 可选。HTTPS 文档地址或已存在的站内资源路径                                                         |
| `release`                   | 可选。GitHub Release 页面 URL，用于发布说明按钮                                                    |
| `web`                       | 可选。独立项目内的网页构建入口，如 `dist/index.html`；导入后转换为站内资产路径                     |
| `zh`                        | 可选。`description`、`features`（与英文顺序一致）、`historyNotes`（版本号到中文发布说明的映射）    |
| `citation`                  | 可选。引用文本或 DOI 引用信息，以纯文本呈现                                                        |
| `demo`                      | 可选布尔值。展示用占位记录设为 `true`，真实软件设为 `false`                                        |
| `featured`                  | 可选布尔值。首页展示最多三个精选工具                                                               |
| `updated`                   | 可选。`YYYY-MM-DD`，用于最新动态排序                                                               |
| `developer`                 | 可选。开发者名称                                                                                   |
| `features`                  | 可选字符串数组。真实、已验证的功能                                                                 |
| `history`                   | 可选数组：`[{"version":"1.0.0","date":"2026-10-03","notes":"首次发布"}]`                           |

链接仅接受 HTTPS 或以单个 `/` 开头的站内路径。空 URL 隐藏相应操作按钮；不要填写 `#`、虚构地址、`javascript:` 或不存在的下载。

Skill 使用 `type: "skill"`，`documentation` 填安装与使用指南，`online` 保持为空。具备有效指南的非演示 Skill 可显示为已发布，不计入在线工具数量；卡片提供“使用指南”。版本更新仍通过 `version`、`updated`、`history`、`zh.historyNotes` 和可选 `release` 登记，发布路径与其他工具相同。`web` 仅适用于在线或混合应用。

清单仅接受表中已定义的公开字段，禁止填入私钥、主密钥、激活码签发配置或客户授权记录。Windows 模板默认 `windowsActivationRequired: true`，该字段只展示授权说明，不参与或改变客户端验证。

## Windows 授权与公开发布边界

现有机器码激活必须保留：用户下载客户端 → 首次启动获得 Machine ID → 发给开发者 → 开发者手动签发激活码/授权文件 → 客户端输入或导入 → 在该机器激活。CrystalDesk 的现有流程导入 `.cdlicense` 文件；网站不签发授权、不接收机器码，不增加支付后端。

填写 `windowsActivationRequired: true` 后，工具卡片和详情页显示 **Windows version — activation required**（中文：Windows 版 — 需要激活）。下载链接可以公开，但使用需要有效授权。Windows 发布包上线前保持 `download` 为空；不能把未提供的下载标为已发布。

公开 GitHub 仓库只存展示资源、元数据和允许公开的代码。Windows 可分发客户端只作为 GitHub Release 附件；签发器、私有签发逻辑、私钥、主密钥、客户记录、已签发授权，以及包含这些内容的 owner ZIP 均留在独立私有目录。客户端可保留验签公钥和原验证逻辑，不得替换成免激活版本。不要将独立软件的私有源仓库或历史推送到 AimatraLab。

发布前对准确的客户端安装包/ZIP 做文件审计并实际验证首次启动、拒绝无效/错误机器授权、有效激活与重启加载授权。包名相近的未授权版与 owner 包不能替代授权客户端。当前网站的 `.gitignore` 和 `npm run check:publication` 拦截已知签发文件名、私钥文本及授权记录；导入网页构建时也检查这类内容，并拒绝打包二进制/归档。检查属于已配置特征的预检，不能代替发布包内容和实际激活行为的验证。

示例 `0.0.0` 是演示版本，不代表真实发布。网站不会仅凭 `type` 自动声称工具可用，也不会将演示工作区作为可运行科学软件。

## 完整发布路径（手动、可复用）

**独立本地项目 → aimatralab.json → 注册表 → 工具详情页 → GitHub Release / 下载。**

1. 在软件项目中完成并验证可发布版本，保留原目录与原仓库。复制模板为根目录 `aimatralab.json`，准备截图。
2. 手动在该软件仓库创建 GitHub Release，上传真实 `.exe` / `.zip` 等发布包。网站不替你编译软件。将 `release` 设置为 Release 页，`download` 设置为附件直接下载地址（不是 Release 页）：
   - `release`: `https://github.com/<owner>/<repo>/releases/tag/v1.0.0`
   - `download`: `https://github.com/<owner>/<repo>/releases/download/v1.0.0/<actual-filename>.zip`
3. 填写实际 `version`、`updated`、`features`、`history`，将 `demo` 设为 `false`。`history` 按最新在前排列；发布说明描述用户能使用的新功能，例如 “Added CSV export”，不用内部任务记录。首页最新动态仅显示真实版本历史。
4. 在 AimatraLab 目录执行：

```sh
npm run register -- "D:/projects/MyTool" --dry-run
npm run register -- "D:/projects/MyTool"
# 更新已有工具（明确替换）
npm run register -- "D:/projects/MyTool/aimatralab.json" --replace
npm test
npm run typecheck
npm run build
npm run check:links
```

导入命令校验字段、图片和网页文件后，写入 `content/tools/<id>.json`，将清单中的本地图标/截图复制到 `public/tools/<id>/`。路径相对独立项目清单目录，不允许越界或符号链接。HTTPS 图片可直接使用，无需复制。图标/截图用 PNG、JPEG、WebP、GIF 或 SVG。文件名必须与 `id` 一致。缺失的文件和错误 URL 会在写入前报错；`--dry-run` 不修改网站。`--replace` 仅替换该工具，不删除其他注册条目。

5. 本地检查 `/tools/<id>/` 的截图、版本、在线和下载按钮，打开下载确认发布包能使用。提交推送网站 `main` 后 GitHub Actions 自动构建部署。不要发布仍然指向不存在附件的下载 URL。

桌面工具只需一个清单和可选图片；无需在 AimatraLab 增加新页面组件。`featured: true` 会进入首页精选（最多三个，真实版本优先）。清单更新即可改变截图、版本、按钮，无需改布局。

## 浏览器工具

两种简单方式：

- 独立托管：设置 `online` 为工具的 HTTPS 地址。
- 本站托管：设置 `web: "dist/index.html"`。`dist/` 必须是独立、已经构建好的静态网页目录，包含全部运行资源，使用相对资源 URL。不要指向项目根目录，不要放开发依赖、密钥、私有数据或服务器代码。导入命令只复制这个构建目录到 `public/tools/<id>/app/`，自动设置 `online: "/lab/<id>/"`，通用工作区通过沙箱 iframe 加载应用。

iframe 允许脚本，使用隔离来源，不允许访问主站存储、导航主站或弹窗。需要这些权限的应用应独立托管，使用 `online` 链接。工具可选读取 `?lang=en` / `?lang=zh` 初始化语言。网站之后切换语言时，向 iframe 发送 `{ type: "aimatralab-language", language: "zh" }`（或 `"en"）的 `postMessage`；工具仅接受 `event.source === parent` 且内容匹配的消息，更新文本即可，无需重新加载或清空输入。Scientific Unit Converter 已实现此约定；独立应用也可提供自己的语言按钮。

## 已验证的首个发布

[Scientific Unit Converter 1.0.0](https://bingule.github.io/NexoraLab/tools/scientific-unit-converter/) 使用此路径发布：独立本地文件夹中的 `aimatralab.json` 与 `dist/` → 导入脚本 → `content/tools/scientific-unit-converter.json` → 详情和在线工作区 → [GitHub Release](https://github.com/Bingule/NexoraLab/releases/tag/scientific-unit-converter-v1.0.0)。

首个轻量工具的历史发布包保留在网站仓库的独立命名标签 `scientific-unit-converter-v1.0.0` 下；以后已有软件直接链接各自仓库的 Release，不需迁移源代码或新建仓库。历史 ZIP 原样保留其中的 `nexoralab.json` 和旧版界面，避免覆盖已发布文件；新项目和后续发布使用 `aimatralab.json`。解压后打开 `dist/index.html` 即可离线运行。当前 GitHub 仓库名和下载路径仍保留 `NexoraLab`，仅用于兼容，见 [品牌迁移说明](brand-rename.md)。

## 中英文内容

主站提供中文/英文按钮，记住手动选择。未选择时默认英文。静态 HTML 默认英文，客户端加载后恢复用户手动选择；本轮无需服务器国际化或重复路由。工具名称和单位符号保持原名，中文字段缺省时回退英文。示例：

```json
"zh": {
  "description": "面向材料研究的实用工具。",
  "features": ["读取实际支持的文件格式"],
  "historyNotes": { "1.0.0": "首个版本已上线，可在线使用和下载。" }
}
```

研究分类和中英文短说明维护在 `lib/research.ts`。

## 后续扩展

本轮提供显式手动导入命令，没有自动扫描其他项目、编译软件、创建仓库或自动发 Release。未来 `publish-to-aimatralab` 工作流可以复用此命令。构建会拒绝无效字段、重复 ID 和错误 URL。部署参考 Next.js [静态导出文档](https://nextjs.org/docs/app/guides/static-exports)。

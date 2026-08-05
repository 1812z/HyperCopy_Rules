# 上传规则

当你测试好一条规则并希望分享给所有用户时，可以提交到云端规则仓库 [HyperCopy_Rules](https://github.com/1812z/HyperCopy_Rules)。通过 Pull Request（PR）提交后，审核合并即可进入云端下载列表，其他用户在应用内「下载云端规则」时就能直接获取。

## 前置准备

1. 注册一个 GitHub 账号（已有可跳过）
2. 打开 [HyperCopy_Rules 仓库](https://github.com/1812z/HyperCopy_Rules)，点击右上角 `Star` 方便后续查找

## 命名规范

规则文件统一使用 `配置名称_应用包名.json` 格式：

- **配置名称**：便于识别的名称，可与规则内的 `name` 字段不同，仅用于云端仓库列表展示
- **应用包名**：目标 App 的包名，例如 `tv.danmaku.bili`、`com.ss.android.ugc.aweme`

示例：`B站视频_tv.danmaku.bili.json`、`抖音_com.ss.android.ugc.aweme.json`

## 文件存放位置

根据规则类型放到对应文件夹：

- 链接跳转规则（`category: "link"`）→ 放到 `link` 文件夹
- 口令/文本识别规则（`category: "text"` 或 `address`）→ 放到 `text` 文件夹

## 提交步骤

### 第一步：Fork 仓库

1. 打开 [https://github.com/1812z/HyperCopy_Rules](https://github.com/1812z/HyperCopy_Rules)
2. 点击右上角 `Fork` 按钮，将仓库复制到你的账号下

### 第二步：上传规则文件

1. 进入你 Fork 的仓库
2. 进入 `link` 或 `text` 文件夹（根据规则类型选择）
3. 点击 `Add file` → `Upload files`
4. 将你的 `.json` 规则文件拖入或选择上传
5. 在下方填写提交信息，例如 `添加 B站视频规则`
6. 点击 `Commit changes`

### 第三步：发起 Pull Request

1. 回到你 Fork 的仓库主页
2. 点击 `Contribute` → `Open pull request`
3. 确认比较方向：base 仓库为 `1812z/HyperCopy_Rules` 的 `main` 分支，head 为你的仓库分支
4. 填写 PR 标题，例如 `新增 B站视频跳转规则`
5. 在描述中说明规则用途、测试链接和预期效果，方便审核
6. 点击 `Create pull request`

::: tip PR 描述模板
```markdown
## 规则说明
- 规则名称：B站视频
- 目标应用：哔哩哔哩（tv.danmaku.bili）
- 执行模式：parse_and_open

## 测试用例
- 复制内容：https://www.bilibili.com/video/BV1xx
- 预期结果：打开哔哩哔哩 App 对应视频
```
:::

### 第四步：等待审核

提交后会由仓库维护者审核。审核通过并合并后，规则即进入云端仓库，所有用户都能在应用内「下载云端规则」获取。

## 注意事项

- 提交前请先在本地测试规则，确保可正常跳转（测试方法见[制作规则](./rule-creation)页面）
- 规则文件需为合法 JSON 格式，字段完整
- 同一应用的相同功能规则若已存在，建议在原规则基础上修改而非重复提交
- 包名需与目标 App 实际包名一致，否则跳转无效

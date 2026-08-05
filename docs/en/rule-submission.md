# Submitting Rules

When you've tested a rule and want to share it with all users, you can submit it to the cloud rules repository [HyperCopy_Rules](https://github.com/1812z/HyperCopy_Rules). After submitting via Pull Request (PR) and getting it merged, the rule enters the cloud download list — other users can fetch it directly via "Download Cloud Rules" in the app.

## Prerequisites

1. Register a GitHub account (skip if you already have one)
2. Open the [HyperCopy_Rules repository](https://github.com/1812z/HyperCopy_Rules) and tap `Star` for easy access later

## Naming Convention

Rule files use the `RuleName_PackageName.json` format:

- **Rule Name**: An identifiable name — may differ from the `name` field inside the rule; only used for the cloud repository list display
- **Package Name**: The target app's package name, e.g. `tv.danmaku.bili`, `com.ss.android.ugc.aweme`

Examples: `Bilibili_tv.danmaku.bili.json`, `Douyin_com.ss.android.ugc.aweme.json`

## File Location

Place the file in the corresponding folder based on the rule type:

- Link redirect rules (`category: "link"`) → put in the `link` folder
- Password/text recognition rules (`category: "text"` or `address`) → put in the `text` folder

## Submission Steps

### Step 1: Fork the Repository

1. Open [https://github.com/1812z/HyperCopy_Rules](https://github.com/1812z/HyperCopy_Rules)
2. Tap `Fork` in the top-right to copy the repository to your account

### Step 2: Upload the Rule File

1. Open your forked repository
2. Navigate to the `link` or `text` folder (based on the rule type)
3. Tap `Add file` → `Upload files`
4. Drag in or select your `.json` rule file
5. Fill in the commit message below, e.g. `Add Bilibili video rule`
6. Tap `Commit changes`

### Step 3: Open a Pull Request

1. Go back to your forked repository's homepage
2. Tap `Contribute` → `Open pull request`
3. Confirm the comparison direction: base repository is `1812z/HyperCopy_Rules` `main` branch, head is your fork's branch
4. Fill in the PR title, e.g. `Add Bilibili video redirect rule`
5. In the description, explain the rule's purpose, test link, and expected result for easier review
6. Tap `Create pull request`

::: tip PR Description Template
```markdown
## Rule Details
- Rule name: Bilibili Video
- Target app: Bilibili (tv.danmaku.bili)
- Action mode: parse_and_open

## Test Case
- Copied content: https://www.bilibili.com/video/BV1xx
- Expected result: Open the video in the Bilibili app
```
:::

### Step 4: Wait for Review

After submission, the repository maintainer will review it. Once approved and merged, the rule enters the cloud repository — all users can fetch it via "Download Cloud Rules" in the app.

## Notes

- Test the rule locally before submitting to ensure it redirects correctly (see the [Creating Rules](./rule-creation) page for testing methods)
- The rule file must be valid JSON with complete fields
- If a similar rule for the same app already exists, consider modifying the original instead of submitting a duplicate
- The package name must match the target app's actual package name, otherwise the redirect won't work

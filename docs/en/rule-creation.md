# Creating Rules

HyperCopy supports custom rules, allowing you to write copy-to-open logic for any app. This page covers how to create and test rules — no low-level knowledge required.

## Creating Rules

Tap the `+` button in the bottom-right corner of the **Rules** page to reveal two options:

- **Simulated Browser**: Automatically captures web redirects, ideal for extracting app deep links from share URLs
- **Add Rule**: Manually fill in rule fields, suitable when you already know the target redirect template

### Method 1: Simulated Browser Capture

Use this when a short link requires a web redirect to obtain the app deep link, such as Douyin or Xiaohongshu share links.

1. Tap `+` → select "Simulated Browser"
2. Paste a share link or web address into the address bar
3. Wait for the page to load
4. Tap the "Open in App" button on the web page
5. The app automatically intercepts non-web redirects like `bilibili://`, `snssdk1128://`, `intent://`
6. The page displays the **source URL** and **target redirect address** (long-press to copy)
7. Tap "Add Rule" — the source and redirect info are auto-filled into the rule editor
8. Review the matching conditions, supplement as needed, and save

::: tip
The simulated browser runs entirely within the app — no system browser pops up. It's great for repeatedly capturing redirect addresses from different links.
:::

### Method 2: Manual Creation

Use this when you already know the target app's redirect template and want to fill in the rule directly.

1. Tap `+` → select "Add Rule"
2. Fill in the rule fields (see below)
3. Save the rule

#### Rule Fields

| Field | Purpose | Example |
|-------|---------|---------|
| Rule Name | For easy identification | Bilibili Video |
| Action Mode | Determines how copied content is processed | See below |
| Match Regex | Checks if copied content matches this rule | `.*bilibili\.com.*` |
| Parameter Regex | Extracts parameters from copied content | `.*\/video\/(BV[0-9A-Za-z]+).*` |
| Target Template | Builds the final redirect address | `bilibili://video/${p1}` |
| Package Name | The target app's package name | `tv.danmaku.bili` |

### Choosing an Action Mode

Pick the processing method based on the type of copied content:

- **Parse and Open** (`parse_and_open`): The copied content contains an ID that needs to be extracted and inserted into the template. For example, copy `bilibili.com/video/BV1xx`, extract `BV1xx`, then open `bilibili://video/BV1xx`
- **Direct Open** (`direct_open`): The target app can recognize the content on its own, so pass it directly. For example, copy an address text and let Amap search for it
- **WebView Resolve and Open** (`webview_resolve_and_open`): Short links must go through a web redirect to obtain the app deep link. For example, Douyin `v.douyin.com` short links

### Template Variables

Use the following variables in the target template to substitute content:

| Variable | Meaning |
|----------|---------|
| `${p1}`, `${p2}` | The 1st and 2nd parameters extracted by the parameter regex |
| `${input}` | The original copied content |
| `${redirectUrl}` | The redirected URL resolved by WebView (WebView mode only) |

### Example Rules

**Bilibili Video** (Parse and Open)

Copy `https://www.bilibili.com/video/BV1xx` → open the video in the Bilibili app

- Match regex: `.*bilibili\.com.*`
- Parameter regex: `.*\/video\/(BV[0-9A-Za-z]+).*`
- Target template: `bilibili://video/${p1}`
- Package name: `tv.danmaku.bili`

**Amap Address** (Direct Open)

Copy text containing "address", "province", or "city" → search directly in Amap

- Match regex: `(?=.*(地址|省|市|镇)).{10,}`
- Target template: `androidamap://poi?keywords=${input}`
- Package name: `com.autonavi.minimap`

**Douyin Short Link** (WebView Resolve and Open)

Copy `https://v.douyin.com/xxxxx` → resolve via WebView, then open in Douyin

- Match regex: `.*v\.douyin\.com.*`
- Target template: `snssdk1128://aweme/detail/${r1}`
- Package name: `com.ss.android.ugc.aweme`

## Testing Rules

After saving a rule, verify it works using the methods below.

### Copy Trigger Test

1. Copy a test text or link (e.g., share a Douyin video link)
2. Observe whether HyperCopy automatically recognizes and redirects to the target app
3. If no redirect occurs, check whether the match regex hits the copied content and whether the rule is enabled
4. If the redirect target is wrong, check the parameter regex and template variables

### Troubleshooting

- **Rule doesn't trigger**: Confirm the rule switch is on; verify the match regex matches the copied text
- **Wrong redirect target**: Check that the parameter regex capture groups correspond to the template variables `${p1}`, `${p2}`
- **Target app doesn't open**: Confirm the package name is correct and the target app is installed
- **Short link no response**: Short links require "WebView Resolve and Open" mode so the app can resolve the real redirect address first

import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../..')
const publicDir = path.join(root, 'docs', 'public', 'rules')
const srcDirs = ['link', 'text']
const index: { id?: string; name: string; category: string; file: string }[] = []

for (const dir of srcDirs) {
  const src = path.join(root, dir)
  const dest = path.join(publicDir, dir)
  if (!fs.existsSync(src)) continue
  fs.cpSync(src, dest, { recursive: true })
  const files = fs.readdirSync(src).filter(f => f.endsWith('.json'))
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(path.join(src, file), 'utf-8'))
    index.push({
      id: content.id,
      name: content.name,
      category: content.category,
      file: `rules/${dir}/${file}`
    })
  }
}
fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'index.json'), JSON.stringify(index, null, 2))

export default defineConfig({
  title: 'HyperCopy',
  description: '安卓通用复制直达增强模块',

  transformPageData(pageData) {
    if (pageData.relativePath === 'CHANGELOG.md') {
      pageData.frontmatter.outline = { level: 1 }
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://github.com/user-attachments/assets/dc034ec0-90cf-4371-9ab0-132ca2527b32' }]
  ],

  rewrites: {
    'en/getting-started.md': 'en/getting-started.md',
    'en/index.md': 'en/index.md'
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: nav('zh'),
        sidebar: sidebar('zh'),
        editLink: {
          pattern: 'https://github.com/1812z/HyperCopy/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页面'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: nav('en'),
        sidebar: sidebar('en'),
        editLink: {
          pattern: 'https://github.com/1812z/HyperCopy/edit/main/docs/en/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  },

  themeConfig: {
    logo: 'https://github.com/user-attachments/assets/dc034ec0-90cf-4371-9ab0-132ca2527b32',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/1812z/HyperCopy' }
    ],
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright 2026-present 1812z'
    }
  }
})

function nav(lang: string) {
  if (lang === 'zh') {
    return [
      { text: '快速上手', link: '/getting-started', activeMatch: '/getting-started' }
    ]
  }
  return [
    { text: 'Quick Start', link: '/en/getting-started', activeMatch: '/en/getting-started' }
  ]
}

function sidebar(lang: string) {
  if (lang === 'zh') {
    return [
      {
        text: '开始使用',
        items: [
          { text: '快速上手', link: '/getting-started' }
        ]
      }
    ]
  }
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Quick Start', link: '/en/getting-started' }
      ]
    }
  ]
}

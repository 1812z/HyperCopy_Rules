const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'docs', 'public', 'rules')
const srcDirs = ['link', 'text']

const index = []

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

fs.writeFileSync(path.join(publicDir, 'index.json'), JSON.stringify(index, null, 2))
console.log(`Copied rules and generated index.json (${index.length} rules)`)

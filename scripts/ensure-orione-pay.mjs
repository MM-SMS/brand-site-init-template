import { cpSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const dest = join('node_modules', 'orione-pay')
const nested = join(dest, 'packages', 'orione-pay')
const tmp = join('node_modules', '.orione-pay-pkg')

if (!existsSync(join(nested, 'package.json'))) process.exit(0)

rmSync(tmp, { recursive: true, force: true })
cpSync(nested, tmp, { recursive: true })
rmSync(dest, { recursive: true, force: true })
cpSync(tmp, dest, { recursive: true })
rmSync(tmp, { recursive: true, force: true })

// Pulls a DESIGN.md from the awesome-design-md collection (github.com/VoltAgent/awesome-design-md)
// into design/references/<name>.md so the brand's own DESIGN.md can borrow its tokens and rules.
// Run: node scripts/get-design-md.mjs linear.app stripe      (one or more names)
//      node scripts/get-design-md.mjs --list                  (all 84 names)
import { mkdirSync, writeFileSync } from 'node:fs'

const NAMES = ['1win', 'airbnb', 'airtable', 'aljazeera', 'apple', 'binance', 'bmw-m', 'bmw', 'bugatti', 'cal', 'claude', 'clay', 'clickhouse', 'cohere', 'coinbase', 'composio', 'cursor', 'dell-1996', 'dji', 'elevenlabs', 'expo', 'ferrari', 'figma', 'framer', 'hashicorp', 'hp', 'ibm', 'intercom', 'jobright', 'kraken', 'lamborghini', 'linear.app', 'lovable', 'mastercard', 'mercury', 'meta', 'minimax', 'mintlify', 'miro', 'mistral.ai', 'mongodb', 'mydealz', 'nerdwallet', 'nike', 'nintendo-2001', 'notion', 'nvidia', 'ollama', 'opencode.ai', 'oracle', 'oura', 'pinterest', 'playstation', 'posthog', 'raycast', 'renault', 'replicate', 'resend', 'revolut', 'runwayml', 'sanity', 'sap', 'sentry', 'shopify', 'slack', 'spacex', 'spotify', 'starbucks', 'stripe', 'supabase', 'superhuman', 'tesla', 'theverge', 'together.ai', 'uber', 'vercel', 'vodafone', 'voltagent', 'warp', 'webflow', 'wired', 'wise', 'x.ai', 'zapier']
const args = process.argv.slice(2)
if (!args.length || args.includes('--list')) { console.log(NAMES.join('\n')); process.exit(0) }
mkdirSync('design/references', { recursive: true })
for (const name of args) {
  const url = `https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/${name}/DESIGN.md`
  const res = await fetch(url)
  if (!res.ok) { console.error(`${name}: ${res.status} (run with --list to see the names)`); continue }
  const path = `design/references/${name}.md`
  writeFileSync(path, await res.text())
  console.log(`${path} ← ${url}`)
}

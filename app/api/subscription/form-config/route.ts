import { formConfigGetHandler } from '@/lib/subscribe-form-server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return formConfigGetHandler()
}

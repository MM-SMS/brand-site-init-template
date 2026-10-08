import { NextResponse } from 'next/server'
import { formConfigGetHandler, getSubscribeFormConfig } from '@/lib/subscribe-form-server'

export const dynamic = 'force-dynamic'

/**
 * The subscribe form asks this route for its Notion config on every page view,
 * so the answer comes from the 120-second cache and is cached by the CDN as
 * well; Notion itself is read at most once every two minutes per site.
 * `?fresh=1` keeps the live, uncached read for checking env + the DB row.
 */
export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get('fresh') === '1') return formConfigGetHandler()
  const config = await getSubscribeFormConfig()
  return NextResponse.json(
    { config, meta: { cached: true } },
    { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600' } },
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, name, state, plan, cohort } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await prisma.waitlistEntry.upsert({
      where: { email },
      update: { name, state, plan, cohort },
      create: { email, name, state, plan, cohort },
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

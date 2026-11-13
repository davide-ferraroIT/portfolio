import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Definizione rotte completamente bloccate
  const blockedRoutes = ['/alzati-lazzaro-world']

  // Controllo se la rotta attuale corrisponde a una di quelle bloccate
  // (il controllo gestisce sia la rotta esatta sia eventuali sotto-pagine)
  const isBlocked = blockedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isBlocked) {
    // fallback su pagina error404
    return NextResponse.rewrite(new URL('/_not-found', request.url))
  }

  // Se la rotta non è tra quelle bloccate, lascia passare la richiesta
  return NextResponse.next()
}

// Il "matcher" indica a Next.js su quali rotte far girare questo controllo.
// Inserendo solo le rotte interessate, evitiamo di rallentare il resto del sito
export const config = {
  matcher: [
    '/alzati-lazzaro-world/:path*',
  ],
}
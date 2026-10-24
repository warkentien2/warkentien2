import Link from 'next/link';
export default function Index() {
  return <html lang="en"><body><main id="main"><p>Philip Warkentien II</p>
    <h1>Choose your language / Escolha seu idioma</h1>
    <nav aria-label="Language"><Link href="/en/" lang="en">English</Link>{' · '}
      <Link href="/pt-BR/" lang="pt-BR">Português do Brasil</Link></nav>
  </main></body></html>;
}

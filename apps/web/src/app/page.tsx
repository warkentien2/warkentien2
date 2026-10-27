import Link from "next/link";
export default function Index() {
  return (
    <html lang="en">
      <body>
        <main id="main" className="language-page">
          <p className="technical">Philip Warkentien II / Staff UI Engineer</p>
          <p className="language-art" aria-hidden="true">
            Design <span>×</span>
            <br />
            Engineering.
          </p>
          <h1>
            Choose your language / <span lang="pt-BR">Escolha seu idioma</span>
          </h1>
          <nav aria-label="Language">
            <Link href="/en/" lang="en">
              English <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/pt-BR/" lang="pt-BR">
              Português do Brasil <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}

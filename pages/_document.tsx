import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
        <Html>
           <Head>
                <link rel="icon" href="/favicon_io/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
                {/*-- core js polyfills */}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/3.21.1/minified.min.js"></script>
            </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        </Html>
      )
  }
}

export default MyDocument
// pages/_document.js

import Document, {Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Pirates of the Arrland - Account</title>
          <meta name="description" content="Check your pirates on Pirates Of Arrland© account page"/>
          <meta property="og:image" content="https://arrland.app/wp-content/uploads/2021/10/pirat9.jpg"/>

          <link rel="icon" href="https://arrland.app/wp-content/uploads/2021/09/cropped-logo_alpha-32x32.png"
                sizes="32x32"/>
          <link rel="icon" href="https://arrland.app/wp-content/uploads/2021/09/cropped-logo_alpha-192x192.png"
                sizes="192x192"/>
          {/* eslint-disable-next-line @next/next/google-font-display */}
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"/>
          {/* eslint-disable-next-line @next/next/google-font-display */}
          <link href="https://fonts.googleapis.com/css2?family=MedievalSharp" rel="stylesheet"/>
        </Head>
        <body className="bg-elementor-1">
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument;

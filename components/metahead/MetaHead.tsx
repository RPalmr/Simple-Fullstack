import Head from 'next/head'
import React from 'react'
 
const MetaHead : React.FC = () => {
    return (
        <Head>
            <title>COSMIC</title>
            <meta name="description" content="Discover Creative Sounds" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
    )
}



export default MetaHead
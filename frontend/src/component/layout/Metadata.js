import { Helmet, HelmetProvider } from 'react-helmet-async';
import React from 'react'

function Metadata({title}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
    </Helmet>
    </HelmetProvider>
  )
}

export default Metadata
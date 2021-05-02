import React, { lazy, Suspense } from "react"
import Layout from "../components/layout"

const App = lazy(() => import("../features/location-weather"))

const WeatherPage = () => {
  const isSSR = typeof window === "undefined"
  return (
    <Layout>
      {!isSSR && (
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      )}
    </Layout>
  )
}

export default WeatherPage

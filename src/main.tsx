import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import "./index.css"

import { store } from "./store/store"
import Layout from "./components/Layout"
import { AppRoutes } from "./libraries/routes/AppRoutes"

const container = document.getElementById("root")

if (!container) {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

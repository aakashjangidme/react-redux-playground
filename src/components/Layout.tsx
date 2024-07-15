import React from "react"
import ErrorBoundary from "./ErrorBoundary"
import CssBaseline from "@mui/material/CssBaseline/CssBaseline"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.Fragment>
  )
}

export default Layout

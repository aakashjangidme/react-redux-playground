import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.Fragment>
  );
};

export default Layout;

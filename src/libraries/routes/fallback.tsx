import NotFound from "../../pages/NotFoundPage.js"

export const fallbackRoute = [
  {
    path: "*",
    element: <NotFound />,
  },
]

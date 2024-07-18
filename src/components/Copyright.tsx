export const Copyright = (props: any) => {
  return (
    <p className="text-center text-gray-500 text-sm" {...props}>
      {"Copyright © "}
      <a className="text-blue-600" href="https://mui.com/">
        React-Redux Playground
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  )
}

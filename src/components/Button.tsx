import Spinner from "./Spinner"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 text-white rounded ${disabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} ${className}`}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

export default Button

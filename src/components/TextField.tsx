interface TextFieldProps {
  id: string
  label: string
  name: string
  type?: string
  autoComplete?: string
  autoFocus?: boolean
  required?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  autoFocus = false,
  required = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      required={required}
    />
  </div>
)

export default TextField

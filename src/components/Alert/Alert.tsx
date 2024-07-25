interface AlertProps {
  severity: 'error' | 'warning' | 'info' | 'success'
  children: React.ReactNode
}

const Alert: React.FC<AlertProps> = ({ severity, children }) => {
  const colorMap = {
    error: 'bg-red-100 border border-red-400 text-red-700',
    warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border border-blue-400 text-blue-700',
    success: 'bg-green-100 border border-green-400 text-green-700',
  }

  return <div className={`${colorMap[severity]} px-4 py-3 rounded mt-4 mb-3`}>{children}</div>
}

export default Alert

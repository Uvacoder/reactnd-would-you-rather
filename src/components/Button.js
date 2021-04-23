import { classNames } from '../utils/helpers'

export default function Button({ children, type = "submit", disabled = false }) {
  return (
    <button
      type={type}
      className={classNames(
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700',
        "relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      )}
      disabled={disabled && 'disabled'}
    >
      {children}
    </button>
  )
}
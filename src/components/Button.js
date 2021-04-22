export default function Button({ children, type = "submit" }) {
  return (
    <button type={type} className="relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      {children}
    </button>
  )
}


export default function User(props) {
  const { user } = props
  return (
    <div className="flex items-center">
      <img
        className="h-8 w-8 rounded-full"
        src={user.avatarURL}
        alt=""
      />
      <span className="px-3 pl-2 text-sm font-bold">{user.name}</span>
    </div>
  )
}
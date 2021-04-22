

export default function User(props) {
  const { user, context } = props
  return (
    <div className="flex items-center">
      <img
        className="h-8 w-8 rounded-full"
        src={user.avatarURL}
        alt=""
      />
      <div className="px-3 pl-2">
        {context === 'by' && (
          <div className="text-xs">Written by</div>
        )}
        <div className="text-sm font-bold">{user.name}</div>
      </div>
    </div>
  )
}
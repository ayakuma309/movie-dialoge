import {  useUser } from "../../../lib/auth";

export default function UserPage() {
  const user = useUser();
  return (
    <div>
      {user ? (
        <div>
          <p>{user.uid}</p>
          <p>{user.displayName}</p>
        </div>
      ) : (
        <p>ロード中…</p>
      )}
    </div>
  )
}


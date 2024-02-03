import { UserStateType } from "../../app/types"
import { Button } from "./button"

interface HeaderProps {
  userState: UserStateType
}

export default function Header({ userState: user }: HeaderProps) {
  return (
    <div className="flex flex-row items-center justify-center h-12 border-b border-gray-300 bg-white">
      <div className=" flex flex-row items-center justify-between mx-2 lg:mx-0 w-screen sm:min-w-0 md:min-w-[640px] max-w-[1024px]">
        <div className=" flex flex-row items-center">
          <img src="./logo.png" className="mr-2" alt="Lizst logo"/>
          <h1 className=" font-bold hidden sm:block">Lizst</h1>
        </div>
        <div className=" flex flex-row items-center">
          {
            user.status == 'loading' && <p>Loading...</p>
          }
          {
            user.status == 'success' && <><p>{user.user?.username}</p><Button className="ml-2">Sign out</Button></>
          }
        </div>
      </div>
    </div>
  )
}
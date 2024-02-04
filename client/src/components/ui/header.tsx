import { useAuthStore } from "@/app/stores"
import { UserStateType } from "../../app/types"
import { Button } from "./button"
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface HeaderProps {
  userState: UserStateType,
}

export default function Header({ userState: user }: HeaderProps) {
  const [signingOut, setSigningOut] = useState(false);

  const { signout } = useAuthStore();

  const handleSignout = () => {
    setSigningOut(true);
    setTimeout(signout, 1500);
  }

  return (
    <div className="flex flex-row items-center justify-center h-12 border-b border-gray-300 bg-white">
      <div className=" flex flex-row items-center justify-between mx-2 lg:mx-0 w-screen sm:min-w-0 md:min-w-[640px] max-w-[1024px]">
        <div className=" flex flex-row items-center select-none">
          <img src="./logo.png" className="mr-2" alt="Lizst logo"/>
          <h1 className=" font-bold hidden sm:block">Lizst</h1>
        </div>
        <div className=" flex flex-row items-center">
          {
            user && 
            <>
              <p>{user.user?.username}</p>
              <Button variant="outline" onClick={signingOut ? ()=> {} : handleSignout} className="ml-2">
                {signingOut && <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.5" wrapperStyle={{}} wrapperClass="mr-2"/>}
                {signingOut ? "Signing Out..." : "Sign out"}
              </Button>
            </>
          }
        </div>
      </div>
    </div>
  )
}
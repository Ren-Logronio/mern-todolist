type DashProps = {
    children: React.ReactNode
  }
  
export default function Dash({ children }: DashProps) {
    return (
        <div className="flex flex-row items-center flex-grow justify-center">
            <div className=" flex flex-row items-center justify-between h-full lg:mx-0 w-screen sm:min-w-0 md:min-w-[640px] max-w-[1024px] bg-white">
                { children }
            </div>
        </div>
    )
}
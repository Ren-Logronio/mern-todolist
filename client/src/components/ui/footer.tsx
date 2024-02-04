import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";



export default function Footer({ className }: {className: string}) {
    return (
      <div className={` flex-row items-center justify-center border-t hidden md:flex border-gray-300 bg-white ${ className ? className : ""}`}>
        <div className=" flex flex-row items-center justify-between mx-8 w-screen sm:min-w-0 md:min-w-[640px] max-w-[896px]">
          <div className=" flex flex-row items-center select-none">
            <p>© 2023 Reinhart Logronio - Liszt - Mern Todolist</p>
          </div>
          <div className=" flex flex-row items-center">
            <HoverCard>
                <HoverCardTrigger href="https://github.com/Ren-logronio/mern-todolist" target="_blank" rel="noreferrer" className="ml-2 hover:underline">
                  Visit on Github
                </HoverCardTrigger>
                <HoverCardContent>
                    <div className="flex flex-col items-center">
                        <p>Visit the source code on Github</p>
                    </div>
                </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    )
}
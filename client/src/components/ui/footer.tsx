import { useEffect } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import { useGeneralStore } from "@/app/stores";
import { TailSpin } from "react-loader-spinner";

export default function Footer({ className }: {className?: string}) {
  const { getGithubInformation, githubInformation } = useGeneralStore();

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear().toString().slice(-2);
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${month}-${day}-${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  useEffect(() => {
    getGithubInformation();
  }, []);

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
              <HoverCardContent className="min-w-[326px]">
                {
                  Object.keys(githubInformation).length > 0 ?
                  <div className="flex flex-row items-start">
                    <a href={githubInformation?.owner.html_url} target="_blank" rel="noreferrer"><img src={githubInformation?.owner.avatar_url} className="mr-4 rounded-full size-12 border border-gray-200"/></a>
                    <div className="flex flex-col">
                      <a href={githubInformation?.html_url} target="_blank" rel="noreferrer" className=" leading-none font-bold hover:underline">{githubInformation?.name}</a>
                      <a href={githubInformation?.owner.html_url} target="_blank" rel="noreferrer" className=" text-sm text-gray-900 hover:text-black hover:underline">{githubInformation?.owner.login}</a>
                      <p className="m-0 my-2">{githubInformation?.description}</p>
                      <p className="m-0 text-sm text-gray-500 leading-none">Created at {formatDate(githubInformation?.created_at)}</p>
                      <p className="m-0 text-sm text-gray-500 leading-none">Last updated at {formatDate(githubInformation?.updated_at)}</p>
                      <p className="m-0 text-sm text-gray-500 leading-tight">Last push at {formatDate(githubInformation?.pushed_at)}</p>
                    </div>
                  </div>
                  :
                  <div className="flex flex-row justify-center items-center">
                    <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.5" wrapperStyle={{}} wrapperClass="mr-2"/>
                    <p>Loading Repo</p>
                  </div>
                }
                  
              </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  )
}
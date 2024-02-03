import { UserStateType } from "@/app/types";

interface TodoMenuProps {
    userState: UserStateType;
}

export default function TodoMenu({ userState: user }: TodoMenuProps){
    return (
        <div className="flex h-full min-w-[170px] p-6">
            <p className="font-semibold">My Todos</p>
        </div>
    );
}
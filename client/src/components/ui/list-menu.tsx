import { UserStateType } from "@/app/types";

interface ListMenuProps {
    userState: UserStateType;
}

export default function ListMenu({ userState: user }: ListMenuProps){
    return (
        <div className="flex flex-col h-full min-w-[170px] p-6">
            <p className="font-semibold">My List</p>
            {
                user.status == 'loading' && <p>Loading User...</p>
            }
            {
                user.status == 'success' && <><p>Loading Lists...</p></>
            }
        </div>
    );
}
export type UserType = {
    _id: string,
    username?: string;
}

export type ListType = {
    _id: string,
    user: string;
    name: string;
    description: string;
    order: number;
    todos: [];
}

export type TodoType = {
    _id: string;
    description: string;
    completion: boolean;
    order: number;
}

export type UserStateType = {
    user: UserType | null
    token: string | null,
    status: string,
    message: string | null,
}

export type ListStateType = {
    lists: ListType[],
    status: string,
    message: string | null,
}

export type TodoStateType = {
    todos: TodoType[],
    status: string,
    message: string | null,
}

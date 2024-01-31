export interface todo {
    title: string;
    description: string;
    completion: boolean;
    deadline: Date;
};

export interface todoList {
    user: user;
    name: string;
    description: string;
    todos: [];
};

export interface user {
    email: string,
    password: string,
    tektok?: string,
    username?: string;
}
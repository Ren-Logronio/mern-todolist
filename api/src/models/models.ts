export interface todo {
    title: string;
    description: string;
    completion: boolean;
    deadline: Date;
};

export interface todoList {
    name: string;
    description: string;
    todos: [];
};
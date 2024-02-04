import { useAuthStore, useListStore } from "@/app/stores";
import axios from "axios";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { ScrollBar, ScrollArea } from "./scroll-area";
import ListItem from "./list-item";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move"

export default function ListMenu(){
    const [ newList, setNewList ] = useState({name: "", description: "", loading: false, new: false});
    const listStore = useListStore();
    const { user, token } = useAuthStore();

    const handleNewList = () => {
        setNewList({...newList, new: true});
    };

    const handleOnDropList = ({ removedIndex, addedIndex }: { removedIndex: any, addedIndex: any}) => {
        const newListOrder = arrayMoveImmutable(listStore.lists, removedIndex, addedIndex).map((list, index) => { list.order = index + 1; return list; });
        listStore.reorder(newListOrder, token);
        console.log(removedIndex, addedIndex)
    }

    const handleNewListSubmit = () => {
        setNewList({...newList, loading: true});
        axios.post(`/api/list/?user=${user?._id}`, {name: newList.name, description: newList.description, order: (listStore.currentOrder + 1), user: user?._id}, { headers: { authorization: `local ${token}` } }).then((res) => {
            listStore.addList(res.data);
            setNewList({name: "", description: "", loading: false, new: false});
        }).catch((err: Error) => {
            listStore.setError(err.stack?.toString() || "An error occurred");
            setNewList({name: "", description: "", loading: false, new: false});
        });
    };

    useEffect(() => {
        listStore.setLoading();
        axios.get(`/api/list/?user=${user?._id}`, { headers: { authorization: `local ${token}` } }).then((res) => {
            listStore.setLists(res.data.todoList);
        }).catch((err: Error) => {
            listStore.setError(err.message);
        });
    }, [])

    return (
        <div className="flex flex-col h-full min-w-[448px] p-6">
            <p className="font-semibold">My List</p>
            {listStore.status == "loading" && 
                <>
                    <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.2" wrapperStyle={{}} wrapperClass="mx-auto"/>
                    <p className="text-center">Loading Lists...</p>
                </>
            }
            {
                listStore.status == "error" && 
                <p className="text-center text-red-500">{listStore.message}</p>
            }
            {
                listStore.status == "success" && listStore.lists.length > 0 && 
                    <>
                        {/* <div className=" max-h-[420px] overflow-y-scroll overflow-hidden"> */}
                        <ScrollArea className="max-h-[384px] mt-4 overflow-y-auto">
                            <ScrollBar orientation="vertical" />
                            {/* @ts-ignore */}
                            <Container  lockAxis="y" onDrop={handleOnDropList}>
                                {listStore.lists.map((list) => { return (
                                    /* @ts-ignore */
                                    <Draggable key={list._id}>
                                        <ListItem list={list}/>
                                    </Draggable>
                                )})}
                            </Container>
                        </ScrollArea>
                        {/* </div> */}
                    </> 
            }
            {
                listStore.status == "success" && listStore.lists.length == 0 && !newList.new && 
                <p className="text-center text-gray-400">No lists found</p>
            }
            {
                listStore.status != "loading" && !newList.new && 
                <button onClick={handleNewList} className="mt-8 flex flex-row justify-center items-center">
                    <p className="text-center ml-4">Add New List</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            }
            {
                newList.new && 
                <div className="mt-4 p-2 text-sm font-bold border rounded-md">
                    <p>New List</p>
                    <Input disabled={newList.loading} id="name" onKeyDown={(e) => { if(e.key == "Enter" && !newList.loading){ handleNewListSubmit() } }} onChange={(e) => { setNewList({...newList, name: e.target.value}) }} placeholder="Enter List Name" className="my-2 font-normal" />
                    <Textarea disabled={newList.loading} id="description" onChange={(e) => { setNewList({...newList, description: e.target.value}) }} placeholder="No description" className=" max-h-[128px] font-normal"/>
                    <div className="flex flex-row justify-between items-center">
                        <div className="mt-2 flex flex-row items-center">
                            {
                                newList.loading && 
                                <>
                                    <TailSpin visible={true} height="20" width="20" color="#000000" ariaLabel="tail-spin-loading" radius="0.2" wrapperStyle={{}} wrapperClass="ml-4 mr-2"/>
                                    <p className="text-center">Creating List...</p>
                                </>
                            }
                        </div>
                        <div>
                            <Button disabled={newList.loading} variant="ghost" className="mt-2 mr-2" onClick={() => setNewList({...newList, new: false})}>Cancel</Button>
                            <Button disabled={newList.loading} variant="outline" className="mt-2" onClick={handleNewListSubmit}>Create List</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
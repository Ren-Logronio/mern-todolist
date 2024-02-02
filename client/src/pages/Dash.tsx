import React, { ReactNode, useEffect, useState } from "react"
import DashContainer from "../components/DashContainer"
import ListMenu from "../components/ListMenu"
import TodosMenu from "../components/TodosMenu"
import { IList } from "../components/ListItem"

export default function Dash(){

    const [list, setList] = useState<IList[]>([]);
    const [selectedList, setSelectedList] = useState<IList | null>(null);

    useEffect(() => {
        setList(
            [
                {id:"myid", title: "Daily Activities", description:"Lorem ipsum dolor sit amet consectetur. Ullamcorper quis vitae et non arcu ut neque vol."},
                {id:"yeser", title: "Gym Stuff", description:""},
            ]
        )
    }, [])

    useEffect(()=>{ console.log(selectedList) }, [selectedList])

    const selectList = (list: IList | null) => {
        setSelectedList(list);
    };

    return (
        <DashContainer>
            <ListMenu lists={list} selected={selectedList} selectListCallback={selectList}/>
            <TodosMenu selected={selectedList}/>
        </DashContainer>
    )
}
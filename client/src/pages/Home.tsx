import Header from "../components/ui/header"
import Footer from "../components/ui/footer"
import Dash from "../components/ui/dash"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import TodoMenu from "../components/ui/todo-menu"
import ListMenu from "../components/ui/list-menu"
import { useEffect, useRef, useState } from "react"
import { UserStateType } from "../app/types"
import Axios from "axios"
import Screen from "@/components/ui/screen"
import { useAuthStore } from "@/app/stores"
import { ImperativePanelHandle } from "react-resizable-panels"

/**
 * 
 * ?todoSchema:
 * ?description: String,
 * ?completion: Boolean,
 * ?deadline: Date,
 * ?order: Number,
 * 
 */

function HomePage() {
  const userState = useAuthStore();
  const expandRef = useRef<ImperativePanelHandle>(null);

  return (
    <Screen>
      <Header userState={userState}/>
        <Dash>
          <ResizablePanelGroup direction="horizontal" className="min-h-full min-w-full border-0 rounded-lg border">
            <ResizablePanel defaultSize={55} ref={expandRef}>
              <ListMenu/>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={45}>
              <TodoMenu/>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Dash>
      <Footer/>
    </Screen>
  )
}

export default HomePage;

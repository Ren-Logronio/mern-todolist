import Header from "../components/ui/header"
import Footer from "../components/ui/footer"
import Dash from "../components/ui/dash"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import TodoMenu from "../components/ui/todo-menu"
import ListMenu from "../components/ui/list-menu"
import { useEffect, useState } from "react"
import { UserStateType } from "../app/types"
import Axios from "axios"

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
  const [ userState, setUserState ] = useState<UserStateType>({ 
    user: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || "{}"), 
    token: localStorage.getItem('userToken'),
    status: 'loading', 
    message: null 
  });

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Header userState={userState}/>
        <Dash>
          <ResizablePanelGroup direction="horizontal" className="min-h-full min-w-full border-0 rounded-lg border">
            <ResizablePanel defaultSize={40}>
              <ListMenu userState={userState}/>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
              <TodoMenu userState={userState}/>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Dash>
      <Footer/>
    </div>
  )
}

export default HomePage;

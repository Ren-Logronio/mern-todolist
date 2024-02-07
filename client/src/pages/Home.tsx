import Header from "../components/ui/header"
import Footer from "../components/ui/footer"
import Dash from "../components/ui/dash"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import TodoMenu from "../components/ui/todo-menu"
import ListMenu from "../components/ui/list-menu"
import Screen from "@/components/ui/screen"
import { useAuthStore, useGeneralStore } from "@/app/stores"
import { ImperativePanelHandle } from "react-resizable-panels"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

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
  const { errorDialog, errorDialogMessage, clearErrorDialog } = useGeneralStore();
  const expandRef = useRef<ImperativePanelHandle>(null);

  return (
    <>
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
      <Dialog open={errorDialog} onOpenChange={clearErrorDialog}>
          <DialogContent className="p-4 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
            <p>{errorDialogMessage}</p>
            <DialogFooter className="flex flex-row justify-end">
            <Button onClick={clearErrorDialog}>
              Close
            </Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}

export default HomePage;

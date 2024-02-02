import React, { ReactNode } from "react"

interface AppContainerProps {
    children: ReactNode
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {

    return (
        <div className="h-screen flex flex-col">
            { children }
        </div>
    )
}

export default AppContainer;
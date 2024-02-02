import React, { ReactNode } from "react"

interface DashContainerProps {
    children: ReactNode
}

const DashContainer: React.FC<DashContainerProps> = ({ children }) => {

    return (
        <div className="flex flex-row justify-center h-full text-center bg-slate-200">
            { children }
        </div>
    )
}

export default DashContainer;
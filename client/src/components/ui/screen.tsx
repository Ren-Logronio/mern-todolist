
interface ScreenProps {
    children: React.ReactNode;
    className?: string;
}

export default function Screen({ children, className }: ScreenProps) {
    return <div className={`flex flex-col h-screen bg-gray-200 ${className ? className : ""}`}>{ children }</div>
}
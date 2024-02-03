import { useTestStore } from "@/app/stores";
import { useEffect } from "react";


export default function () {
    const { count, increment } = useTestStore();

    useEffect(() => {
        console.log('test')
    }, [])

    return (
    <div>
        { count }
        <button onClick={increment}>Plus One</button>
    </div>
    );
}
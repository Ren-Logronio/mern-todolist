import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Screen from "@/components/ui/screen";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <Screen className=" bg-orange-100">
            <div className="flex flex-col justify-center my-auto z-[2]">
                <p className="text-[3rem] font-black text-center text-orange-950">Welcome to Lizst</p>
                <p className="text-[3rem] font-black text-center text-orange-950"><span>Your TodoList,</span><span className=" text-orange-600"> SUPERCHARGED...</span></p>
                <Button onClick={() => {navigate('/signin')}}  className=" mx-auto text-[1rem] px-8 py-6 mt-6">GET STARTED</Button>
            </div>
            <img src="./logo-large.gif" className="fixed z-[0] opacity-25 size-[1000px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            <Footer className="z-[10]" />
        </Screen>
    )
}
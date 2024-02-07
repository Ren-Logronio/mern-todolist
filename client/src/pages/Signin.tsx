import { useAuthStore } from "@/app/stores";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Screen from "@/components/ui/screen";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function () {
    const [ input, setInput ] = useState({ username: "", password: "" });
    const [ errors, setErrors ] = useState({ username: "", password: "", card: "" });
    const [ signingIn, setSigningIn ] = useState(false);
    const { user, token, message, signin: login } = useAuthStore();
    const navigate = useNavigate();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (user && token) { return; };
        setSigningIn(true);
        const { username, password } = input;
        axios.post("/api/auth/signin/", { username, password }).then((res) => {
            const { status, message, user, token } = res.data;
            if (status === "error") {
                setErrors({ ...errors, card: message });
                setSigningIn(false);
                return;
            } else {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                login(user, token);
                setSigningIn(false);
            }
        }).catch(() => {
            setErrors({ ...errors, card: "Something wrong happened"});
            setSigningIn(false);
        });
    }

    useEffect(() => {
        if (user && token) {
            navigate("/dash");
        }
        if (message) {
            setErrors({ ...errors, card: message ? message : "Something wrong happened"});
        }
    }, [user, token, message ])

    return (
        <Screen className=" justify-center">
            <Card className=" min-w-full min-h-full md:min-h-[256px] md:min-w-[512px] mx-auto">
                <CardHeader>
                    <CardTitle className="flex flex-row justify-start items-center">
                        <img src="./logo.png" className="mr-2 size-10"/>
                        <p className="font-bold">Lizst Sign In</p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    { errors.card && <p className="text-sm mb-2 text-center text-rose-600 font-bold">{errors.card}</p> }
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username/email">Username</Label>
                                <Input id="username" placeholder="Please enter your username" onKeyDown={handleKeyPress} onChange={(e) => { setInput({...input, username: e.target.value}) }} />
                                { errors.username && <p className=" text-sm text-rose-90">{errors.username}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Please enter your password" onKeyDown={handleKeyPress} onChange={(e) => { setInput({...input, password: e.target.value}) }} />
                                { errors.password && <p className=" text-sm text-rose-600">{errors.password}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button onClick={signingIn ? ()=>{} : handleSubmit} className="w-full">
                        {signingIn && <TailSpin visible={true} height="20" width="20" color="#ffffff" ariaLabel="tail-spin-loading" radius="0.5" wrapperStyle={{}} wrapperClass="mr-2"/>}
                        {signingIn ? "Signing in..." : "Sign in"}
                    </Button>
                    <Separator className="my-4"/>
                    <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500">Sign Up</a></p>
                </CardFooter>
            </Card>
            <Footer className="fixed bottom-0 w-full" />
        </Screen>
    );
}
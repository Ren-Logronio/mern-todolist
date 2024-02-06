import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Screen from "@/components/ui/screen";

export default function () {
    return (
        <Screen>
            <div className="fixed flex flex-col justify-center size-full bg-black bg-opacity-[0.65] select-none">
                <p className="text-center text-[2.5rem] text-orange-200 font-black my-auto">Chilax sa ta guro hehehe<br></br>😅😅😅</p>
            </div>
            <Card className="max-w-[512px] min-w-[512px] mx-auto my-auto">
                <CardHeader>
                    <CardTitle className="flex flex-row justify-start items-center">
                        <img src="./logo.png" className="mr-2 size-10"/>
                        <p className="font-bold">Lizst Sign Up</p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Please enter your username" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Please enter your username" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Please enter your password" />
                            </div>
                        </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full">
                        Sign up
                    </Button>
                </CardFooter>
            </Card>
        </Screen>
    );
}
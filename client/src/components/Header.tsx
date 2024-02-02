export default function Header() {
    return (
        <section className="flex flex-row justify-center h-12 bg-white shadow-sm border-b border-slate-200 border-solid">
            <div className=" min-w-[1618px] flex flex-row items-center justify-between">
                <h1 className="m-0 select-none">Mama Mern TodoList</h1>
                <div className="flex flex-row items-center">
                    <p className="m-0 mr-3 mt-0 text-center select-none">Anonymous</p>
                    <button className="border border-slate-400 bg-transparent text-black hover:bg-slate-400 hover:text-white p-2">Login</button>
                </div>
            </div>
        </section>
    )
}
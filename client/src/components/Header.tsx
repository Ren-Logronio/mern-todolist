export default function Header() {
    return (
        <div className="fixed flex flex-row justify-between h-12 bg-white shadow-sm border border-t-0 border-e-0 border-s-0 border-slate-200 border-solid w-[100%]">
            <h1 className="m-0">Mama Mern</h1>
            <div className="flex flex-row">
                <p className="m-0 align-middle text-center">Lorem Ipsum</p>
                <button>Some Action</button>
            </div>
        </div>
    )
}
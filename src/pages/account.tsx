import { useSession } from "next-auth/react"

const Account = (props) => {
    const {data: session, status} = useSession();
    return (
        <div className="container mx-auto">
            <h1 className="text-center text-5xl p-3">Welcome {session.user.name}</h1>
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-slate-400 hover:bg-slate-700 rounded-xl text-3xl p-10">Araçlarım</button>
                <button className="bg-slate-400 hover:bg-slate-700 rounded-xl text-3xl p-10">Araç Ekle</button>
            </div>
        </div>
    )
}

export default Account


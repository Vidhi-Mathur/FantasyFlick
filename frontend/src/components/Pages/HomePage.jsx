import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormContext } from "../store/Form-Context"

export const HomePage = () => {
    const navigate = useNavigate()
    const { setFormDetail } = useContext(FormContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const submitHandler = async(e) => {
        setLoading(true)
        e.preventDefault()
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries())
        try {
            setFormDetail({
                submitted: true,
                captain: data.captain,
                teamName: data.team
            })
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teams/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    captain: data.captain,
                    teamName: data.team
                })
            })
            const result = await response.json()
            if(!response.ok){
                setError(result.message);
                return;
            }
            setFormDetail(prevDetail => ({
                ...prevDetail,
                teamId: result.team._id 
            })) 
            navigate("/players")
        }
        catch(err) {
            setError(err.message || "Can't save details, try again later")
        }
        finally{
            setLoading(false)
        }
    }

    if(loading) return <p className="text-black text-center text-2xl">Loading...</p>
    if(error) return <p className="text-red-500 text-center text-2xl">{error}</p>

    return (
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-600">FantasyFlick</h1>
                <p className="mt-2 text-xl text-gray-600">Where Every Pick is a Winning Flick!</p>
                <p className="mt-2 font-bold text-md text-red-600">{error}</p>
            </div>
            <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="captain" className="text-sm font-medium text-gray-700">Captain&apos;s Name</label>
                    <input id="captain" name="captain" type="text" placeholder="Enter your name" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="team" className="text-sm font-medium text-gray-700">Team&apos;s Name</label>
                    <input id="team" name="team" type="text" placeholder="Enter your team's name" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"/>
                </div>
                <button disabled={loading} type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out">
                    Start Game
                </button>
            </form>
        </div>
    )
  }
  
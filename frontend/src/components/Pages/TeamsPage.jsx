import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const TeamsPage = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const fetchTeams = async() => {
        try{
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teams`);
          const result = await response.json()
          setTeams(result.teams)
          setLoading(false)
        } 
        catch(err) {
          setError(err.message || "Try fetching teams later")
          setLoading(false)
        }
      }
      fetchTeams()
    }, [])
  
  
    if(loading) return <p className="text-white text-center text-2xl">Loading...</p>
    if(error) return <p className="text-red-500 text-center text-2xl">{error}</p>
  
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-full max-w-4xl mx-auto space-y-8 bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Total Teams: {teams.length}</h1>
                {teams && teams.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto p-2">
                        {teams.map((team) => (
                        <div key={team._id} className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">{team.teamName}</h2>
                                <p className="text-sm text-gray-400">Captain: {team.captain}</p>
                                <p className="text-sm text-gray-400">Players: {team.players.length}</p>
                                <p className="text-sm text-gray-400">Total Points: {team.teamPoints}</p>
                            </div>
                            <Link to={`/teams/${team._id}`} className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white bg-orange-600 hover:bg-orange-700 text-center whitespace-nowrap">
                                View Team Stats
                            </Link>
                        </div>
                    ))}
                </div>
                ) : (
                <p className="text-white text-center text-xl">No teams available</p>
                )}
            </div>
        </div>
    )
}

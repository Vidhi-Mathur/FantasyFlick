import { useContext, useEffect, useState } from "react"
import { FormContext } from "../store/Form-Context"
import { Link } from "react-router-dom"

export const SummaryPage = () => {
  const { formDetail } = useContext(FormContext)
  const [team, setTeam] = useState({ totalPoints: 0, members: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teams/${formDetail.teamId}`);
        const result = await response.json()
        const playerIds = result.team.players
        const playerPromises = playerIds.map((id) => fetchPlayerData(id))
        const playerDetails = await Promise.all(playerPromises)
        setTeam({
          totalPoints: result.team.teamPoints,
          members: playerDetails
        })
        setLoading(false)
      } 
      catch (err) {
        setError(err.message || "Try fetching teams later")
        setLoading(false)
      }
    }
    fetchTeams()
  }, [formDetail.teamId])

  const fetchPlayerData = async (playerId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players/${playerId}`);
      const result = await response.json()
      return result.player.data 
    } 
    catch(err) {
      setError(err.message || "Failed to fetch player data.")
      return null
    }
  }

  if(loading) return <p className="text-black text-center">Loading...</p>
  if(error) return <p className="text-black text-center">{error}</p>

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6">
      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="text-center space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Here is your team, {formDetail.captain}</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-300">Team {formDetail.teamName}</h2>
            <div className="bg-gray-800 rounded-lg p-3 inline-block">
                <h2 className="text-lg sm:text-xl font-bold text-white">Team points: <span className="text-orange-500">{team.totalPoints}</span></h2>
            </div>
        </div>
        {team.members && team.members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-h-[calc(100vh-250px)] overflow-y-auto p-2 sm:p-4">
            {team.members.map((player) => (
              <div key={player.id} className="border border-gray-700 p-3 sm:p-4 rounded-lg shadow-md bg-gray-800 flex flex-col justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{player.name}</h2>
                <p className="text-sm sm:text-base text-gray-400">Country: {player.country}</p>
                <Link to={`/players/${player.id}`} className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white bg-orange-600 hover:bg-orange-700 text-center">
                  View Stats
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-lg sm:text-xl">No players available</p>
        )}
      </div>
    </div>
  )
}
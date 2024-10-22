import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const StatsPage = () => {
  const [playerData, setPlayerData] = useState(null) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { playerId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players/${playerId}`)
        const result = await response.json()
        setPlayerData(result.player.data)
        setLoading(false)
      } 
      catch (err) {
        setError(err.message || "Failed to fetch player data. Please try again later.")
        setLoading(false)
      }
    }
    fetchPlayerData()
  }, [playerId])

  if(loading) return <p className="text-black text-center text-2xl">Loading...</p>
  if(error) return <p className="text-red-500 text-center text-2xl">{error}</p>
  if(!playerData) return <p className="text-black text-center text-2xl">No player data available</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-4xl mx-auto space-y-8 bg-gray-900 p-6 rounded-xl shadow-lg">
        <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 ease-in-out">
          Back to Team
        </button>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <img src={playerData.playerImg} alt={playerData.name} className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-gray-700"
          />
          <div className="text-center md:text-left space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{playerData.name}</h1>
            <p className="text-xl sm:text-2xl text-gray-300 font-semibold">{playerData.role}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
              <p><span className="font-semibold">Country:</span> {playerData.country}</p>
              <p><span className="font-semibold">Born:</span> {new Date(playerData.dateOfBirth).toLocaleDateString()}</p>
              <p><span className="font-semibold">Batting style:</span> {playerData.battingStyle || 'Not available'}</p>
              <p><span className="font-semibold">Bowling style:</span> {playerData.bowlingStyle || 'Not available'}</p>
              <p><span className="font-semibold">Place of Birth:</span> {playerData.placeOfBirth || 'Not available'}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-inner">
            <h2 className="text-2xl font-bold text-white mb-4">Player Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatItem label="Player ID" value={playerData.id} />
                <StatItem label="Date of Birth" value={new Date(playerData.dateOfBirth).toLocaleDateString()} />
                <StatItem label="Role" value={playerData.role} />
                <StatItem label="Batting Style" value={playerData.battingStyle} />
            </div>
        </div>
      </div>
    </div>
  )
}

const StatItem = ({ label, value }) => (
  <div className="bg-gray-700 rounded-lg p-3">
    <p className="text-gray-300 text-sm">{label}</p>
    <p className="text-white text-lg font-semibold break-words">{value}</p>
  </div>
)
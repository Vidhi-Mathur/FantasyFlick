import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormContext } from '../store/Form-Context'

const generateRandomTeamPoints = () => Math.floor(Math.random() * 1000) + 1; 

export const PlayersPage = () => {
    const { formDetail } = useContext(FormContext)
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [team, setTeam] = useState([])
    const navigate = useNavigate();

    const submitted = formDetail.submitted
  
    useEffect(() => {
      const fetchPlayers = async() => {
        try{
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/players`)
          const result = await response.json()
          setPlayers(result.players.data)
          setLoading(false)
        } 
        catch (err) {
          setError(err.message || "Try fetching players later")
          setLoading(false)
        }
      }
      fetchPlayers()
    }, [])
  
    const teamPlayerToggler = (player) => {
        setTeam(prevTeam => {
            const isPlayerInTeam = prevTeam.some(p => p.id === player.id)
            let updatedTeamMembers
            if(isPlayerInTeam) updatedTeamMembers = prevTeam.filter(p => p.id !== player.id)
            else updatedTeamMembers = [...prevTeam, player]
            return updatedTeamMembers 
        })
    }

    const createTeamHandler = async() => {
        const randomTeamPoints = generateRandomTeamPoints();
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teams/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamId: formDetail.teamId, 
                    teamPoints: randomTeamPoints,
                    players: team.map(player => player.id)
                })
            })
            const result = await response.json()
            if (!response.ok) {
                setError(result.message)
                setLoading(false)
                return
            }
            navigate(`/teams/${formDetail.teamId}`) 
          } 
          catch (err) {
            setError(err.message || "Try creating team later")
            setLoading(false)
          }
    }
  
    if(loading) return <p className="text-black text-center text-2xl">Loading...</p>
    if(error) return <p className="text-red-500 text-center text-2xl">{error}</p>
  
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-full max-w-6xl mx-auto space-y-8 bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg mt-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Welcome {formDetail.captain}</h1>
                {!formDetail.submitted && (
                    <div className="text-center mt-4">
                        <Link to="/" className="inline-block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white bg-orange-600 hover:bg-orange-700">
                        Sign up to play
                        </Link>
                    </div>
                )}
                {players && players.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto">
                        {players.map((player) => (
                            <div key={player.id} className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="mb-2 sm:mb-0">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">{player.name}</h2>
                                    <p className="text-gray-400">Country: {player.country}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    {submitted && (
                                        <button onClick={() => teamPlayerToggler(player)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white w-full sm:w-auto ${team.some(p => p.id === player.id)? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                                            {team.some(p => p.id === player.id) ? 'Remove from Team' : 'Add to Team'}
                                        </button>
                                    )}
                                    <Link to={`/players/${player.id}`} className='px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white bg-orange-600 hover:bg-orange-700 text-center w-full sm:w-auto'>
                                        View Stats
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                <p className="text-white text-center">No players available</p>
                )}
            </div>
            {submitted && (
            <div className="w-full max-w-6xl mx-auto mt-8 bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Team {formDetail.teamName}</h2>
                {team.length > 0 && team.length < 12 && (
                    <div className="text-center mb-4">
                        <button className='px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white bg-orange-600 hover:bg-orange-700' onClick={createTeamHandler}>
                            Create Team
                        </button>
                    </div>
                )}
                <div className="max-h-[30vh] overflow-y-auto">
                    {team.length > 0 ? (
                        <ul className="space-y-2">
                            {team.map((player) => (
                                <li key={player.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-3 rounded-lg">
                                    <span className="text-white mb-2 sm:mb-0">{player.name}</span>
                                    <button onClick={() => teamPlayerToggler(player)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors duration-150 w-full sm:w-auto">
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                    <p className="text-white text-center">No players in your team yet</p>
                    )}
                </div>
            </div>
        )}
        </div>
        )
    }
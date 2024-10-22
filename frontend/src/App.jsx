import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./components/Pages/HomePage"
import { PlayersPage } from "./components/Pages/PlayersPage"
import { Layout } from "./components/UI/Layout"
import { StatsPage } from "./components/Pages/StatsPage"
import { TeamsPage } from "./components/Pages/TeamsPage"
import { SummaryPage } from "./components/Pages/SummaryPage"
import { ErrorPage } from "./components/Pages/ErrorPage"

function App() {
  return (
    <Router>
        <Layout>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:playerId" element={<StatsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:teamId" element={<SummaryPage />} />
            <Route path="*" element={<ErrorPage />}/>
        </Routes>
        </Layout>
    </Router>
  )
}

export default App

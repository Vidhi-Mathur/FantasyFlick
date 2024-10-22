import Logo from "../../assets/logo.jpg"
export const Layout = ({children}) => {
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-200 to-blue-100 flex flex-col items-center justify-center">
            {children}
        </div>
        </>
    )
}

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
            <Link to="/" className="flex items-center space-x-3">
                <img src={Logo} alt="Cricket Stats Logo" className="w-14 h-14" />
                <span className="text-xl font-bold">FantasyFlick</span>
            </Link>
        </div>
    </header>
  )
}
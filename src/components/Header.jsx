import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-transparent z-50">
            <nav className="flex justify-between items-center py-2 px-6">
                <div className="logo-header w-[100px]">
                    <img src={logo} alt="logo" />
                </div>
                <ul className='flex gap-10 self-center'>
                    <Link to="#" className="text-decoration-none"><li className=' text-[#a6a9ad] font-semibold hover:text-[white] transition-all duration-300'>Home</li></Link>
                    <Link to="#" className="text-decoration-none"><li className=' text-[#a6a9ad] font-semibold hover:text-[white] transition-all duration-300'>Solutions</li></Link>
                    <Link to="#" className="text-decoration-none"><li className=' text-[#a6a9ad] font-semibold hover:text-[white] transition-all duration-300'>Pricing</li></Link>
                    <Link to="#" className="text-decoration-none"><li className=' text-[#a6a9ad] font-semibold hover:text-[white] transition-all duration-300'>Explore</li></Link>
                    <Link to="#" className="text-decoration-none"><li className=' text-[#a6a9ad] font-semibold hover:text-[white] transition-all duration-300'>Tools</li></Link>
                    <Link to="#" className="text-decoration-none"><li className=' text-[#a6a9ad] font-semibold hover:text-[white] transition-all duration-300'>Support</li></Link>
                </ul>
                <div className="login_register">
                    <Link to="#" className='text-decoration-none'><button className='login text-white font-medium py-1 px-3 bg-blue-500 border-2 border-blue-500 rounded-xl me-2 hover:bg-transparent transition-all duration-300'>Login</button></Link>
                    <Link to="#" className='text-decoration-none'><button className='login text-white font-medium px-3 py-1 bg-transparent border-2 border-blue-500 rounded-xl hover:text-blue-500 transition-all duration-300'>Register</button></Link>
                </div>
            </nav>
        </div>
    )
}

export default Header

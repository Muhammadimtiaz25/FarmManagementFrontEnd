import { useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.jpg";
import f16 from "../assets/images/splitScreen.mp4";
export default function AboutPage() {
      const [isOpen, setIsOpen] = useState(false);
        const [activeSection, setActiveSection] = useState("");
      
  return (
    <div className='bg-white  max-w-full overflow-x-hidden font-roboto '>
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-3 md:px-8">
          
         
          <div className="flex items-center space-x-2">
            <img src={logo2} alt="Logo" className="w-10 h-10 rounded-full" />
            <p className='text-green-700 font-bold'>AgriBot</p>
          </div>
      
          
          <nav className="hidden md:flex items-center space-x-6 font-medium">
            <Link to="/" className="text-green-700 font-bold hover:underline">Home</Link>
            <Link to="/supportchat" className="text-green-700 font-bold hover:underline">SupportChat</Link>
       
      <Link
        to="/login"
        className="flex items-center justify-center bg-green-700 px-4 py-2 rounded text-white hover:bg-green-800"
      >
        <p>Login</p>
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5" fill="none" viewBox="0 0 24 24" 
          stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M20 8v6m3-3h-6" />
        </svg>
      </Link>
          </nav> 
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl p-4 text-green-700 focus:outline-none"
          >
            ☰
          </button>
        </div>
      
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 px-4 pb-4 bg-white shadow">
            <Link to="/" className="block py-2 text-green-700">Home</Link>
            <Link to="/contact" className="block py-2 text-green-700">Supportchat</Link>     
           <Link
        to="/login"
        className="flex items-center justify-center bg-green-700 px-4 py-2 rounded text-white hover:bg-green-800"
      >
        <p>Login</p>
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5" fill="none" viewBox="0 0 24 24" 
          stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" 
            d="M20 8v6m3-3h-6" />
        </svg>
      </Link>
          </div>
        )}
      </header>
      

       <section id="about" className="bg-orange-50 py-16 mt-15">
            <div className="container mx-auto px-4 md:px-8 text-center">
              <h2 className="text-[17px] font-bold mb-4 text-orange-400" data-aos="fade-up">
                Our Services
              </h2>
              <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">
                Sample of our Work
              </h2>
               <p className="mt-4 text-sm mb-12" >
            AgriBot delivers end-to-end automation solutions that transform traditional farming into a smart, efficient, and data-driven operation.  </p>
            <video width="400" height="400" controls className="mx-auto rounded-lg shadow-lg" data-aos="fade-up">
        <source src={f16} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      
            </div>
          </section>
    </div>
  )
}

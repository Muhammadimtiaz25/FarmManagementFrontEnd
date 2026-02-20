import { useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/images/logo2.jpg";
import greenPath from "../assets/images/pathway-though-green-field.jpg";
import Dot2 from "../assets/images/dot2.png";
import Icon1 from "../assets/images/icon1.png";
import Icon2 from "../assets/images/icon2.png";
import Left from "../assets/images/left.png";
import Section from '../components/Section';
import Testimonial from "../assets/images/testimonial.png";
import Blog2 from "../assets/images/blog2.png";
import features1 from "../assets/images/features1.jpg";
import features2 from "../assets/images/features2.jpg";
import f11 from "../assets/images/f11.jpg";
import f12 from "../assets/images/f12.jpg";
import f13 from "../assets/images/f13.jpg";
import f14 from "../assets/images/f14.jpg";
import f15 from "../assets/images/f15.jpg";
import Robot from "../components/Robot";
import f16 from "../assets/images/splitScreen.mp4";
export default function Reviews() {
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
      



          
    <section className="mt-10 bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">
          News & Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow w-full" data-aos="fade-up">
            <img src={f14} alt="" className="w-full h-auto" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">
                Bringing Food Production Back To Cities
              </h3>
              <p className="text-sm text-gray-600">
                Learn how to make your farm eco-friendly.
              </p>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow w-full"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img src={Blog2} alt="" className="w-full h-auto" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">
                The Future of Farming, Smart Spraying Solutions
              </h3>
              <p className="text-sm text-gray-600">
                The latest innovations in farming.
              </p>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow w-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img src={f15} alt="" className="w-full h-auto" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">
                Agronomy and relation to Other Sciences
              </h3>
              <p className="text-sm text-gray-600">
                Why going organic is worth it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


            <section
            id="about"
            className=" container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center justify-center bg-orange-50"
          >
            <div className="md:w-1/4 mb-6 md:mb-0" data-aos="fade-left">
              <p className="text-lg font-semibold text-orange-400">Our Testimonial</p>
              <h2 className="text-3xl font-bold text-black">
                What they are talking about Agribot
              </h2>
              <p className="mt-4 text-sm">
                There are many variations of passages of available but the majortity
                have sufferred alteration in some form by injected humor or random
                word which don’t look even.
              </p>
             
            </div>
            <div className="md:w-1/2 flex justify-center" data-aos="fade-right">
              <img
                src={Testimonial}
                alt="Farm"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover rounded-lg"
              />
            </div>
          </section>
    </div>
  )
}

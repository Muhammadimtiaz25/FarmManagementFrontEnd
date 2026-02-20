import React from 'react'
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
import { set } from 'mongoose';
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
  
  return (
    
  <div className="bg-white  max-w-full overflow-x-hidden font-roboto mx-5">
   
  <header className="bg-white shadow-md fixed w-full z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-3 md:px-8">
    
   
    <div className="flex items-center space-x-2">
      <img src={logo2} alt="Logo" className="w-10 h-10 rounded-full" />
      <p className='text-green-700 font-bold'>AgriBot</p>
    </div>

    
    <nav className="hidden md:flex items-center space-x-6 font-medium">
      <Link to="/" className="text-green-700 font-bold hover:underline">Home</Link>
      <Link to="/supportchat" className="text-green-700 font-bold hover:underline">SupportChat</Link>
        <Link to="/about" className="text-green-700 font-bold hover:underline">About</Link>
      <Link to="/reviews" className="text-green-700 font-bold hover:underline">Reviews</Link>
 
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
         <Link to="/about" className="text-green-700 font-bold hover:underline">About</Link>
      <Link to="/reviews" className="text-green-700 font-bold hover:underline">Reviews</Link>
    
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

    <div className="containerhero">
      <img src={greenPath} alt="farming pics" className='w-auto rounded-lg responsiveimg'/>
      <div className="centeredhero mt-10 md:mt-0">
        <p className='text-xl font-[1000] text-green-700 '>WELCOME TO AGRIBOT FAMILY</p>
        <h1 className='text-6xl m-6 font-[1000]'>Indoor Farming</h1>
        <p className='text-lg font-[1000] '>Farm smarter,not Harder.Hire robot as a service for a Moderen Farming.</p>
      <Link to="/about"><button className='bg-green-700 p-3 mt-5 rounded-lg'>Discover More</button></Link>
      </div>
    </div>

    <section
      className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 -mt-16 relative z-10 "
    >
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 1</h3>
        <p className="mt-2 text-black font-bold">We are using new technology</p>
        <div className="flex justify-center">
          <img
            src={features2}
            alt=""
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 2</h3>
        <p className="mt-2 text-black font-bold">Precision spraying robot</p>
        <div className="flex justify-center">
          <img
            src={Dot2}
            alt=""
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 3</h3>
        <p className="mt-2 text-black font-bold">Farm digitalization</p>
        <div className="flex justify-center">
          <img
            src={features1}
            alt=""
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
       <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 4</h3>
        <p className="mt-2 text-black font-bold">Smart indoor Farming </p>
        <div className="flex justify-center">
          <img
            src={f13}
            alt=""
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 5</h3>
        <p className="mt-2 text-black font-bold">Smart Water System</p>
        <div className="flex justify-center">
          <img
            src={f11}
            alt=""
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
       <div
        className="bg-white shadow-lg rounded-lg p-6 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-xl font-semibold text-orange-400">Feature 6</h3>
        <p className="mt-2 text-black font-bold">Hire Bulldog robot for farming</p>
        <div className="flex justify-center">
          <img
            src={f12}
            alt=""
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      
    </section>


    <section
      
      className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center gap-10"
    >
      <div className="md:w-1/2 flex justify-center" data-aos="fade-right">
        <img
          src={Left}
          alt="Farm"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/3" data-aos="fade-left">
        <p className="text-[17px] font-semibold text-orange-400">Our Introduction</p>
        <h2 className="text-3xl font-bold text-black">
          Agriculture Farm Automation
        </h2>
        <p className="mt-4 text-green-600">
          AgriBot is the advance global agricultural robot for Indoor farms.
        </p>
        <p className="mt-4 text-sm">
       AgriBot is an advanced global agricultural robotics solution designed specifically for indoor and smart farming. Our intelligent robots help farmers increase productivity, reduce resource waste, and achieve sustainable food production through automation and precision technology.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex items-center gap-2">
            <img
              src={Icon1}
              alt="Farm"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <h1 className="text-lg font-semibold">Precision spraying</h1>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={Icon2}
              alt="Farm"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <h1 className="text-lg font-semibold">Moderen solution</h1>
          </div>
        </div>
        <Link to="/about">
        <a
          className="mt-6 inline-block bg-green-700 px-6 py-3 rounded text-white font-medium"
          >Learn More</a
        ></Link>
      </div>
    </section>

   <div id='services'>
    <Robot />
    </div>
    <div
      className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 -mt-30 relative z-10"
    >
    </div>
   
    <section className="py-16">
      <div
        className="container mx-auto md:px-8 flex flex-col md:flex-row items-center justify-center gap-10"
      >
        <div className="md:w-1/3" data-aos="fade-right">
          <img
            src={f13}
            className="rounded-lg shadow-lg w-full h-auto"
            alt=""
          />
        </div>
        <div className="md:w-1/3" data-aos="fade-left">
          <p className="text-[17px] font-bold text-orange-400">Our Farm Benefits</p>
          <h2 className="text-3xl font-bold">Why Choose Us Agribot Market</h2>
          <p className="text-sm">
            There are many variations of passages of available but the majortity
            have sufferred alteration in some form by injected humor or random
            word which don’t look even.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ To Increase Food Availability</li>
            <p className="text-sm">
              There are variation You need to be sure there is anything hidden
              in the middle of text.
            </p>
            <li>✔ Professional Engineers</li>
            <p className="text-sm">
              There are variation You need to be sure there is anything hidden
              in the middle of text.
            </p>
            <li>✔ Quality Robot</li>
            <p className="text-sm">
              There are variation You need to be sure there is anything hidden
              in the middle of text.
            </p>
          </ul>
        <Link to="/reviews">
            <a
              className="mt-6 inline-block bg-green-700 px-6 py-3 rounded text-white font-medium"
              >More</a></Link>
        </div>
      </div>
    </section>

  

    
    <section className="bg-orange-50">
      <footer className="bg-neutral-700 text-white py-12 text-sm">
        <div
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div>
            <p className="mb-4">
            Agribot is an advanced global agricultural robotics solution designed specifically for indoor and smart farming. Our intelligent robots help farmers increase productivity, reduce resource waste, and achieve sustainable food production through automation and precision technology.
            </p>
            <div className="flex space-x-4 text-yellow-400 text-xl">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Explore</h3>
            <div className="w-12 h-1 bg-green-500 mb-4"></div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="/about">About</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="#services">Service</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="/login">Meet the Engineer</a>
              </li>
              <li className="flex items-center space-x-2">
                <span>➤</span> <a href="/reviews">Latest News</a>
              </li>
              
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">News</h3>
            <div className="w-12 h-1 bg-green-500 mb-4"></div>
            <div className="mb-6">
              <p>Advance tech in agriculture made farming easy.</p>
              <p className="text-gray-400 text-sm">July 5 2022</p>
            </div>
            <div>
              <p>Now people can grow crops in indoor farms with minimal effort.</p>
              <p className="text-gray-400 text-sm">August 12 2022</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <div className="w-12 h-1 bg-green-500 mb-4"></div>
            <p className="flex items-center space-x-2">
              <span>📞</span> <span>+86 123 4567 8901</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>✉️</span> <span>liming2023@whut.edu.cn</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>📍</span> <span>China</span>
            </p>
            <div className="mt-4 flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 w-full border border-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              />
              <button
                className="bg-green-500 px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </footer>
      <div
        className="bg-gray-950 flex flex-col sm:flex-row justify-between text-white text-sm py-5 px-4 sm:px-20"
      >
        <p>© All Copyright 2024 by shawonetc Themes</p>
        <p>Terms of Use Privacy Policy</p>
      </div>
    </section>

 </div>

  )
}

export default Home;
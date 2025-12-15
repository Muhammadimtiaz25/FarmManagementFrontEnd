import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/images/Picturelogo.png";
import LogoutSvg from "../components/LogoutSvg";
import logo2 from "../assets/images/logo2.jpg";


const SupportChat = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        const faqRes = await axios.get("https://farm-management-backend-v6ne.vercel.app/chatbot/faqs");
        setFaqs(faqRes.data);

        const topicRes = await axios.get("https://farm-management-backend-v6ne.vercel.app/chatbot/topics");
        setTopics(topicRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleAsk = async () => {
    if (!question) return;
    try {
      const res = await axios.post("https://farm-management-backend-v6ne.vercel.app/chatbot/ask", { message: question });
      setAnswer(res.data.reply);
    } catch (err) {
      console.error(err);
      setAnswer("Error getting response.");
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Roboto", Inter, "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-solid border-b-[#e7edf4] px-4 sm:px-6 lg:px-10 py-3">
        <div className="flex items-center gap-2 sm:gap-4 text-[#0d141c] ">
          <div className="flex items-center space-x-2">
                <img src={logo2} alt="Logo" className="w-10 h-10 rounded-full" />
                <p className='text-green-700 font-bold'>AgriBot</p>
              </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden sm:flex sm:flex-1 justify-end gap-8">
          <a href="/" className="text-green-700 text-[16px] font-bold transition-colors">Home</a>
          {isLoggedIn ? (
            <button
  onClick={handleLogout}
  className="flex items-center gap-2 text-green-700 font-bold transition-colors cursor-pointer"
>
  <LogoutSvg className="w-6 h-6" />
  <span className="hidden sm:inline cursor-pointer">Logout</span>
</button>

          ) : (
            <a href="/login" className="text-green-700 text-[16px] font-bold transition-colors">Login</a>
          )}
        </nav>

       
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-green-700 focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </header>

     
      {menuOpen && (
        <div className="sm:hidden flex flex-col bg-white border-b border-gray-200 px-4 py-3 space-y-2">
          <a href="/" className="text-green-700 text-[16px] font-bold">Home</a>
          {isLoggedIn ? (
            <button
  onClick={handleLogout}
  className="flex items-center gap-2 text-green-700 font-bold transition-colors"
>
  <LogoutSvg className="w-6 h-6" />
  <span className="hidden sm:inline">Logout</span>
</button>

          ) : (
            <a href="/login" className="text-green-700 text-[16px] font-bold">Login</a>
          )}
        </div>
      )}

    
      <div className="px-4 sm:px-6 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5">
          <h2 className="text-[#0d141c] text-[22px] sm:text-[28px] font-bold text-center pb-3 pt-5">
            How can we help?
          </h2>

          <div className="flex gap-2 px-2 sm:px-4 mb-4">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleAsk} className="px-4 py-2 bg-green-700 text-white rounded">
              Ask
            </button>
          </div>

          {answer && (
            <div className="p-3 bg-gray-100 rounded mb-4">
              <p>{answer}</p>
            </div>
          )}

         
          <h2 className="text-[#0d141c] text-xl sm:text-[22px] font-bold px-2 sm:px-4 pb-3 pt-5">
            Popular topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-2 sm:p-4">
            {topics.map((t, i) => (
              <div key={i} className="flex flex-col gap-3 rounded-lg border border-[#cedbe8] bg-slate-50 p-4">
                <h2 className="text-base font-bold">{t.title}</h2>
                <p className="text-sm text-[#49739c]">{t.desc}</p>
              </div>
            ))}
          </div>

       
          <h2 className="text-[#0d141c] text-xl sm:text-[22px] font-bold px-2 sm:px-4 pb-3 pt-5">
            Frequently asked questions
          </h2>
          <div className="flex flex-col p-2 sm:p-4">
            {faqs.map((f, i) => (
              <details key={i} className="border-t border-[#cedbe8] py-2">
                <summary className="flex justify-between cursor-pointer">
                  <p className="text-sm font-medium text-[#0d141c]">{f.q}</p>
                </summary>
                <p className="text-sm text-[#49739c] pl-2 pt-1">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;

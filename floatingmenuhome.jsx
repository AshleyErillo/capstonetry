import { useState } from "react";
import ChatBot from "./ChatBot";

const FloatingMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMenu = () => {
    if (!isChatOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const openChat = () => {
    setIsMenuOpen(false);
    setIsChatOpen(true);
  };

  return (
    <>
      {/* Floating Button Menu */}
      <div className="floating-menu">
        <div className={`floating-options ${isMenuOpen ? "showing" : "hidden"}`}>
          <a href="/user/frequently-asked-questions">
            <button className="float-button" title="FAQs">
              <img src="asset/circle-help.png" alt="Help" />
            </button>
          </a>
          <button 
            className="float-button" 
            onClick={openChat} 
            title="Open Chatbot"
          >
            <img src="asset/bot.png" alt="Chat" />
          </button>
        </div>
        <button 
          className={`float-button main-button ${isMenuOpen ? "rotated" : ""}`} 
          onClick={toggleMenu} 
          title="Menu"
        >
          <img src="asset/menu.png" alt="Main" />
        </button>
      </div>

      {/* Chat Modal Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingMenu;

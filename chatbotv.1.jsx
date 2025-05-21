import { useState, useEffect, useRef } from "react";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello there!\n\nI'm your IT support chatbot! Need help with something? Don't worry—I've got you covered. Here's what I can do for you:\n\n✅ Troubleshoot common issues (slow computer, lost password)\n✅ Answer frequently asked IT questions\n✅ Help you submit a support request if you need IT assistance\n✅ Provide updates on your ticket status so you always know what's happening\n\nJust type your text here to make your work easier. How can I get started now and help today? 😊",
      sender: "bot",
      time: new Date(),
      isList: true
    },
    {
      text: "What should I do if I encounter a technical issue with my computer and I'm not sure whether it's hardware or software related?",
      sender: "user",
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Format time for message timestamps
  const formatMessageTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    
    return `${displayHours}:${minutes}${ampm}`;
  };

  // Format date display
  const formatDateDisplay = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;
    
    const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = now.getDate();
    const year = now.getFullYear();
    
    return `${displayHours}:${minutes}${ampm} | ${month} ${day}, ${year}`;
  };

  // Send message function
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      text: inputValue,
      sender: "user",
      time: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(inputValue);
      
      setMessages(prev => [...prev, {
        text: botResponse.text,
        sender: "bot",
        time: new Date(),
        isList: botResponse.isList
      }]);
    }, 1500);
  };

  // Bot response logic
  const getBotResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      return { 
        text: "Hello! How can I help you with your IT support needs?",
        isList: false
      };
    } 
    else if (lowercaseMessage.includes("ticket") && lowercaseMessage.includes("submit")) {
      return {
        text: "To submit a ticket, click the 'Submit a Ticket' button at the top of the page or describe your issue here and I can help guide you.",
        isList: false
      };
    }
    else if (lowercaseMessage.includes("hours") || lowercaseMessage.includes("support hours")) {
      return {
        text: "Our support team is available from 8:00 AM to 5:00 PM on weekdays. Tickets submitted outside these hours will be handled the next business day.",
        isList: false
      };
    }
    else if (lowercaseMessage.includes("check") && lowercaseMessage.includes("status")) {
      return {
        text: "You can check your ticket status by clicking the 'View Tickets' button at the top of the page.",
        isList: false
      };
    }
    else if (lowercaseMessage.includes("technical issue") || lowercaseMessage.includes("hardware") || lowercaseMessage.includes("software")) {
      return {
        text: "For hardware vs software issues, I recommend:",
        listItems: [
          "Try restarting your device first",
          "Check if other users are experiencing the same problem",
          "Note any error messages you see",
          "Contact our support team with these details so we can diagnose whether it's hardware or software"
        ],
        isList: true
      };
    }
    else if (lowercaseMessage.includes("thank")) {
      return {
        text: "You're welcome! Is there anything else I can help you with?",
        isList: false
      };
    }
    else {
      return {
        text: "I understand you need help. Could you provide more details about your issue so I can assist you better? Or you can submit a formal ticket using the 'Submit a Ticket' button.",
        isList: false
      };
    }
  };

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Render bot message with list if needed
  const renderBotMessage = (message) => {
    if (message.isList && message.listItems) {
      return (
        <>
          <p>{message.text}</p>
          <ul className="bot-features-list">
            {message.listItems.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </>
      );
    } else if (message.isList) {
      // Handle the initial welcome message with pre-formatted content
      return (
        <>
          {message.text.split('\n\n').map((paragraph, idx) => {
            if (paragraph.includes('✅')) {
              const lines = paragraph.split('\n');
              return (
                <ul key={idx} className="bot-features-list">
                  {lines.map((line, lineIdx) => (
                    <li key={lineIdx}>{line}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </>
      );
    } else {
      return message.text;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`chat-modal ${isOpen ? "showing" : "hidden"}`}>
      <div className="chat-modal-content">
        <header className="chat-header">
          <div className="chatbot-info">
            <img src="asset/chatbotagent.png" alt="Bot Avatar" className="bot-avatar" />
            <h3>PAXI</h3>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close Chat">&times;</button>
        </header>

        <div className="chat-messages">
          {/* Timestamp display */}
          <div className="timestamp-display">{formatDateDisplay()}</div>

          {/* Messages */}
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender}-message`}
            >
              <div className="message-text">
                {msg.sender === "bot" ? renderBotMessage(msg) : msg.text}
              </div>
              <span className="message-timestamp">{formatMessageTime(msg.time)}</span>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <button type="button" className="quick-action-btn">
              <img src="asset/paperclip.png" alt="Quick action" />
            </button>
            <input
              type="text"
              ref={chatInputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What's your message?"
              autoComplete="off"
              required
            />
            <button type="submit" className="send-btn">
              <img src="asset/send.png" alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

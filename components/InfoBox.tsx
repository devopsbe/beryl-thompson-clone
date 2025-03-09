'use client';

import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Link from 'next/link';

interface Message {
  isUser: boolean;
  text: string;
}

const InfoBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { isUser: false, text: "Hi there! I'm Beryl's assistant. How can I help you on your journey today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show the info box after a short delay when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // If expanding, scroll to bottom after a brief delay
    if (isCollapsed) {
      setTimeout(scrollToBottom, 300);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '' || isTyping) return;
    
    // Add user message
    setMessages([...messages, { isUser: true, text: inputMessage.trim() }]);
    const userQuery = inputMessage;
    setInputMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process and respond after a short delay
    setTimeout(() => {
      respondToMessage(userQuery);
      setIsTyping(false);
    }, 1500);
  };

  const respondToMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Simple rule-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = "Hello! How can I assist you with Beryl's teachings today?";
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('session') || lowerMessage.includes('booking')) {
      response = "I can help you schedule a session with Beryl. Please visit our appointments page or email BeginFromWithin@msn.com to book your time.";
    } else if (lowerMessage.includes('class') || lowerMessage.includes('classes') || lowerMessage.includes('teaching')) {
      response = "Beryl offers transformative classes that help you connect with your true self. You can explore all our classes in the Classes section.";
    } else if (lowerMessage.includes('book') || lowerMessage.includes('reading')) {
      response = "Beryl's book 'Journey to the Self' will be released on June 22nd. You can find more information on our Book page.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
      response = "You can reach Beryl at BeginFromWithin@msn.com. Sessions are conducted via Skype.";
    } else if (lowerMessage.includes('journey') || lowerMessage.includes('self') || lowerMessage.includes('begin from within') || lowerMessage.includes('process')) {
      response = "The Journey to the Self is a personal system of self-management that allows anyone to shift the energy of their experiences from discord to harmony through trusting what you hear when you listen.";
    } else if (lowerMessage.includes('thank')) {
      response = "You're welcome! I'm here to assist you on your journey.";
    } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee') || lowerMessage.includes('pay')) {
      response = "Monthly classes are $20 per month or $200 for an annual subscription. For personalized sessions, please contact us directly.";
    } else {
      response = "Thank you for reaching out. If you'd like to learn more about Beryl's approach to self-discovery, please explore our website or contact us directly at BeginFromWithin@msn.com.";
    }

    setMessages(prev => [...prev, { isUser: false, text: response }]);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 right-8 z-50"
    >
      {isCollapsed ? (
        // Collapsed State - Chat Button
        <div 
          onClick={toggleCollapse}
          className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          style={{ width: '60px', height: '60px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-md">
            1
          </span>
        </div>
      ) : (
        // Expanded State - Full Chat
        <div 
          className="bg-white dark:bg-background-darkAlt shadow-lg rounded-lg w-96 h-[80vh] max-h-[600px] flex flex-col overflow-hidden transition-all duration-300"
          style={{ boxShadow: '0 4px 25px rgba(0,0,0,0.1)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary-dark p-3">
            <div className="flex items-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <h3 className="font-medium">Beryl's Assistant</h3>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="bg-primary/10 dark:bg-primary-dark/20 p-4 flex justify-between items-center">
            <div>
              <h4 className="text-primary dark:text-primary-light font-medium mb-1">Welcome to Beryl's Journey</h4>
              <p className="text-xs text-secondary-light dark:text-gray-300">
                I'm here to guide you on your journey to self-discovery.
              </p>
            </div>
            <button 
              onClick={toggleCollapse}
              className="p-2 text-primary dark:text-primary-light hover:bg-primary/10 rounded-full transition-colors focus:outline-none"
              aria-label="Collapse chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
        </button>
      </div>

          {/* Messages */}
          <div className="p-4 flex-1 overflow-y-auto bg-gray-50 dark:bg-background-dark">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                {!msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 mr-2 self-end mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-1.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-gray-800 text-secondary dark:text-white rounded-tl-none border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 ml-2 self-end mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-1.5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 mr-2 self-end mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-1.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div className="typing-dot bg-primary"></div>
                    <div className="typing-dot bg-primary animation-delay-200"></div>
                    <div className="typing-dot bg-primary animation-delay-400"></div>
                  </div>
            </div>
            </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-background-darkAlt mt-auto">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-background-dark text-secondary dark:text-white rounded-l-md border-0 focus:ring-1 focus:ring-primary text-sm"
              />
              <button 
                onClick={sendMessage}
                disabled={inputMessage.trim() === '' || isTyping}
                className={`bg-primary text-white py-3 px-4 rounded-r-md transition-colors ${
                  inputMessage.trim() === '' || isTyping 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-primary-dark'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox; 
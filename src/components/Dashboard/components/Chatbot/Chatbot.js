import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history:', error);
        localStorage.removeItem('chatbot_messages');
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        message: userMessage
      });

      if (response.data.answer) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.answer,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('No answer received from bot');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatbot_messages');
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <i className="fas fa-robot"></i>
              <span>SmartFund Assistant</span>
            </div>
            <div className="chatbot-actions">
              <button 
                className="chatbot-action-btn" 
                onClick={clearChat}
                title="Clear chat"
              >
                <i className="fas fa-trash"></i>
              </button>
              <button 
                className="chatbot-action-btn" 
                onClick={toggleChatbot}
                title="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="chatbot-welcome">
                <i className="fas fa-robot"></i>
                <h3>Welcome to SmartFund Assistant!</h3>
                <p>Ask me anything about loans, investments, or financial services.</p>
                <div className="chatbot-suggestions">
                  <button 
                    className="suggestion-btn"
                    onClick={() => setInputMessage("What is a loan?")}
                  >
                    What is a loan?
                  </button>
                  <button 
                    className="suggestion-btn"
                    onClick={() => setInputMessage("How do I apply for a loan?")}
                  >
                    How do I apply for a loan?
                  </button>
                  <button 
                    className="suggestion-btn"
                    onClick={() => setInputMessage("What are the loan types?")}
                  >
                    What are the loan types?
                  </button>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
                >
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{message.timestamp}</div>
                  </div>
                  <div className="message-avatar">
                    <i className={`fas ${message.sender === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="message-text">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={sendMessage}>
            <div className="chatbot-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="chatbot-input"
              />
              <button 
                type="submit" 
                disabled={!inputMessage.trim() || isLoading}
                className="chatbot-send-btn"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

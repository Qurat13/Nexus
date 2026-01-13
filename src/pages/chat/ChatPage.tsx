import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Phone, Video, Smile, Paperclip, MoreVertical, MessageCircle } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { ChatUserList } from '../../components/chat/ChatUserList';
import { useAuth } from '../../context/AuthContext';
import { Message } from '../../types';
import { findUserById } from '../../data/users';
import { getMessagesBetweenUsers, sendMessage, getConversationsForUser } from '../../data/messages';

export const ChatPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const chatPartner = userId ? findUserById(userId) : null;
  
  useEffect(() => {
    if (currentUser) {
      setConversations(getConversationsForUser(currentUser.id));
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (currentUser && userId) {
      setMessages(getMessagesBetweenUsers(currentUser.id, userId));
    }
  }, [currentUser, userId]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !userId) return;
    
    const message = sendMessage({
      senderId: currentUser.id,
      receiverId: userId,
      content: newMessage
    });
    
    setMessages([...messages, message]);
    setNewMessage('');
    setConversations(getConversationsForUser(currentUser.id));
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="flex h-[calc(100vh-140px)] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg animate-fade-in">
      
      {/* --- Sidebar: Conversations List --- */}
      <div className="hidden md:block w-80 lg:w-1/4 border-r border-gray-100 bg-gray-50/30">
        <div className="p-4 border-b bg-white/50 backdrop-blur-md">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          <ChatUserList conversations={conversations} />
        </div>
      </div>
      
      {/* --- Main Chat Area --- */}
      <div className="flex-1 flex flex-col bg-[#f8f9fc]">
        {chatPartner ? (
          <>
            {/* Professional Header */}
            <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center">
                <Avatar
                  src={chatPartner.avatarUrl}
                  alt={chatPartner.name}
                  size="md"
                  status={chatPartner.isOnline ? 'online' : 'offline'}
                  className="mr-3 ring-2 ring-indigo-50"
                />
                <div>
                  <h2 className="text-sm font-bold text-gray-900">{chatPartner.name}</h2>
                  <p className="text-[10px] font-medium text-green-500 flex items-center gap-1 uppercase tracking-tighter">
                    {chatPartner.isOnline ? (
                      <><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online</>
                    ) : (
                      <span className="text-gray-400">Offline</span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-indigo-50 text-gray-500"><Phone size={18} /></Button>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-indigo-50 text-gray-500"><Video size={18} /></Button>
                <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-indigo-50 text-gray-500"><MoreVertical size={18} /></Button>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
               {/* Date Divider Example */}
               <div className="flex justify-center my-4">
                 <span className="text-[10px] font-bold bg-gray-200/50 text-gray-500 px-3 py-1 rounded-full uppercase">Today</span>
               </div>

              {messages.length > 0 ? (
                <>
                  {messages.map(message => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isCurrentUser={message.senderId === currentUser.id}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <MessageCircle size={48} />
                  <p className="text-sm font-medium mt-2">Start your deal discussion</p>
                </div>
              )}
            </div>
            
            {/* Message Input: Professional Look */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200 focus-within:border-indigo-400 transition-all">
                <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-indigo-600 rounded-full"><Paperclip size={20} /></Button>
                
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-2"
                />
                
                <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-indigo-600 rounded-full"><Smile size={20} /></Button>
                
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 transition-all shadow-md"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-center p-8">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 border border-gray-100">
              <MessageCircle size={40} className="text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Your Inbox</h2>
            <p className="text-gray-500 mt-2 max-w-xs text-sm">
              Select a contact from the sidebar to start discussing investment opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import MenuBar from './MenuBar/MenuBar.js';
import Chats from './Chats/Chats.js';
import Message from './Message/Message.js';

function Project() {
  const navigate = useNavigate();

  const [ contact, setContact ] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);

  const getContact = (user) => {
    setContact(user)
  };

  useEffect(() => {
    if(localStorage.getItem('Chat-user')) {
      setCurrentUser(JSON.parse(localStorage.getItem('Chat-user')));
    } else {
      navigate('/login')
    }
  },[]);

  return (
    <section className='flex w-full h-[100vh]'>
      <MenuBar />
      <Chats getContact={getContact} currentUser={currentUser}/>
      <Message contact={contact} currentUser={currentUser}/>
    </section>
  )
}

export default Project
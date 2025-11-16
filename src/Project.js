import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import MenuBar from './MenuBar/MenuBar.js';
import Chats from './Chats/Chats.js';
import Message from './Message/Message.js';
import axios from "axios";
import { getProfileHost } from "./utils/Hosts.js";

function Project() {
  const navigate = useNavigate();

  const [ contact, setContact ] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);

  const getContact = (user) => {
    setContact(user)
  };

  useEffect(() => {
    const callFunc = async() => {

        try {
          const res = await axios.get(getProfileHost, {
            params: { token: localStorage.getItem("jwt_token") }
          });

          if(res.data.status) {
            setCurrentUser(res.data.user);
          } else {
            navigate("/login")
          }
          
        } catch(err) {
          console.error(err)
        }

    };

    callFunc();

  },[]);

  return (
    <section className='flex w-full h-[100vh]'>
      <MenuBar />
      <Chats 
        contact={contact}
        getContact={getContact}/>
      <Message 
        contact={contact} 
        currentUser={currentUser}
        getContact={getContact}/>
    </section>
  )
}

export default Project
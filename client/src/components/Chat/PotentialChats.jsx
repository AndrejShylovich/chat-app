import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

function PotentialChats() {

    const {user} = useContext(AuthContext)
    const {potentialChats, createChat, onlineUsers} = useContext(ChatContext)
    console.log(onlineUsers);
    return (
        <div className="all-users">
            {potentialChats && 
                potentialChats.map((u,index) => {
                    return(
                        <div className="single-user" key={index} onClick={()=>createChat(user._id, u._id)}>
                        {u.username}
                        <span className= {onlineUsers?.some((user)=> { console.log(user); return user === u?._id}) ? "user-online" : ""}></span>
                        </div>
                    )
                })
            }
            
        </div>
    );
}

export default PotentialChats;
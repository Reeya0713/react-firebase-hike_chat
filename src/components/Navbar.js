import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom';
import hikeimg from '../icon.png'

const Navbar = () => {

  const hikestyle={
    width:'82px',
    height:'31px',
    color: "#A74AC7"
  };

  const history = useHistory();

  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };
  return (
    <nav>
      <h3>
        <img src={hikeimg} alt='hike' style={hikestyle}/>
      </h3>
      <div>
        {user ? 
          <>
            <Link to="/">Chats</Link>
            <Link to="/profile">Profile</Link>
            <button className='btn' onClick={handleSignout}>Logout</button>
          </> :
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
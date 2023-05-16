import { useStore } from "./useStore";

const  UserInformation = () => {
    const {user, userId} = useStore()
    const setUser = useStore((state) => state.setUser)
    const setUserId = useStore((state) => state.setUserId)
    console.log(userId)
    const logOut = async () => {
        console.log('here')
        try {
            const response = await fetch('/api/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Replace with how you're storing your JWT
                },
            });
            if (response.ok) {
                // Reset user and userId in the store
                console.log('nice')
                setUser('');
                setUserId(null);
                window.location.href = '/'
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    

    
    return(
       <div className="userInfo">
        <h1>User Info</h1>
        <p>username: {user}</p>
        <p>user ID:  {userId}</p>
        <button onClick={logOut}>Log Out</button>
       </div>
    )
}

export default UserInformation;
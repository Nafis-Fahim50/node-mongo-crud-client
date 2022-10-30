import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUser, setDisplayUser] = useState(users)
    const handleToDelete = user => {
        const agree = window.confirm(`Are you sure to deleted ${user.name}`);
        if (agree) {
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('successfully remove user')
                        const remainingUser = displayUser.filter(usr => usr._id !== user._id);
                        setDisplayUser(remainingUser);
                    }
                })
        }
    }
    return (
        <div>
            <h2>Total Users: {displayUser.length}</h2>
            <div>
                {
                    displayUser.map(user => <p key={user._id}>
                        {user.name} {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleToDelete(user)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;
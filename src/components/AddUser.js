import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddUser = () => {

    const [user, setUser] = useState({});

    const handleAddUser = event => {
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('User added successfully');
                    event.target.reset();
                }

            })
    }

    const handleInputBlur = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <h3>Add users</h3>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name='name' placeholder='name' />
                <br />
                <input onBlur={handleInputBlur} type="text" name='address' placeholder='address' />
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" id="" placeholder='email' />
                <br />
                <button type="submit">Add user</button>
            </form>
        </div>
    );
};

export default AddUser;
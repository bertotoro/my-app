import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import axios from "axios";

function Users() {
    const { id } = useParams()

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));

    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/' + id)
        .then(res => {
            console.log (res)
            const updatedData = data.filter(user => user._id !== id);
            setData(updatedData); 
        }).catch(err => console.log(err))
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter the users based on the search term
    const filteredUsers = data.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.age.toString().includes(searchTerm) ||
        user.pass.toString().includes(searchTerm)
    );

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h1 className="mb-4">Admin Users</h1> 
                <Link to="/create" className="btn btn-success btn-sm">
                    add +
                </Link>
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control mt-2"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>{user.pass}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            }) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;

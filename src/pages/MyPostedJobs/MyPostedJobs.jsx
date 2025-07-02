import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyPostedJobs = () => {

    const [jobs, setjobs] = useState([])
    const { user } = useAuth()
    useEffect(() => {
        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setjobs(data)
            })
    }, [user.email])

    return (
        <div>
            <h2 className='text-3xl'>My posted jobs: {jobs.length}</h2>
        </div>
    );
};

export default MyPostedJobs;
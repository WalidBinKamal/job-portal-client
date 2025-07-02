import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const AddJob = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const handleAddJob = (e) => {

        e.preventDefault()
        const formData = new FormData(e.target)
        const initialData = Object.fromEntries(formData.entries())
        const { min, max, currency, ...newJob } = initialData
        newJob.salaryRange = { max, min, currency }
        newJob.requirements = newJob.requirements.split('\n')
        newJob.responsibiliies = newJob.responsibiliies.split('\n')
        console.log(newJob)

        fetch('http://localhost:5000/jobs', {
            method: "POST",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your job has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myPostedJobs')
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl">Post a New Job</h2>
            <form onSubmit={handleAddJob} className="card-body">
                {/* Job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name='title' placeholder="Job Title" className="input w-full input-bordered" required />
                </div>
                {/* job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name='location' placeholder="Job Location" className="input w-full input-bordered" required />
                </div>
                {/* job type */}
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select defaultValue="Pick a Job Type" name='jobType' className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick a Job Type</option>
                        <option>Full-time</option>
                        <option>Intern</option>
                        <option>Part-time</option>
                    </select>
                </div>
                {/* job field */}
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Job Field</span>
                    </label>
                    <select defaultValue="Pick a Job Field" name='category' className="select select-ghost w-full max-w-xs">
                        <option disabled>Pick a Job Field</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>
                </div>
                {/* Application deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Application Deadline</span>
                    </label>
                    <input type="date" name='applicationDeadline' placeholder="Job Location" className="input w-full input-bordered" required />
                </div>
                {/* salary range */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input type="number" name='min' placeholder="Min" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="number" name='max' placeholder="Max" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control flex flex-col">
                        <select defaultValue={'Currency'} name='currency' className="select select-ghost w-full max-w-xs">
                            <option disabled>Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>INR</option>
                        </select>
                    </div>
                </div>
                {/* Job Description */}
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered" name='description' placeholder="Job Description" required></textarea>
                </div>
                {/* Company name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" name='company' placeholder="Company Name" className="input w-full input-bordered" required />
                </div>
                {/* requirements */}
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea className="textarea textarea-bordered" name='requirements' placeholder="Put each requirements in a new line" required></textarea>
                </div>
                {/* responsibiliies */}
                <div className="form-control flex flex-col">
                    <label className="label">
                        <span className="label-text">Job Responsibiliies</span>
                    </label>
                    <textarea className="textarea textarea-bordered" name='responsibiliies' placeholder="Put each responsibiliies in a new line" required></textarea>
                </div>
                {/* hr_email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} name='hr_email' placeholder="HR Email" className="input w-full input-bordered" required />
                </div>
                {/* hr name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name='hr_name' placeholder="HR Name" className="input w-full input-bordered" required />
                </div>
                {/* Company logo */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="url" name='company_logo' placeholder="Company Logo URL" className="input input-bordered w-full" required />
                </div>

                {/* submit button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary w-full">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;
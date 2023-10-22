import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const FormComp = ({
    handleClick,
    btnText,
    login,
    handleFormSubmit,
    handleChange,
    state,
    formValues,
    googleLogin,
    handleFileChange
}) => {
    const [passCheck, setPassCheck] = useState(false);

   

    return (
        <form 
         className="card-body px-4">
            {state && (
                <div className={state === 'Successful' ? 'text-green-500' : 'text-red-500'}>
                    {state}
                </div>
            )}
            {/* display name  */}
            {!login && (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="name"
                        name="displayName"
                        // value={formValues.displayName}
                        className="input input-bordered"
                        required
                        onChange={handleChange}
                    />
                </div>
            )}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    // value={formValues.email}
                    className="input input-bordered"
                    required
                    onChange={handleChange}
                />
            </div>
            {/* photoURL */}
            {!login &&
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Photo URL</span>
                </label>
                <input
                    type="text"
                    placeholder="paste uploaded image url here"
                    name="photoURL"
                    // value={formValues.email}
                    className="input input-bordered"
                    onChange={handleChange}
                />
            </div>
            }
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <div className="flex relative items-center">
                    <input
                        type={passCheck ? 'text' : 'password'}
                        placeholder="password"
                        name="password"
                        className="input input-bordered relative w-full"
                        // value={formValues.password}
                        required
                        onChange={handleChange}
                    />
                    <AiFillEye
                        className={passCheck ? 'absolute right-2 text-xl' : 'hidden'}
                        onClick={() => setPassCheck(!passCheck)}
                    />
                    <AiFillEyeInvisible
                        className={!passCheck ? 'absolute right-2 text-xl' : 'hidden'}
                        onClick={() => setPassCheck(!passCheck)}
                    />
                </div>
                {/* file  */}
                {/* {
                    !login &&
                    <label className="label">
                        <span className="label-text">Photo</span>
                        <input
                            type="text"
                            name="photoURL"
                            // accept="image/*"
                            onChange={handleChange}
                        />
                    </label>
                } */}

                {login && (
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">
                            Forgot password?
                        </a>
                    </label>
                )}
                <label className="label" onClick={handleClick}>
                    <Link href="#" className="label-text-alt link link-hover">
                        {login ? <span>Not registered yet?</span> : <span>Register already?</span>}
                    </Link>
                </label>
                <button className="btn bg-transparent" onClick={googleLogin}>
                    <FcGoogle className="text-xl" /> Login with Google
                </button>
            </div>
            <div className="form-control mt-6">
                <button className={`btn btn-primary ${!login && 'bg-rose-500 hover:bg-rose-700'}`} onClick={handleFormSubmit}>
                    {btnText}
                </button>
            </div>
        </form>
    );
};

export default FormComp;
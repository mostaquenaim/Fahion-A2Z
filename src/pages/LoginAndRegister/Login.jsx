import { useContext, useState } from "react";
import FormComp from "./FormComp";
import LogText from "./LogText";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Auth/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    // signInWithPopup, 
    updateProfile,
    // getStorage, 
    // ref 
} from "firebase/auth";
import { ThemeContext } from "../../Components/Theme/ThemeProvider";

const Login = () => {
    const { theme } = useContext(ThemeContext)
    const location = useLocation();
    const navigate = useNavigate();
    const { signIn, createUser, handleGoogleSignIn, user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const [currentState, setCurrentState] = useState('')
    const [login, setLogin] = useState(true)
    const [loginStyle, setLoginStyle] = useState("hero-content flex-col lg:flex-row-reverse ")
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        displayName: '',
        photoURL: ''
    })

    const handleRegister = () => {
        setCurrentState('')
        setLogin(false)
        setLoginStyle("hero-content flex-col lg:flex-row")
    }

    const handleLogin = () => {
        setCurrentState('')
        setLogin(true)
        setLoginStyle("hero-content flex-col lg:flex-row-reverse")

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleFormSubmitLogin = (e) => {
        e.preventDefault();

        signIn(formValues.email, formValues.password)
            .then(result => {
                console.log(result.user);
                toast('Logged in')
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error)
                toast(error.message);
            })
    }

    // registration 
    const handleFormSubmitRegister = e => {
        e.preventDefault();

        const hasCapitalLetter = /[A-Z]/.test(formValues.password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(formValues.password);

        if (formValues.password.length < 6) {
            toast('Password must be at least 6 characters')
            return
        }
        if (!hasCapitalLetter) {
            toast('Password must have at least 1 capital letter')
            return
        }
        if (!hasSpecialChar) {
            toast('Password must have at least 1 special character')
            return
        }
        // create user
        createUser(formValues.email, formValues.password)
            .then(result => {
                console.log(result.user)
                updateProfile(result.user, {
                    displayName: formValues.displayName,
                    photoURL: formValues.photoURL
                }).then(() => {
                    toast("Profile created")
                    navigate(location?.state ? location.state : '/');
                }).catch((error) => {
                    toast(error.message)
                });

                toast('You have registered successfully')
                setFormValues({
                    email: '',
                    password: '',
                    displayName: '',
                    photoURL: ''
                })

            })
            .catch(error => {
                toast(error.message)
            })
    }

    return (
        <>
            {
                user ?
                    <Navigate to={location?.state ? location.state : '/'} />
                    :
                    <div data-theme={theme}>
                        <Link to='/' >
                            <figure className="bg-base-200 mx-auto pt-10">
                                <img src="/logo.jpg" alt="" className="h-32 mx-auto border-4 border-base-600 rounded-lg" />
                            </figure>
                        </Link>
                        <div className="hero min-h-screen bg-base-200">
                            <div className={loginStyle}>
                                <LogText title={login ? "Login Now!" : "Register Now!"} desc="" />
                                <div
                                    data-aos={login ? "fade-right" : "fade-left"}
                                    className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                    <FormComp
                                        handleClick={login ? handleRegister : handleLogin}
                                        btnText={login ? "Login" : "Register"} login={login}
                                        handleFormSubmit={login ? handleFormSubmitLogin : handleFormSubmitRegister}
                                        handleChange={handleChange}
                                        state={currentState}
                                        formValues={formValues}
                                        googleLogin={handleGoogleSignIn}
                                        handleFileChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <ToastContainer></ToastContainer>
                    </div>}
        </>
    );
};

export default Login;
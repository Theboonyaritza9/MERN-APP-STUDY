import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SignScreen(props) {
    // 1. Connect state.userSignin if userInfo = false : Login
    // userInfo = True => Action changes value again and Ridirect Page

    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    // console.log('UserSigin: ', userInfo);

    useEffect(() => {
        // 3.44 hr
        // if Login then link to Shipping Page
        if (userInfo) {
            // props.history.push("/");
            props.history.push(redirect);
        }
        return () => {

        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));

    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li><h2>Sign-in</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        New to amazona?
                    </li>
                    <li>
                        <Link to={redirect === "/" ? "register":"register?redirect=" + redirect} className="button secondary text-center">Create your amazona account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SignScreen;

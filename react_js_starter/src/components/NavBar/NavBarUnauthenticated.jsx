import { Link } from "react-router-dom";

export function NavBarUnauthenticated(){
    return (
        <>
            <div className="container" name="NavBarUnauthenticated">
                <ul>
                    <li className="navbar-menu">
                        <Link className="navbar-link" to="/account/login">Login</Link>
                        <Link className="navbar-link" to="/account/register">Register</Link>
                        <Link className="navbar-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
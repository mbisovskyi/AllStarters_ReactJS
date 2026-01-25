// React imports
import { Link } from "react-router-dom";

// Service imports
import AuthenticationService from "../../services/AuthenticationService";

export function NavBarAuthenticated({ user }){
    return (
        <>
        {user ? 
            <div className="container" name="NavBarAuthenticated">
                <ul>
                    <li className="navbar-menu">
                        <Link className="navbar-link">Home</Link>
                        <Link className="navbar-link" onClick={ AuthenticationService.handleAccountLogout }>Logout</Link>
                    </li>
                </ul>

                <span>Welcome, {user.userName}</span>
            </div>
            : null}
        </>
    )
}
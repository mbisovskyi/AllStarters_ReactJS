import { Link } from "react-router-dom";

export function NavBarLogo(){
    return (
        <>
            <div className="container" name="NavBarLogo">
                <Link to="/">Your Website Name</Link>
            </div>
        </>
    )
}
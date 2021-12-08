import { NavLink } from "react-router-dom";
import ErrorMassage from "../errorMassage/ErrorMassage";

const PageNotFound = () => {
    return (
        <div>
            <ErrorMassage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '20px'}}>OOOPS... Page not found!</p>
            <NavLink to='/' style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}>Back to main page</NavLink>
        </div>
    )
}

export default PageNotFound;
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Data Visualization Bachelorarbeit</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/news">News</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;
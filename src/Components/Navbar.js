import { Link } from "react-router-dom";
import { IoReloadCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const refreshPage = () => {
    setTimeout(function () {
      window.location.reload(true);
    });
  };

  return (
    <nav className="navbar">
      <h1>Data Visualization Bachelorarbeit</h1>
      <h1 className="refresh-btn" onClick={() => refreshPage}>
        {<IoReloadCircleSharp />}
      </h1>
    </nav>
  );
};

export default Navbar;

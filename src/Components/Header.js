import { IoReloadCircleSharp } from "react-icons/io5";

const Header = () => {
  return (
    <nav className="navbar">
      <h1>Data Visualization Bachelorarbeit</h1>
      <h1 className="refresh-btn" onClick={() => window.location.reload()}>
        {<IoReloadCircleSharp />}
      </h1>
    </nav>
  );
};

export default Header;

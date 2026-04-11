import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/">Index</Link>
      <Link to="/heat">Heat</Link>
    </nav>
  );
}

export default Nav;

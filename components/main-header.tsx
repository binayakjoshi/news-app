import Link from "next/link";
import NavLink from "./nav-link";
const MainHeader = () => {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/news">news</NavLink>
          </li>
          <li>
            <NavLink href="/archive">archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;

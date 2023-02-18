import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";

export interface IHeader extends React.ComponentPropsWithoutRef<"header"> {}

const logoPath = "../../assets/images/logo.png";
const Header: React.FC = ({ ...headerProps }) => {
  const { user, isAuthReady } = useContext(AuthContext);

  return (
    <header {...headerProps} className={`containerParent bgBlack`}>
      <nav className={`${styles.nav} container`}>
        {/*--- logo & name ---*/}
        <Link href={"/"}>
          <div className={`${styles.navBrand} clickableElem`}>
            <img src={logoPath} className={`${styles.logo}`} />
            <h3 className={` headline5 `}>COSMIC</h3>
          </div>
        </Link>
        {/*--- search bar ---*/}
        <div className={`${styles.searchBar}`}>
          <input type="text" placeholder="search ..." className={` body1 `} />
          <span>
            <i className="bi bi-search"></i>
          </span>
        </div>

        {/*--- search bar ---*/}

        {user == null && (
          <Link href={"/login"}>
            <a className={`${styles.login} button primaryGradientBtn`}>
              Log In
            </a>
          </Link>
        )}

        {user != null && (
          <div className={`${styles.login} flexElem`}>
            <Link href={"/my_songs"}>
              <a
                className= {`button primaryGradientBtn mr-sm`}
              >
                <i className="bi bi-upload"></i>
                <span className="ml-sm">My Music</span>
              </a>
            </Link>
            <Link href={"/profile"}>
              <a className={`button primaryGradientBtn`}>
                My Profile
              </a>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

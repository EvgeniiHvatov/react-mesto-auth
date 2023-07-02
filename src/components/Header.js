import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';


const Header = ({title, route, email, onClick}) => {
  return (
      <header className="header">
        <div style={{ backgroundImage: `url(${logo})` }} className="header__logo"/>
          <div className='header__auth'>
          <p className='header__text'>{email}</p>
          <Link to={route} className='header__link' onClick={onClick}>{title}</Link>
        </div>
      </header>
  );
}

export default Header;

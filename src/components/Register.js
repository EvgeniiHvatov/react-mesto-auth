import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register({onRegister}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onRegister(email, password);
  };

  return (
    <section className='login'>
      <h3 className='login__title'>Регистрация</h3>
      <form className='login__form' onSubmit={handleSubmit}>
        <input className='login__input' type='email' placeholder='Email' value={email} onChange={handleEmailInput} required></input>
        <input className='login__input' type='password' placeholder='Пароль' value={password} onChange={handlePasswordInput} required></input>
        <button className='login__submit-button'>Зарегистрироваться</button>
      </form>
      <p className='login__btn-caption'>Уже зарегистрированы? <Link to="/signin" className='login__link'>Войти</Link></p>
    </section>
  );
};
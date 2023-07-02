import {useState} from 'react';

export default function Login({onLogin}) {
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
    onLogin(email, password);
  };

  return (
    <section className='login'>
      <h3 className='login__title'>Вход</h3>
      <form className='login__form' onSubmit={handleSubmit}>
        <input className='login__input' type='email' placeholder='Email' value={email} onChange={handleEmailInput} required></input>
        <input className='login__input' type='password' placeholder='Пароль' value={password} onChange={handlePasswordInput} required></input>
        <button className='login__submit-button'>Войти</button>
      </form>
    </section>
  );
};
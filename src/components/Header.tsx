import styles from './Header.module.css'
import Logo from '../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}> 
    <img src={Logo} alt="App's logo" />
    <h3>to<span>do</span></h3>
    </header>
  )
}
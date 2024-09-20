import styles from './index.module.css'

export default function Header(){
    return (
        <header className={styles.header}>
            <h1>Site de Hoteis</h1>
            <input type="checkbox" name="darkmode" placeholder='Darkmode'/>
        </header>
    )
}
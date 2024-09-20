import styles from './products.module.css'
import { Link } from 'react-router-dom'

export default function Product({ hotel }) {
    return (
        <Link to={`/detalhes/${hotel.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '10px' }}>

            <div className={styles.produto}>
                <img src={hotel.img} className={styles.img} />
                <div className={styles.hotelInfo}>
                    <div className={styles.classificacao}>
                        <span>{hotel.classificacao} ★</span>
                    </div>
                    <h3 className={styles.nome}>{hotel.nome}</h3>
                    <div className={styles.espacoPreco}>
                        <span className={styles.preco}>Diária: R$ {hotel.preco}</span>

                    </div>
                </div>
            </div>
        </Link>
    )
}
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'
import styles from './Details.module.css'
import { useParams } from 'react-router-dom'
import {register } from 'swiper/element/bundle'
import {Swiper, SwiperSlide} from 'swiper/react'
register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'


export default function Details() {
  
    const { id } = useParams();

    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        const hoteis = JSON.parse(localStorage.getItem('hoteis'))
        if (hoteis) {
            const hotelEncontrado = hoteis.find(h => h.id === parseInt(id));
            setHotel(hotelEncontrado)
        }
    }, [id])

    if (!hotel) {
        return <p>Carregando....</p>
    }


    return (
        <div className={styles.container}>
            <Header />

            <Swiper>
            <div className={styles.content}>
                <div>
                    <img src={hotel.img} alt="" />
                </div>


                <div className={styles.details}>
                    <p>{hotel.nome}</p>
                    <p>{hotel.id}</p>
                    <p>R${hotel.preco}</p>
                    <p>{`${hotel.cidade}, ${hotel.estado}`}</p>
                    <p>{hotel.descricao}</p>
                </div>
            </div>
            </Swiper>
        </div>
    )
}
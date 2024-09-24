import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './Details.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import HotelModal from '../../components/Formulario/formulario';
import 'swiper/css';
import 'react-responsive-modal/styles.css';
import { FaRegEdit } from "react-icons/fa";

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const hoteis = JSON.parse(localStorage.getItem('hoteis'));
        if (hoteis) {
            const hotelEncontrado = hoteis.find(h => h.id === parseInt(id));
            setHotel(hotelEncontrado);
        }
    }, [id]);

    function handleSave(updatedHotel) {
        const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
        const indexHotel = hoteis.findIndex(h => h.id === updatedHotel.id);

        if (indexHotel !== -1) {
            hoteis[indexHotel] = updatedHotel;
            localStorage.setItem('hoteis', JSON.stringify(hoteis));
            setHotel(updatedHotel);
            setOpenModal(false);
            alert("Hotel editado com sucesso!");
        }
    }

    function handleDelete(hotelToDelete) {
        const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
        const updatedHoteis = hoteis.filter(h => h.id !== hotelToDelete.id);

        localStorage.setItem('hoteis', JSON.stringify(updatedHoteis));
        setOpenModal(false);
        navigate('/');
        alert("Hotel excluído com sucesso!");
    }

    if (!hotel) {
        return <p>Carregando....</p>;
    }

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.content}>
                <div>
                    <img src={hotel.img} alt={hotel.nome} />
                </div>

                <div className={styles.details}>
                    <p>{hotel.nome}</p>
                    <p>{hotel.classificacao} estrelas</p>
                    <p>R${hotel.preco}</p>
                    <p>{`${hotel.cidade}, ${hotel.estado}`}</p>
                    <p>{hotel.descricao}</p>
                </div>
                <FaRegEdit className={styles.float_button} onClick={() => setOpenModal(true)}></FaRegEdit>
            </div>


            <HotelModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                hotelData={hotel}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
}

import Header from '../../components/Header/Header'
import Product from '../../components/product/products'
import { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal';
import styles from './index.module.css'

import 'react-responsive-modal/styles.css';

export default function Home() {

    const [openModal, setOpenModal] = useState(false)

    const [formData, setFormData] = useState({
        nome: "",
        img: "",
        classificacao: "",
        cidade: "",
        estado: "",
        preco: "",
        descricao: ""
    })

    const [hoteis, setHoteis] = useState([])

    function carregarHoteis() {
        const hoteisLocal = JSON.parse(localStorage.getItem("hoteis"))


        if (hoteisLocal) {
            setHoteis(hoteisLocal)
        } else {

            const mock = [
                {
                    id: 1,
                    nome: "Hotel Novo",
                    img: "https://www.kayak.com.br/news/wp-content/uploads/sites/12/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3-1640x1312.jpg",
                    classificacao: 3,
                    cidade: "Estancia velha",
                    estado: "RS",
                    preco: 320,
                    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate tempora soluta fugit facilis aut. Corrupti voluptas quos sit incidunt quibusdam cumque ad nulla sapiente sequi voluptates, natus quia beatae rerum?"
                },
                {
                    id: 2,
                    nome: "Hotel velho",
                    img: "https://www.kayak.com.br/news/wp-content/uploads/sites/12/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3-1640x1312.jpg",
                    classificacao: 4,
                    cidade: "Estancia nova",
                    estado: "RS",
                    preco: 420,
                    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate tempora soluta fugit facilis aut. Corrupti voluptas quos sit incidunt quibusdam cumque ad nulla sapiente sequi voluptates, natus quia beatae rerum?"
                },
                {
                    id: 3,
                    nome: "Hotel cachorro",
                    img: "https://www.kayak.com.br/news/wp-content/uploads/sites/12/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3-1640x1312.jpg",
                    classificacao: 1,
                    cidade: "Estancia nova",
                    estado: "RS",
                    preco: 120,
                    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate tempora soluta fugit facilis aut. Corrupti voluptas quos sit incidunt quibusdam cumque ad nulla sapiente sequi voluptates, natus quia beatae rerum?"
                },
                {
                    id: 4,
                    nome: "Hotel ",
                    img: "https://www.kayak.com.br/news/wp-content/uploads/sites/12/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3-1640x1312.jpg",
                    classificacao: 4,
                    cidade: "Novo hamburgo",
                    estado: "RS",
                    preco: 220,
                    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate tempora soluta fugit facilis aut. Corrupti voluptas quos sit incidunt quibusdam cumque ad nulla sapiente sequi voluptates, natus quia beatae rerum?"
                },
                {
                    id: 5,
                    nome: "Hotel dddd",
                    img: "https://www.kayak.com.br/news/wp-content/uploads/sites/12/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3-1640x1312.jpg",
                    classificacao: 2,
                    cidade: "Estancia",
                    estado: "RS",
                    preco: 120,
                    descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate tempora soluta fugit facilis aut. Corrupti voluptas quos sit incidunt quibusdam cumque ad nulla sapiente sequi voluptates, natus quia beatae rerum?"
                }

            ];

            localStorage.setItem('hoteis', JSON.stringify(mock));
            setHoteis(mock);

        }

    };

    useEffect(() => {
        carregarHoteis()
    }, [])

    async function criarHotel() {
        try {
            const hoteisExistentes = JSON.parse(localStorage.getItem('hoteis')) || [];
            const novoHotel = {
                    id: hoteisExistentes.length + 1,
                    nome: formData.nome,
                    img: formData.img,
                    classificacao: formData.classificacao,
                    cidade: formData.cidade,
                    estado: formData.estado,
                    preco: formData.preco,
                    descricao: formData.descricao
            }
          
            const novaListaHoteis = [...hoteisExistentes, novoHotel];

            await localStorage.setItem('hoteis', JSON.stringify(novaListaHoteis));

            carregarHoteis()
            alert("produto criado com sucesso");
            setOpenModal(false)
            setFormData({
                nome: "",
                img: "",
                classificacao: "",
                cidade: "",
                estado: "",
                preco: "",
                descricao: ""
            })
        } catch {
            alert("erro ao cadastrar")
        }
    }


    return (
        <div>
            <Header />
            <h1>Ola </h1>
            <div className={styles.home}>
                {Array.isArray(hoteis) && hoteis.length > 0 ? (
                    hoteis.map((hotel) => (
                        <Product key={hotel.id} hotel={hotel} />
                    ))
                ) : (
                    <p>Não há hotéis disponíveis no momento.</p>
                )}

            </div>


            <button className={styles.float_button} onClick={() => setOpenModal(true)}>+</button>

            <Modal

                center
                closeOnEsc
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div className={styles.container_modal}>
                    <h1>Ola cexerx</h1>
                    <input value={formData.nome} onChange={(event) => setFormData({ ...formData, nome: event.target.value })} type="text" placeholder='Nome do Hotel' />

                    <div className={styles.row}>
                        <input value={formData.preco} onChange={(event) => setFormData({ ...formData, preco: event.target.value })} type="text" placeholder='Valor da Diária' />
                        <input value={formData.cidade} onChange={(event) => setFormData({ ...formData, cidade: event.target.value })} type="text" placeholder='Cidade' />
                        <input value={formData.estado} type="text" onChange={(event) => setFormData({ ...formData, estado: event.target.value })} placeholder='Estado' />
                    </div>

                    <input value={formData.img} type="text" onChange={(event) => setFormData({ ...formData, img: event.target.value })} placeholder='Url da imagem do hotel' />
                    <input value={formData.classificacao} onChange={(event) => setFormData({ ...formData, classificacao: event.target.value })} type="text" placeholder='Categoria' />
                    <textarea value={formData.descricao} name="" onChange={(event) => setFormData({ ...formData, descricao: event.target.value })} id="" placeholder='Descrição do hotel'></textarea>


                    <div className={styles.row}>
                        <button onClick={criarHotel}>Salvar</button>
                        <button>Cancelar</button>
                    </div>

                </div>
            </Modal>
        </div>
    )
}
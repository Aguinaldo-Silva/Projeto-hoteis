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

    const [errors, setErrors] = useState({})
    const [hoteis, setHoteis] = useState([])
    const [hoteisFiltrados, setHoteisFiltrados] = useState([])
    const [termoBusca, setTermoBusca] = useState("")
    const [criterioOrdenacao, setCriterioOrdenacao] = useState("")

    function carregarHoteis() {
        const hoteisLocal = JSON.parse(localStorage.getItem("hoteis")) || []
        setHoteis(hoteisLocal)
        setHoteisFiltrados(hoteisLocal)
    }

    useEffect(() => {
        carregarHoteis()
    }, [])

    function validarFormulario() {
        const novosErros = {}

        if (!formData.nome) novosErros.nome = "O nome é obrigatório."
        if (!formData.img) novosErros.img = "A imagem é obrigatória."
        if (!formData.classificacao) novosErros.classificacao = "A classificação é obrigatória."
        if (!formData.cidade) novosErros.cidade = "A cidade é obrigatória."
        if (!formData.estado) novosErros.estado = "O estado é obrigatório."
        if (!formData.preco) {
            novosErros.preco = "O preço é obrigatório."
        } else if (parseFloat(formData.preco) < 0) {
            novosErros.preco = "O preço não pode ser negativo."
        }
        if (!formData.descricao) novosErros.descricao = "A descrição é obrigatória."

        setErrors(novosErros)

        return Object.keys(novosErros).length === 0
    }

    function aoBuscar(event) {
        const textoBusca = event.target.value.toLowerCase()
        setTermoBusca(textoBusca)

        const hoteisFiltrados = hoteis.filter(hotel =>
            hotel.nome.toLowerCase().includes(textoBusca)
        )

        aplicarOrdenacao(hoteisFiltrados, criterioOrdenacao);
    }

    function aoSelecionarOrdenacao(event) {
        const criterio = event.target.value;
        setCriterioOrdenacao(criterio);

        aplicarOrdenacao(hoteisFiltrados, criterio);
    }

    function aplicarOrdenacao(listaHoteis, criterio) {
        let listaOrdenada = [...listaHoteis];

        if (criterio === "preco") {
            listaOrdenada.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
        } else if (criterio === "classificacao") {
            listaOrdenada.sort((a, b) => parseFloat(b.classificacao) - parseFloat(a.classificacao));
        }

        setHoteisFiltrados(listaOrdenada);
    }

    async function criarHotel() {
        if (!validarFormulario()) return

        try {
            const hoteisExistentes = JSON.parse(localStorage.getItem('hoteis')) || []
            let ultimoId = JSON.parse(localStorage.getItem('ultimoId')) || 1

            const novoHotel = {
                id: ultimoId,
                nome: formData.nome,
                img: formData.img,
                classificacao: formData.classificacao,
                cidade: formData.cidade,
                estado: formData.estado,
                preco: formData.preco,
                descricao: formData.descricao
            }

            localStorage.setItem('ultimoId', JSON.stringify(ultimoId + 1))

            const novaListaHoteis = [...hoteisExistentes, novoHotel]
            await localStorage.setItem('hoteis', JSON.stringify(novaListaHoteis))

            carregarHoteis()
            alert("Hotel criado com sucesso")
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
            alert("Erro ao cadastrar")
        }
    }

    function cancelarCadastro() {
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
    }

    return (
        <div>
            <Header />

            <div className={styles.pesquisa}>
                <input
                    type="text"
                    value={termoBusca}
                    onChange={aoBuscar}
                    placeholder="Buscar hotel pelo nome..."
                    className={styles.campoPesquisa}
                />
            </div>

            <div className={styles.ordenacao}>
                <label htmlFor="ordenar">Ordenar por:</label>
                <select
                    id="ordenar"
                    value={criterioOrdenacao}
                    onChange={aoSelecionarOrdenacao}
                    className={styles.seletorOrdenacao}
                >
                    <option value="">Selecione</option>
                    <option value="preco">Preço</option>
                    <option value="classificacao">Classificação</option>
                </select>
            </div>

            <div className={styles.home}>
                {Array.isArray(hoteisFiltrados) && hoteisFiltrados.length > 0 ? (
                    hoteisFiltrados.map((hotel) => (
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
                    <h1>Cadastre seu hotel</h1>

                    <input
                        value={formData.nome}
                        onChange={(event) => setFormData({ ...formData, nome: event.target.value })}
                        type="text"
                        placeholder='Nome do Hotel'
                        className={errors.nome ? styles.erro : ""}
                    />
                    {errors.nome && <p className={styles.mensagemErro}>{errors.nome}</p>}

                    <div className={styles.row}>
                        <input
                            value={formData.preco}
                            onChange={(event) => {
                                const value = event.target.value;
                                if (!isNaN(value) && value >= 0) {
                                    setFormData({ ...formData, preco: event.target.value })
                                }
                            }
                            }
                            type="text"
                            placeholder='Valor da Diária'
                            className={errors.preco ? styles.erro : ""}
                        />
                        {errors.preco && <p className={styles.mensagemErro}>{errors.preco}</p>}

                        <input
                            value={formData.cidade}
                            onChange={(event) => setFormData({ ...formData, cidade: event.target.value })}
                            type="text"
                            placeholder='Cidade'
                            className={errors.cidade ? styles.erro : ""}
                        />
                        {errors.cidade && <p className={styles.mensagemErro}>{errors.cidade}</p>}

                        <input
                            value={formData.estado}
                            onChange={(event) => setFormData({ ...formData, estado: event.target.value })}
                            type="text"
                            placeholder='Estado'
                            className={errors.estado ? styles.erro : ""}
                        />
                        {errors.estado && <p className={styles.mensagemErro}>{errors.estado}</p>}
                    </div>

                    <input
                        value={formData.img}
                        onChange={(event) => setFormData({ ...formData, img: event.target.value })}
                        type="text"
                        placeholder='URL da imagem do hotel'
                        className={errors.img ? styles.erro : ""}
                    />
                    {errors.img && <p className={styles.mensagemErro}>{errors.img}</p>}

                    <input
                        value={formData.classificacao}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!isNaN(value) && value >= 0 && value <= 5) {
                                setFormData({ ...formData, classificacao: value })
                            }
                        }}
                        type="text"
                        placeholder='Categoria: de 1 a 5'

                        className={errors.classificacao ? styles.erro : ""}
                    />
                    {errors.classificacao && <p className={styles.mensagemErro}>{errors.classificacao}</p>}

                    <textarea
                        value={formData.descricao}
                        onChange={(event) => setFormData({ ...formData, descricao: event.target.value })}
                        placeholder='Descrição do hotel'
                        className={errors.descricao ? styles.erro : ""}
                    />
                    {errors.descricao && <p className={styles.mensagemErro}>{errors.descricao}</p>}

                    <div className={styles.row}>
                        <button onClick={criarHotel}>Salvar</button>
                        <button onClick={() => cancelarCadastro()}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

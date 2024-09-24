import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import styles from './formulario.module.css';

export default function HotelModal({ open, onClose, hotelData, onSave, onDelete }) {
    const [formData, setFormData] = useState({
        nome: hotelData?.nome || "",
        img: hotelData?.img || "",
        classificacao: hotelData?.classificacao || "",
        cidade: hotelData?.cidade || "",
        estado: hotelData?.estado || "",
        preco: hotelData?.preco || "",
        descricao: hotelData?.descricao || ""
    });

    const [errors, setErrors] = useState({})

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

    function handleSave() {
        if (!validarFormulario()) return;

        const updatedHotel = {
            ...hotelData,
            nome: formData.nome,
            img: formData.img,
            classificacao: formData.classificacao,
            cidade: formData.cidade,
            estado: formData.estado,
            preco: formData.preco,
            descricao: formData.descricao
        };

        onSave(updatedHotel);
    }

    function handleDelete() {
        onDelete(hotelData);
    }

    return (
        <Modal center closeOnEsc open={open} onClose={onClose}>
            <div className={styles.container_modal}>
                <h1>{hotelData ? 'Editar Hotel' : 'Cadastrar Hotel'}</h1>
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
                        type="text"
                        onChange={(event) => setFormData({ ...formData, estado: event.target.value })}
                        placeholder='Estado'
                        className={errors.estado ? styles.erro : ""}
                    />
                    {errors.estado && <p className={styles.mensagemErro}>{errors.estado}</p>}
                </div>

                <input
                    value={formData.img}
                    type="text"
                    onChange={(event) => setFormData({ ...formData, img: event.target.value })}
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
                    <button onClick={handleSave}>Salvar</button>
                    <button className={styles.cancelar} onClick={onClose}>Cancelar</button>
                    {onDelete && (
                        <div className={styles.delete_button}>
                            <button className={styles.delete_button} onClick={handleDelete}>
                                Excluir
                            </button>
                        </div>
                    )}
                </div>


            </div>
        </Modal>
    );
}

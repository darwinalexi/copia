import { useEffect, useRef, useState } from "react";
import axiosClient from "./utils/axiosClent";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Header from "./Component/Header";
import { Sidebar } from "./Component/Siderbar/siderbar";

const Usuarios = () => {
    const [user, setUser] = useState([]);
    const [borrar, setBorrar] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [update, setUpdate] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const borrarUsuario = async (id) => {
        try {
            const response = await axiosClient.delete(`/eliminar/${id}`);
            setBorrar(response.data.mensaje);
            console.log(response.data.mensaje);
            listarUser(); 
        } catch (error) {
            console.log(error);
        }
    };

    const listarUser = async () => {
        try {
            const response = await axiosClient.get("/listar");
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarUser();
    }, []);

    const openUpdateModal = (user) => {
        setUpdate({
            id: user.id,
            foto: user.foto,
            nombre: user.nombre,
            email: user.email,
            tipo: user.tipo
        });
        setOpenUpdate(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdate(prevState => ({ ...prevState, [name]: value }));
    };


    const clave= useRef(null)
    const handleUpdate = async (e) => {
        e.preventDefault(); 

        const formData = new FormData();
        formData.append("nombre", update.nombre);
        formData.append("correo", update.email);
        formData.append("tipo", update.tipo);
        formData.append("password", clave.current.value)
        if (selectedFile) {
            formData.append("foto", selectedFile);
        }
        try {
            const response = await axiosClient.put(`/actualizar/${update.id}`, formData )
            console.log(response.data.mensaje);
            setOpenUpdate(false); // Cierra el modal de actualización
            listarUser(); // Refresca la lista de usuarios
        } catch (error) {
            console.log("Error al actualizar:", error);
        }
    };

    const users= user.filter(user=>{
        const nombre= user.nombre ? user.nombre.toLowerCase() : '';
        return nombre.includes(searchTerm.toLowerCase())
      })
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        },
        {
            name: 'Foto',
            selector: row => row.foto,
            cell: row => (
                <img
                    src={`http://localhost:4001/img/${row.foto}`}
                    alt="Foto de usuario"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                />
            ),
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        {
            name: 'Correo',
            selector: row => row.email,
        },
        {
            name: 'Rol',
            selector: row => row.tipo
        },
        {
            name: "Acción",
            cell: row => (
                <div className="flex space-x-2">
                    <button onClick={() => borrarUsuario(row.id)}>
                        <FontAwesomeIcon icon={faTrash} color="red" className="size-5" />
                    </button>
                    <button onClick={() => openUpdateModal(row)}>
                        <FontAwesomeIcon icon={faEdit} color="#1999a6" className="size-5" />
                    </button>
                </div>
            )
        },
    ];

    return (
        <>
            <Header />
            <Sidebar />
            <div className="relative right-[40%] top-28">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="p-2 border-b border-b-[#1999a6] focus:outline-0"
                    />
                </div>
            <div className="pt-40">
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    paginationPerPage={4}
                    paginationRowsPerPageOptions={[1, 2, 3]}
                />
            </div>
            {openUpdate && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl mb-4">Actualizar Usuario</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={update.nombre || ''}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Correo</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={update.email || ''}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Clave</label>
                                <input
                                    type="password"
                                    name="password"
                                    required ref={clave}
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Tipo</label>
                                <select
                                    name="tipo"
                                    value={update.tipo || ''}
                                    onChange={handleInputChange}
                                    className="w-[50%] h-11 text-center rounded-lg"
                                >
                                    <option hidden>Seleccione...</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Usuario">Usuario</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Foto</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setOpenUpdate(false)}
                                    className="border-t-red-700 border-2 border-r-red-700 border-b-red-700 border-l border-l-red-700 text-black px-4 py-2 rounded mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#1999a1] text-white px-4 py-2 rounded"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Usuarios;

import { useState, useEffect, useRef } from "react";
import Header from "./Component/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from "./Component/Siderbar/siderbar";
import axiosClient from "./utils/axiosClent";
import Swal from "sweetalert2";
const Perfil = () => {
    const [usuario, setUsuario] = useState([]);
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setIdUser] = useState([]);
    const [fotos, setfoto]= useState([]);
    const [user, setUser] = useState({
        nombre: '',
        email: '',
        password: '',
        tipo: ''
    });
    const [createPet, setCreatePet] = useState(false);
    const [crear, setCrear] = useState(null);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const usuarios = JSON.parse(localStorage.getItem('usuario') || '[]');
        const tipo = usuarios ? usuarios.tipo : '';
        const nombre = usuarios ? usuarios.nombre:'';
        const email= usuarios ? usuarios.email:'';
        const photo= usuarios ? usuarios.foto:'';
        
        setName(nombre)
        setUsuario(tipo)
        setEmail(email)
        setfoto(photo)
        
    }, []);

    useEffect(() => {
        if (id) {
            listAdoptedPets();
        }
    }, [id]);

    const listAdoptedPets = async () => {
        try {
            const listar = await axiosClient.get(`/listas_pets_adop/${id}`);
            setPets(listar.data);
            console.log("adop", listar.data)
        } catch (error) {
            console.log(error);
        }
    };

   
    const nombre= useRef(null)
    const correo =useRef(null)
    const clave=useRef(null)
    const foto = useRef(null)
    const tipo = useRef(null)
    const direccion= useRef(null)
    const telefono= useRef(null)
    const documento= useRef(null)
    const tipo_de_doc= useRef(null)
    const registerUser = async (e) => {
        try {
            e.preventDefault();
            const datos = new FormData();
            datos.append('nombre', nombre.current.value);
            datos.append('email', correo.current.value);
            datos.append('password', clave.current.value);
            datos.append('foto', foto.current.files[0]);
            datos.append('tipo', tipo.current.value);
            datos.append('direccion', direccion.current.value);
            datos.append('telefono', telefono.current.value);
            datos.append('documento', documento.current.value);
            datos.append('tipo_de_documento', tipo_de_doc.current.value);
        console.log("datos",datos.data)
            const crear = await axiosClient.post("/crear", datos);
            setCrear(crear.data.mensaje);
            console.log(crear.data.mensaje)
            Swal.fire({
                icon: "success",
                title: "",
                text:crear.data.mensaje,
                showConfirmButton: true,
                timer: 1500
              })
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "",
                text:"no se creo el usuario",
                showConfirmButton: true,
                timer: 1500
              })
        }
    };


    return (
        <>
            <Header />
            <Sidebar />
           
            {usuario === "Administrador" && (
                <>
                    <div className="relative top-24 left-[17%] w-[13%] -z-50">
                        <h1 className="flex justify-start size-16 font-extrabold w-[100%]">Perfil de Usuario</h1>
                        <p className="flex justify-start pb-6">Nombre: {username}</p>
                        <p className="flex justify-start pb-6">Tipo: {usuario}</p>
                        <p className="flex justify-start pb-6">Correo: {email}</p>
                        <img src={`http://localhost:4001/img/${fotos}`} alt="" />
                    </div>

                    <div className="bg-slate-200 w-[45%] overflow-scroll h-[63%] absolute left-[50%] top-[14%] rounded-3xl -z-20 border-t border-t-[#1999a6] z-50  border-l border-l-[#1999a6] border-t border-r-[#1999a6]">
                        <h1>Crear Usuario</h1>
                        <form onSubmit={registerUser} >
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el nombre</label>
                                <br />
                                <FontAwesomeIcon icon={faUser} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                                <input type="text" required ref={nombre} placeholder="Ingrese el nombre" className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <br />
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el correo</label>
                                <br />
                                <FontAwesomeIcon icon={faEnvelope} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                                <input type="email" required ref={correo}  placeholder="Ingrese el correo" className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <br />
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese Clave</label>
                                <br />
                                <FontAwesomeIcon icon={faLock} color="#1999a6" className="relative top-9 left-[-42%] size-6" />
                                <input type="password" required ref={clave}  placeholder="Ingrese la contraseña" className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <div className="w-[50%] relative left-[24%]">
                                <label>Seleccione su foto de Perfil</label>
                                <br />
                               
                                <input type="file" required ref={foto} className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                            </div>
                            <br />
                            <label>Seleccione el rol</label>
                            <br />
                            <select required ref={tipo}  id=""className="w-[50%] h-11 text-center rounded-lg focus-within:invalid">
                                <option hidden>Seleccione...</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                            <br />
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el direccion</label>
                                <br />
                                <input type="text" required ref={direccion} className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                                <br />
                            </div>
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el Telefono</label>
                                <br />
                                <input type="number" required ref={telefono} className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                                <br />
                            </div>
                            <div className="w-[50%] relative left-[24%]">
                                <label>Ingrese el documento de Identidad </label>
                                <br />
                                <input type="text" required ref={documento} className="w-[100%] h-11 text-center rounded-lg focus-within:" />
                                <br />
                            </div>
                            <div className="w-[50%] relative left-[24%]">
                                <label>Seleccione el tipo de documento de Identidad </label>
                                <br />
                                <select required ref={tipo_de_doc} className="w-[100%] h-11 text-center rounded-lg focus-within:" >
                                    <option  hidden>Seleccione...</option>
                                    <option value="Cedula">Cedula</option>
                                    <option value="Cdula Extrnjera">Cedula Extranjera</option>
                                </select>
                                <br />
                            </div>
                            <input type="submit" value="Registrar" className="mt-7 w-[50%] h-11 text-center rounded-lg  border-t  border-t-[#1999a6] border-b border-b-[#1999a6]  border-r border-r-[#1999a6] border-l border-l-[#1999a6] hover:bg-[#1999a6] cursor-pointer" />
                        </form>
                    </div>
                </>
            )}

            {usuario === "Usuario" && (
                <>
                    <div className="relative top-24 left-[17%] w-[17%] -z-50">
                        <h1 className="flex justify-start size-16 font-extrabold w-[100%]">Perfil de Usuario</h1>
                        <p className="flex justify-start pb-6">Nombre: {username}</p>
                        <p className="flex justify-start pb-6">Tipo: {usuario}</p>
                        <p className="flex justify-start pb-6">Correo: {email}</p>
                        <img src={`http://localhost:4001/img/${fotos}`} alt="" />
                    </div>

                <div className="grid grid-cols-1 md:grid-cols-3  h-[32%]   w-[80%] absolute left-[10%] top-[65%]  mb-14 gap-5">
                    <h1 className="col-span-full  font-bold text-4xl   h-full">Adopciones Realizadas</h1>
                        {pets.map((pet) => (
                            <div key={pet.id} className="h-[54%] w-[53%] top-[35%] border-t-[#1999a6]  rounded-xl grid-rows-2 border-b border-b-[#1999a6] border-l border-l-[#1999a6] border-r border-r-[#1999a6] ">
                                <div className="w-full h-[70%]">
                                     <img src={`http://localhost:4001/img/${pet.foto}`} className="h-full w-full rounded-lg"/>
                                </div>
                                <div className="p-4  relative bottom-0">
                                    <h1 className="font-bold">Nombre Mascota: {pet.nombre_mas}</h1>
                                    <p className="text-sm">Descripcion: {pet.descripcion}</p>
                                    <p className="text-sm">Edad: {pet.edad} años</p>
                                </div>
                            </div>
                        ))}
                </div>


                </>
            )}
        </>
    );
};

export default Perfil;
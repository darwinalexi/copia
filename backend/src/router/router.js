import { Router } from "express";
import { actualizar_user, borrar, buscar_user, contarUsuarios, crear_user, listar_type_user, listar_user, saveimg } from "../controller/controller.user.js";
import { user } from "../middlewares/middleware.js";

 const ruta_user= Router();
ruta_user.get("/listar",listar_user)
ruta_user.get("/listar_user", listar_type_user)
ruta_user.post("/crear",saveimg,user,crear_user)
ruta_user.put("/actualizar/:id",saveimg,actualizar_user)
ruta_user.get("/buscar/:id",buscar_user)
ruta_user.get("/contar_usuarios", contarUsuarios)
ruta_user.delete("/eliminar/:id",borrar)

export default ruta_user
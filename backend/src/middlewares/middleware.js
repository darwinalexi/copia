import { check } from "express-validator";

export const user=[

    check("contrasena","ingresa una conntraseña valida") .isString() .isLength({min:7, max:16}),

] 
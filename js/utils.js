export const create = (etiqueta="", contenido=null, atributos={}) => Object.assign(document.createElement(etiqueta),{innerHTML:contenido,...atributos})
export const select = (elemento="") => document.querySelector(elemento)
export const selectAll = (elemento="") => document.querySelectorAll(elemento)
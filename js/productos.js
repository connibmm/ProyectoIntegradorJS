import { select, create, selectAll } from "./utils.js";
import { addCart } from "./cart.js"; 
import { cart } from "./shop.js";
const product = ({id, nombre, descripcion, precio, categoria, img}) => {
    const element = create("li", null, {"data-id":id,"data-category":categoria})
    const picture = create("picture")
    const image = create("img", null, {src:img, alt:`imagen del producto ${nombre}`})
    const data = create("dl", `
        <dt>Producto</dt>
        <dd>${nombre}</dd>
        <dt>Descripción</dt>
        <dd>${descripcion}</dd>
        <dt>Precio</dt>
        <dd>$${precio}</dd>`)
    const form = create("form")
    const btnAdd = create("button", "Agregar", {type:"button"})
    btnAdd.addEventListener('click',async () => {
        await addCart(id);
        return cart()
    })
    picture.append(image)
    form.append(btnAdd)
    element.append(picture, data, form)
    return element
}

const list = async() => {
    const data = await(await fetch("./js/productos.json")).json()
    const category = localStorage.getItem("category") || "todos"
    const $list = select("#productos ul")
    $list.innerHTML = null
    if (category == "todos") {
        return data.forEach(element => $list.append(product(element)));
    }
    return data.filter(({categoria}) => categoria == category).forEach(element => $list.append(product(element)));
}

list()

const $categories = selectAll("#productos form input")
$categories.forEach($category => $category.addEventListener("change", async(evento) => {
    evento.target.checked ? localStorage.setItem("category", evento.target.value) : null
    await list()
}))
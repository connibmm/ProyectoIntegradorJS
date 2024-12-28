import { select,create } from "./utils.js";
import { removeCart,updateQuantityPlus,updateQuantityMinus } from "./cart.js";

const $btnCart = select("#btn-cart")
const $btnCloseCart = select("#close-cart")
const $cart = select("#cart")
const $cartList = select("#list-cart")

const item = ({product,quantity}) => {
    const {id, nombre, descripcion, precio, categoria, img} = product
    const element = create("li")
    const picture = create("picture")
    const image = create("img", null, {src:img, alt:`imagen del producto ${nombre}`})
    const data = create("dl", `
        <dt>Producto</dt>
        <dd>${nombre}</dd>
        <dt>Descripción</dt>
        <dd>${descripcion}</dd>
        <dt>Precio</dt>
        <dd>$${precio}</dd>`)
    const formQuantity = create("form",null,{className:"form-quantity"})
    const btnResta = create("button", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`, {type:"button", "data-role":"resta"})
    const outputQuantity = create("output", quantity)
    const btnSuma = create("button", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`, {type:"button", "data-role":"suma"})
    const formRemove = create("form",null,{className:"form-remove"})
    const btnRemove = create("button", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`, {type:"button", "data-id":id})
    btnResta.addEventListener('click',() => {
        updateQuantityMinus(id);
        return cart()
    })
    btnSuma.addEventListener('click',() => {
        updateQuantityPlus(id);
        return cart()
    })
    btnRemove.addEventListener('click',() => {
        removeCart(id);
        return cart()
    })
    picture.append(image)
    formQuantity.append(btnResta, outputQuantity, btnSuma)
    formRemove.append(btnRemove)
    element.append(picture,data, formQuantity, formRemove)
    return element
}

export const cart = () => {
    const items = JSON.parse(localStorage.getItem('carrito')) || []
    $cartList.innerHTML = null
    items.forEach((element) => $cartList.append(item(element)))
} 

cart()


$btnCart.addEventListener('click',() => $cart.showModal())

$btnCloseCart.addEventListener('click', () => {
    $cart.classList.add('cerrar');
    $cart.addEventListener('animationend', () => {
        $cart.close();
        $cart.classList.remove('cerrar');
    }, { once: true });
});

$cart.addEventListener("click", ({ target: dialog }) => {
    if (dialog.nodeName === "DIALOG") {
        $cart.classList.add('cerrar');
        $cart.addEventListener('animationend', () => {
            $cart.close();
            $cart.classList.remove('cerrar');
        }, { once: true });
    }
});
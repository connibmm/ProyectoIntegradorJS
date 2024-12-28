export const addCart = async (id=1) => {
    const data = await (await fetch('./js/productos.json')).json()
    const cart = JSON.parse(localStorage.getItem('carrito')) || []
    const product = data.find((element) => element.id == id)
    const isInCart = cart.map(({product}) => product.id).includes(product.id)
    if(cart.length == 0 || !isInCart ){
        cart.push({product,quantity:1})
        return localStorage.setItem('carrito',JSON.stringify(cart))
    }

    const updateCart = cart.map((item) => {
        if(item.product.id == product.id){
            item.quantity += 1
            return item
        }
        return item
    })
    return localStorage.setItem('carrito',JSON.stringify(updateCart))
}

export const removeCart = (id=1) => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || []
    const isInCart = cart.map(({product}) => product.id).includes(id)
    if(isInCart){
        const updateCart = cart.filter(({product}) => product.id != id)
        return localStorage.setItem('carrito',JSON.stringify(updateCart))
    }
}

export const updateQuantityPlus = (id=1) => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || []
    const isInCart = cart.map(({product}) => product.id).includes(id)
    if(isInCart){
        const updateCart = cart.map((item) => {
            if(item.product.id == id){
                item.quantity += 1
                return item
            }
            return item
        })
        return localStorage.setItem('carrito',JSON.stringify(updateCart))
    }
}

export const updateQuantityMinus = (id=1) => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || []
    const isInCart = cart.map(({product}) => product.id).includes(id)
    if(isInCart){
        const updateCart = cart.map((item) => {
            if(item.product.id == id){
                item.quantity -= 1
                return item
            }
            return item 
        }).filter(({quantity}) => quantity != 0)
        return localStorage.setItem('carrito',JSON.stringify(updateCart))
    }
}

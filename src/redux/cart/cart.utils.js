const modifyCart = (cartItems, item, func, fallback) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === item.id ? {...cartItem, quantity: func(cartItem.quantity) } : cartItem).filter(i => i.quantity > 0);
    }
    return fallback;
};

export const addItemToCart = (cartItems, item) => {
    return modifyCart(cartItems, item, (quantity) => quantity + 1, [...cartItems, {...item, quantity: 1}])
};

export const removeItemFromCart = (cartItems, item) => {
    return modifyCart(cartItems, item, (quantity) => quantity - 1, cartItems)
};
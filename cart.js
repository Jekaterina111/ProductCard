const getData = async (url) => {
    const res = await fetch(url);
    return res.json();
};

//const quantityCalculator = (data) => {
    //const uniqueItems = [...new Set(data)];

    // return uniqueItems.map((item) => ({
    //    itemId: item,
    //    quantity: data.filter((v) => v === item).length,
   // });
// };

const mapProducts = (cart, products) => {
    return products
    .map((product) => ({
        ...product,
        quantity: cart.filter((item) => product.id === item).length,
    }))
    .filter((product) => product.quantity > 0);
};

const displayCart = (items) => {
    const table = document.querySelector("tbody");
    table.innerHTML = "";

    items.forEach((item) => {
     const tr = table.insertRow();

     const td1 = tr.insertCell();
     const deleteButton = document.createElement("button");
     deleteButton.textContent = "X";
     td1.append(deleteButton);

     const td2 = tr.insertCell();
     const productImage = document.createElement("img");
     productImage.src = item.image;
     td2.append(productImage);

     const td3 = tr.insertCell();
     td3.textContent = item.title;

     const td4 = tr.insertCell();
     td4.textContent = "$" + item.price;

     const td5 = tr.insertCell();
     td5.textContent = item.quantity;

     const td6 = tr.insertCell();
     td6.textContent = "$" + item.price * item.quantity;
    });
};

const getCart = async () => {
    try {
        const data = await Promise.all([
          getData("https://morning-gray-estimate.glitch.me/cart/2345879"),
          getData("https://morning-gray-estimate.glitch.me/products"), 
        ]);
        const cartItems = mapProducts(data[0], data[1]);
        displayCart(cartItems);
    } catch (err) {
        console.log(err);
    }
};

getCart();
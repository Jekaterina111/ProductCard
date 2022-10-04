const getData = async (url) => {
    try{
     const res = await fetch(url);
     const data = await res.json();
     return data;  
    }
    catch(err){
        console.log(err)
     }   
    }
    
    const addItems = (items) => {
    const main = document.querySelector("main");
       
    items.forEach(item => {
       const productBlock = document.createElement("div");
       productBlock.classList.add("product");
       productBlock.innerHTML = `
          <img src="${item.image}" alt="" />
          <h3 class="title">${item.title}</h3>
          <div class="rattings">${"&#127775;".repeat(item.rating)}</div>
          <div class="price">$${item.price.toFixed(2)}</div>
       `
       const buyButton = document.createElement("button");
       buyButton.textContent = "Add to cart";
       productBlock.append(buyButton);
       buyButton.addEventListener("click", async () => {
          const res = await fetch("https://morning-gray-estimate.glitch.me/cart", {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify({
                randomId: 2345879,
                productId: item.id
             })
          })
          const data = await res.json();
       
          console.log(data);
       });
       
        main.append(productBlock);
       })
       }
    
    const displayItems = async () => {
      const products = await getData("https://morning-gray-estimate.glitch.me/products");
      const ratings = await getData("https://morning-gray-estimate.glitch.me/ratings");
    
    const items = products.map(product => {
       const custRatings = ratings.filter(rating => rating.productId === product.id);
       const total = custRatings.reduce((c, v) => c + v.rating, 0);
       return ({
        ...product,
        rating: Math.round(total / custRatings.length)
       })
    })
    
    addItems(items)
    }
    
    displayItems();
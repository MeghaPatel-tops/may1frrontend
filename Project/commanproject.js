  function createCard(data){
        let str="";
        data.map((item)=>{
            let productname = item.title.substring(0,20);
            str+=`  <div class="col-sm-4">
      <div class="panel panel-primary">
        <div class="panel-heading">${productname}</div>
        <div class="panel-body"><img src="${item.image}" class="img-responsive" style="width:100%;height:200px" alt="Image"></div>
        <div class="panel-footer">Price:${item.price} <button class='me-0 btn btn-primary'>Add To Cart</button></div>
      </div>
    </div>`;

           
        })
        document.getElementById("pdata").innerHTML = str;
    }

    async function getProduct(){
         try {
                const product =  await fetch('https://fakestoreapi.com/products');
                const productData = await product.json();
                setTimeout(()=> createCard(productData) ,2000);
         } catch (error) {
            console.log("No Data Found");
         }
     }

     getProduct();
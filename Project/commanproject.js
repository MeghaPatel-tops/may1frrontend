  function createCard(data){
        let str="";
        data.map((item)=>{
            let productname = item.title.substring(0,20);
            str+=`  <div class="col-sm-4">
      <div class="panel panel-primary">
        <div class="panel-heading">${productname}</div>
        <div class="panel-body"><img src="${item.image}" class="img-responsive" style="width:100%;height:200px" alt="Image"></div>
        <div class="panel-footer">Price:${item.price} <button class='me-0 btn btn-primary' onclick="addtocart(${item.id})">Add To Cart</button></div>
      </div>
    </div>`;

           
        })
        document.getElementById("pdata").innerHTML = str;
    }

    function addtocart(pid){
         alert(pid);
          let user = localStorage.getItem('sessionUser');
          user = JSON.parse(user);
          

          if(localStorage.getItem("cart-"+user.email)){
               let cartArray = JSON.parse(localStorage.getItem("cart-" + user.email)) || [];;
               alert(cartArray);
               cartArray.push(pid);
               localStorage.setItem("cart-"+user.email,JSON.stringify(cartArray));
          }
          else{
            let cartItem = [];
            cartItem.push(pid);
            alert(cartItem);
            localStorage.setItem("cart-"+user.email,JSON.stringify(cartItem));
          }
          window.location="index.html";

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


     function addUser(){
        try {
          const email=document.getElementById('email').value;
          const user = {
             uname:document.getElementById('uname').value,
             email:email,
             password:document.getElementById('pwd').value,
             contact:document.getElementById('cnno').value

          }
          localStorage.setItem('user-'+email, JSON.stringify(user));
          console.log(user);
          window.location="login.html";
          
        } catch (error) {
          console.log(error);
          
        }
     }


     function login(){
        const email=document.getElementById('email').value;
         const password=document.getElementById('pwd').value;
        if(localStorage.getItem('user-'+email)){
            user = localStorage.getItem('user-'+email);
            user= JSON.parse(user);
            if(password == user.password){
               alert("Login successfully");
               localStorage.setItem('sessionUser',JSON.stringify(user));
               window.location="index.html";
            }
                 
        } 
        else{
           alert("Login Fail");
           document.getElementById('email').value ="";
          document.getElementById('pwd').value="";
        }
     }

    function loading(){
       if(localStorage.getItem('sessionUser')){
     
          let user = localStorage.getItem('sessionUser');
          user = JSON.parse(user);
          if(localStorage.getItem("cart-"+user.email)){
               let cartArray = JSON.parse(localStorage.getItem("cart-" + user.email)) || [];;
                let count=cartArray.length;
          
          let str= `
           <li><a href="cart.html"><span class="glyphicon glyphicon-shopping-cart"></span><super>${count}</super></a></li>
          <li><a href=""><span class="glyphicon glyphicon glyphicon-user">
          </span> ${user.uname}</a></li>
          <li><button onclick='logout()'><span class="glyphicon 	glyphicon glyphicon-off"></button></li>
         
          `;
          
          document.getElementById('loginItem').innerHTML=str;
          }
      }
      else{
           let str= `<li><a href="login.html">Login
          </span></a></li>
         
          `;
          
          document.getElementById('loginItem').innerHTML=str
      }
    }

    function logout(){
         localStorage.removeItem('sessionUser');
          window.location="index.html";
    }

   async function getCartData(){
         let user = localStorage.getItem('sessionUser');
          user = JSON.parse(user);
           if(localStorage.getItem("cart-"+user.email)){
               let cartArray = JSON.parse(localStorage.getItem("cart-" + user.email)) || [];
               
                try {
                const product =  await fetch('https://fakestoreapi.com/products');
                const productData = await product.json();
                 //const cartProductIds = cartArray.map(item => item.id);
               //   alert(cartProductIds);

                  const newProductArray = productData.filter(product =>
                     cartArray.includes(product.id)
                  );
                console.log(newProductArray);
                cartCreate(newProductArray);
               } catch (error) {
                  console.log(error);
               }
              
          }
          
    }

    function cartCreate(cartData){
         let str="";
         cartData.map((item)=>{
            str+= `<tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td><img src="${item.image}" alt="" height="50px" width="50px"></td>
        
      </tr>`;
      document.getElementById("cartData").innerHTML=str;
         })
    }

   

    
     
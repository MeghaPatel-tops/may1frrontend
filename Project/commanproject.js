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
          let str= `<li><a href=""><span class="glyphicon glyphicon glyphicon-user">
          </span> ${user.uname}</a></li>
          <li><button onclick='logout()'><span class="glyphicon 	glyphicon glyphicon-off"></button></li>
          `;
          
          document.getElementById('loginItem').innerHTML=str;
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

    window.onload = loading();
     
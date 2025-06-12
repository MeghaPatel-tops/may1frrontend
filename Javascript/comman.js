 export function createCard(data){
        let str="";
        data.map((item)=>{
            str+=`  <div class="card">
                <div class="card-image">
                    <img src="${item.image}" alt="">
                </div>
                <div class="card-title">
                    <h4>${item.title}</h4>
                    <h6>${item.price}</h6>
                </div>
            </div>`;

           
        })
        document.getElementById("container").innerHTML = str;
    }

  
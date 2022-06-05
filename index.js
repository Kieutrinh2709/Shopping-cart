var productList =[];
var addProduct = function(){
    // 1.DOM lấy râ value từ input 
   var id= document.getElementById("id").value;
   var name= document.getElementById("name").value;
   var price= document.getElementById("price").value;
   var screen= document.getElementById("screen").value;
   var backCamera= document.getElementById("backCamera").value;
   var frontCamera= document.getElementById("frontCamera").value;
   var img= document.getElementById("img").value;
   var desc= document.getElementById("desc").value;
   var type= document.getElementById("type").value;
   var quantity= +document.getElementById("quantity").value;


   
 var newProduct = new Product(name, id , price, screen, backCamera, frontCamera, img, desc, type, quantity);

  
    axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method: "POST",
        data: newProduct,
    }).then(function(res){
        getData();
    }).catch(function(err){
        console.log(err);
    });
    
};
var deleteProduct = function(id){
    axios({
        url: " https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
        method: "DELETE",
    }).then(function(res){
        console.log(res);
        getData();
    }).catch(function(err){
        console.log(err);
    });
};
var getProduct = function (id) {
    axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
      method: "GET",
    })
      .then(function (res) {
        var foundProduct = res.data;
  
        document.getElementById("id").value = foundProduct.id;
        document.getElementById("name").value = foundProduct.name;
        document.getElementById("price").value = foundProduct.price;
        document.getElementById("screen").value = foundProduct.screen;
        document.getElementById("backCamera").value =foundProduct.backCamera;
        document.getElementById("frontCamera").value = foundProduct.frontCamera;
        document.getElementById("img").value = foundProduct.img;
        document.getElementById("desc").value = foundProduct.desc;
        document.getElementById("type").value=foundProduct.type;
        document.getElementById("quantity").value=foundProduct.quantity;
  
        document.getElementById("btnAdd").style.display = "none";
        document.getElementById("btnUpdate").style.display = "inline-block";
  
        document.getElementById("id").disabled = true;
      })
      .catch(function (err) {
        console.log(err);
      });
};
  
  // update 2: lưu thay đổi
  
var updateProduct = function () {
   var id= document.getElementById("id").value;
   var name= document.getElementById("name").value;
   var price= document.getElementById("price").value;
   var screen= document.getElementById("screen").value;
   var backCamera= document.getElementById("backCamera").value;
   var frontCamera= document.getElementById("frontCamera").value;
   var img= document.getElementById("img").value;
   var desc= document.getElementById("desc").value;
   var type= document.getElementById("type").value;
   var quantity= +document.getElementById("quantity").value;
  
   var updateProduct= new Product(name, id , price, screen, backCamera, frontCamera, img, desc, type, quantity);

  
    axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
      method: "PUT",
      data: updateProduct,
    })
      .then(function (res) {
        getData();
        document.getElementById("btnReset").click();
        document.getElementById("btnAdd").style.display = "block";
        document.getElementById("btnUpdate").style.display = "none";
        document.getElementById("id").disabled = false;
      })
      .catch(function (err) {
        console.log(err);
      });
};

var renderProduct = function(data){
   data = data || productList;
    var dataHTML ="";
    for(var i =0; i< data.length; i++){        
        dataHTML +=`<tr>
                <td>${i+1}</td>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].price}</td>
                <td>${data[i].screen}</th>
                <td>${data[i].backCamera}</td>
                <td>${data[i].frontCamera}</th>
                <td>${data[i].img}</th>
                <td>${data[i].desc}</th>
                <td>${data[i].type}</th>
                <td>${data[i].quantity}</th>
                <td>
                    <button class ="btn btn-danger" onClick="deleteProduct('${data[i].id}')">Xóa</button>
                    <button class ="btn btn-info" onClick="getProduct('${data[i].id}')" >Cập nhật</button>
                </td>
        </tr>`;
    }
    document.getElementById("tbodySanPham").innerHTML=dataHTML;
};
var findById = function(id){
    for(var i=0; i<productList.length; i++){
        if(productList[i].id===id){
            return i;
        }
    }
    return -1;
};
var saveData = function(){
    var productListJSON = JSON.stringify(productList);
    localStorage.setItem("list",  productListJSON);
};
var getData = function(){
    const promise = axios({
        url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method: "GET",
    });

    promise.then(function(res){
        productList=mapData(res.data);
        renderProduct();
    }).catch(function(err){
        console.log(err);
    });
};
getData();
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
      var currentProduct = dataFromLocal[i];
      var mappedProduct = new Product(
        currentProduct.name,
        currentProduct.id,
        currentProduct.price,
        currentProduct.screen,
        currentProduct.backCamera,
        currentProduct.frontCamera,
        currentProduct.img,
        currentProduct.desc,
        currentProduct.type,
        currentProduct.quantity
        
      );
  
      data.push(mappedProduct);
    }
  
    return data;
};
var productnameinput = document.getElementById('productnameinput');
var productpriceinput = document.getElementById('productpriceinput');
var tablebody = document.getElementById('tablebody');

var productscontainer;
if (localStorage.getItem('myproduct') !=null){
    productscontainer = JSON.parse(localStorage.getItem('myproduct'));
    displayproduct(productscontainer)
}else{
    productscontainer = []
}

function addproduct() {
    if(validateproduct(productpriceinput.value)){
        var product = {
            productname: productnameinput.value,
            productprice: productpriceinput.value,
        }
        productscontainer.push(product);
        console.log(productscontainer);
        localStorage.setItem('myproduct' , JSON.stringify(productscontainer))
        clearform();
        displayproduct(productscontainer);
    }else{
        alert('website URL invalid')
    }
}

function clearform() {
    productnameinput.value = '';
    productpriceinput.value = '';
}

function displayproduct(productscontainer) {
    var cartoona = ``;

    for(var i=0; i < productscontainer.length; i++) {
        var productindex = i +1;

        cartoona +=`
        <tr>
        <td>${i + 1}</td>
        <td>${productscontainer[i].productname}</td>
        <td>${productscontainer[i].productprice}</td>
        <td><button class="btn btn-outline-info btn-sm"><a href="onclick="setformforupdate(${i})"" target="_blank" >visit</a></button></td>
        <td><button onclick="deleteproduct(${i})" target="_blank" class="btn btn-outline-danger btn-sm">delete</button></td>
        </tr>`
    }
    tablebody.innerHTML = cartoona
}

function searchproduct(searchterm){
    var searchresult = [];
    for (let i = 0; i < productscontainer.length ; i++){
        if (productscontainer[i].productname.tolowercase().includes(searchterm.tolowercase())){
            searchresult.push(productscontainer[i])
        }
    }
    console.log(searchresult);
    displayproduct(searchresult)
}

function deleteproduct(deleteindex){
    productscontainer.splice(deleteindex,1)
    localStorage.setItem('myproduct' , JSON.stringify(productscontainer));
    displayproduct(productscontainer)
}


function validateproduct(name){
    var regex = /^w{3}.{1}[a-z]\S{0,20}.com{1}/
    if (regex.test(name)){
        productpriceinput.classList.replace('is-invalid','is-valid')
        return true
    }else{
        productpriceinput.classList.add('is-invalid')
        return false
    }
}


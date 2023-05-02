var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descriptionInput = document.getElementById("productDescription");
var tbody = document.getElementById("tbody");
var searchInput = document.getElementById("searchInput");
var button = document.getElementById("update");

// Retrieve products from localStorage or initialize an empty array
var products = localStorage.getItem("ProductsStorage") ? JSON.parse(localStorage.getItem("ProductsStorage")) : [];

// Function to add a new product to the products array and update localStorage
function addProduct() {
  if(nameInput.value==""||categoryInput.value==""||priceInput.value==""||descriptionInput.value==""){
    error.innerHTML="please fill all fields";
    nameInput.onclick=function(){
      error.innerHTML="";
    }
    categoryInput.onclick=function(){
      error.innerHTML="";
    }
    priceInput.onclick=function(){
      error.innerHTML="";
    }
    descriptionInput.onclick=function(){
      error.innerHTML="";
    }
  }
    else {
  var product = {
    pname: nameInput.value,
    pcat: categoryInput.value,
    pprice: Number(priceInput.value),
    pdesc: descriptionInput.value
  }
  products.push(product);
  localStorage.setItem("ProductsStorage", JSON.stringify(products));
  displayProducts();
  clearInputs();
}
}

// Function to clear the product input fields
function clearInputs() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
}

// Function to display all products in the products array
function displayProducts() {
  var str = "";
  for (var i = 0; i < products.length; i++) {
    str += `
      <tr data-id="${i}">
        <td>${i}</td>
        <td>${products[i].pname}</td>
        <td>${products[i].pcat}</td>
        <td>${products[i].pprice}</td>
        <td>${products[i].pdesc}</td>
        <td>
          <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
  tbody.innerHTML = str;
}

// Function to update a product in the products array and update localStorage
function updateProduct(k) {
  
  nameInput.value = products[k].pname;
  categoryInput.value = products[k].pcat;
  priceInput.value = products[k].pprice;
  descriptionInput.value = products[k].pdesc;
  button.innerHTML = "Update Product";
  button.classList.add("btn-secondary", "text-white");
  button.onclick = function() {
    products[k].pname = nameInput.value;
    products[k].pcat = categoryInput.value;
    products[k].pprice = priceInput.value;
    products[k].pdesc = descriptionInput.value;
    localStorage.setItem("ProductsStorage", JSON.stringify(products));
    displayProducts();
    clearInputs();
    button.innerHTML = "Add Product";
    button.classList.remove("btn-secondary", "text-white");
    button.onclick = function() {
      addProduct();
    };
  };
}

// Function to delete a product from the products array and update localStorage
function deleteProduct(k) {
  products.splice(k, 1);
  localStorage.setItem("ProductsStorage", JSON.stringify(products));
  displayProducts();
}

// Display all products when the page is loaded
displayProducts();

// Add event listener to the Add Product button
button.innerHTML = "Add Product";
button.onclick = function() {
  addProduct();
};

// Add event listener to the search input field
  searchInput.addEventListener("keyup", filterProducts);

 
  
    function filterProducts() {
      var str = "";
      var searchTerm = searchInput.value.toLowerCase();
    
      for (var i = 0; i < products.length; i++) {
        if (products[i].pname.toLowerCase().includes(searchTerm)) {
          var productName = products[i].pname.replace(new RegExp(searchInput.value, 'gi'), '<span class="highlight">$&</span>');
    
          str += `<tr>
            <td>${i}</td>
            <td>${productName}</td>
            <td>${products[i].pcat}</td>
            <td>${products[i].pprice}</td>
            <td>${products[i].pdesc}</td>
            <td>
              <button style="color=green;" class="btn btn-success" onclick="update(${i})">
                Update
              </button>
            </td>
            <td>
              <button class="btn btn-danger" onclick="deleteProduct(${i})">
                Delete
              </button>
            </td>
          </tr>`;
        }
      }
    
      tbody.innerHTML = str;
    
    }
  
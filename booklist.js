


const BookCtrl = (function() {
  const Book = function(id, title, author, originalPublicationYear, imageUrl){
  this.id = id, 
  this.title = title,
  this.author = author,
  this.originalPublicationYear = originalPublicationYear,
  this.imageUrl = imageUrl
  }

  const data = {
    books: []
  }
    

  return {
    addBook: function(id, title, author, originalPublicationYear, imageUrl){
      const newBook = new Book(id, title, author, originalPublicationYear, imageUrl);
      data.books.push(newBook);
      localStorage.setItem('books', JSON.stringify(data.books));
      console.log(JSON.parse(localStorage.getItem('books')));
      return newBook;
    }
  }

})();

// BookCtrl();
// 
// function getAuthorAndBooks(){
// fetch("http://cors-anywhere.herokuapp.com/https://www.goodreads.com/author/list/847789?format=xml&key=lZwKFuESgBf5KQfVqqymeA")
//   .then((res) => res.text())
//   .then((data) => {
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(data, "text/xml");
//     console.log(xmlDoc);
//     
//     let output = '<h2>Favorite Authors</h2>';
//     output += `<h4 class="author">${xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue}</h4>`;
//     for(let i = 0; i < 10; i++){
// 
//       output += `<li>${xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue}</li>`;
// 
//     }
//     
//     // document.querySelector('.book').innerHTML = output;
// 
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// }
// 
// getAuthorAndBooks();

// https://www.goodreads.com/book/title?id=reason+for+god


function getBookByTitle(searchQuery){  
fetch(`https://www.goodreads.com/search/index.xml?key=lZwKFuESgBf5KQfVqqymeA&q=${searchQuery}`)
  .then((res) => res.text())
  .then((data) => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, "text/xml");
    console.log(xmlDoc);
  
    // get book title
      const title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    // get author
    const author = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    // get good reads ID number
    const id = xmlDoc.getElementsByTagName("best_book")[0].getElementsByTagName("id")[0].childNodes[0].nodeValue;//.childNodes[0].nodeValue);
    // get img url
    const imageUrl = xmlDoc.getElementsByTagName("image_url")[0].childNodes[0].nodeValue;
   // get books original publication year 
    const originalPublicationYear = xmlDoc.getElementsByTagName("original_publication_year")[0].childNodes[0].nodeValue;

  

    const output = `<h4>${title}</h4><p>by ${author}</p>`;
    const bookDiv = document.querySelector('.book');
    const img = document.createElement("IMG");
    img.src = `${imageUrl}`;
    bookDiv.innerHTML = output;
    // set the elemetns 
    let pImgContainer = document.createElement("P");
    pImgContainer.appendChild(img);
    bookDiv.appendChild(pImgContainer); 
    const imgError = document.createElement("P");

    // check for an image and display "no public cover image error" if no image
    if(imageUrl.search(/nophoto/) !== -1){
      imgError.innerHTML = "(Sorry, there is currently no public image for this book.)";
      bookDiv.appendChild(imgError);
      console.log('no image');
    }else if(imgError) {
      console.log(bookDiv); //.querySelector('imgError').remove();
    }

    let btn = document.createElement("BUTTON");
    let t = document.createTextNode("Add to book list?");
    btn.className = "add-btn";
    btn.appendChild(t);
    bookDiv.appendChild(btn);

    // on button click add to book database and remove book and button for next 
    btn.addEventListener('click', (e) => {
      e.preventDefault();    
      const book = BookCtrl.addBook(id, title, author, originalPublicationYear, imageUrl); 
      btn.remove();
      bookDiv.innerHTML = '';
    })
   // console.log(book); 
  })

  .catch((error) => {
    console.log(error);
  })
}

let searchBox = document.querySelector('#search-box');

const searchBtn = document.getElementById('search-btn').addEventListener('click', function(e){
  e.preventDefault();
  // console.log(searchBox.value);
  if(searchBox.value !== ''){
  getBookByTitle(searchBox.value);
  }
});


function testButton(e){

  e.preventDefault();
  console.log('clicked');
}

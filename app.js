console.log("this is my first js file.");

// After reloading page All details show thats why we write it here.
 
showNotes();

//if a user add a note, add to the local storage.

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle=document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// To show all the notes which are added.

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="card mx-2 my-2 noteCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${index + 1}. ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");
  if(notesObj.length != 0){
      notesElm.innerHTML = html;
  }
  else{
    notesElm.innerHTML=`Nothing to show! Use "Add a note" to add a note in this section. `
  }
}

// Delete a note.

function deleteNote(index){

   let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Search the notes by providing some hints in search bar.

let search=document.getElementById("searchTxt");
search.addEventListener("input", function(e){

    let inputVal=search.value;
    let noteCard=document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function(element){

        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
             element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

})

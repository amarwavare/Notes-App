console.log('This is Notes app');
showNotes();

// Adding Note too Local Storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    console.log(notesobj);
    
    showNotes();
})

// Writing Function to showNotes
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function(element, index) {
        html+=`
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
                </div>
              </div>`;
        });
        
        let noteselm = document.getElementById('notes');
        if (notesobj.length != 0) {
            noteselm.innerHTML = html;
        }
        else{
            noteselm.innerHTML = `Nothing to show. Please add a Note !!`;
        }
}

// Function to deleteNotes
function deleteNotes(index){
    console.log('Im Deleting : ', index);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj = [];
    }
    else{
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value;

    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
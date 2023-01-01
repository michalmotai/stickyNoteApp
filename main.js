const EVENT_LC_KEY = 'events'

onPageLoad(); //present saved notes


//add a new event to board
function addEvent(){

    //1.validation
    const isValid = validate();
    if(!isValid){
        return;
    }
    event.preventDefault();

    //2.get current event details
    const myEvent = getEvent();

    //3.get stored events from local storage
    const allEvents = loadFromLocalStorage();

    //4. push new events to all events
    allEvents.push(myEvent);

    //5. save to local storage
    saveToLocalStorage(allEvents);

    //6.display evnets on board
    displayEvents(allEvents);

    //7.clear the event form
    clearEventInputs();
}

//present saved notes
function onPageLoad(){
    const allEvents = loadFromLocalStorage();
    displayEvents(allEvents);
}
//1.validation
function validate(){
    const descriptionInput = document.getElementById("descriptionInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");

    if (descriptionInput.value===""){
        alert('Please insert description');
        descriptionInput.style.backgroundColor = "pink"
        descriptionInput.focus();
        return false
    }

    if (dateInput.value===""){
        alert('Please insert a date');
        dateInput.style.backgroundColor = "pink"
        dateInput.focus();
        descriptionInput.style.backgroundColor = "";
        return false
    }

    if (timeInput.value===""){
        alert('Please insert a time');
        timeInput.style.backgroundColor = "pink"
        dateInput.style.backgroundColor = ""
        timeInput.focus();
        return false
    }
    
    return true
}

//2.get current event details
function getEvent(){
    const descriptionInput = document.getElementById("descriptionInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");

    const description = descriptionInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    
    console.log (description, date, time);

    return {
        description,
        date,
        time,
        color: getRandomColor(),
        rotation: getRotation()
    } 
}

//3.get stored events from local storage
function loadFromLocalStorage(){
    const str = localStorage.getItem (EVENT_LC_KEY);
    const allEvents = (str===null)? []: (JSON.parse(str));
    console.log (allEvents);
    
    return allEvents;
}

//5. save to local storage
function saveToLocalStorage(allEvents){
    const str = JSON.stringify(allEvents);
    localStorage.setItem(EVENT_LC_KEY, str);
}

//6.display evnets on board
function displayEvents(allEvents){
    const stickiesDiv = document.getElementById("stickiesDiv");

    stickiesDiv.innerHTML='';
    if (allEvents){
    
        for (let i = 0; i<allEvents.length; i++){
                
        
            const note = `<div class ='note' class = "fadeIN" style = "background-color: ${allEvents[i].color}; rotate: ${allEvents[i].rotation}">
                <button id = "${i}" class = "deleteNoteBtn" onclick ="deleteEvent(this)" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </button>
                <textarea class = "textAreaSticky" >${allEvents[i].description}</textarea>
                <br>
                    <div class = dateAndTime>
                        Date: ${allEvents[i].date}
                        <br>
                        Time: ${allEvents[i].time} 
                       
                    </div> 
                 </div>   
            `
            stickiesDiv.innerHTML += note             
        } 
    }else return   
}


//7.clear the event form
function clearEventInputs(){
    const descriptionInput = document.getElementById("descriptionInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");

    descriptionInput.value = '';
    dateInput.value= '';
    timeInput.value= '';

    descriptionInput.style.backgroundColor = "";
    dateInput.style.backgroundColor = "";
    timeInput.style.backgroundColor = "";
}

// delete all events from board
function deleteAllEvents(){
    localStorage.removeItem(EVENT_LC_KEY);
    displayEvents();
}

//delete selected event from board
function deleteEvent(button){
    const index = button.id 
    const allEvents = loadFromLocalStorage();
    allEvents.splice(index,1);
    displayEvents(allEvents);
    saveToLocalStorage(allEvents);
    
}

// get random color from selected values
function getRandomColor(){
    const pink = "rgb(255, 212, 231)"
    const yellow = "rgb(255, 245, 154)"
    const green = "rgb(183, 243, 146)"
    const blue = "rgb(179, 235, 253)"

    colors = [pink, yellow, green, blue]
    const randomColor = colors[Math.floor (Math.random()*4)];
    console.log  ("color is: ", randomColor);
    return randomColor
}

//get random rotation of enent note
function getRotation(){
    const num = Math.floor(Math.random()*10-5)
    const rotation = num+"deg"
    console.log(rotation);
    return rotation
}





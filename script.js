let currentDate = new Date();
let selectedDate = new Date();

//달력 초기화 함수
function initCalendar(){
    updateCalendar();
    document.getElementById('prev-month').addEventListener('click', ()=> changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', ()=> changeMonth(1));
    document.getElementById('prev-year').addEventListener('click', ()=> changeYear(-1));
    document.getElementById('next-year').addEventListener('click', ()=> changeYear(1));
    document.getElementById('current-month-year').addEventListener('click', ()=> goToday);
}

function goToday(){
    currentDate = new Date();
    selectedDate = new Date();
    loadUpdate();
}

function updateCalendar(){
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById('current-month-year').textContent = `${year}년 ${month+1}월`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendarBody = document.querySelector('#calendar-body tbody');
    calendarBody.textContent='';

    const today = new Date();
    let date = 1;

    for(let i=0; i < 6; i++){
        const row = document.createElement('tr');
        for(let j=0; j < 7; j++)
        {
            if(i===0&& j < firstDay.getDay()){
                row.appendChild(document.createElement('td'));
            } else if (date > lastDay.getDate()) {
                row.appendChild(document.createElement('td'));
            } else{
                const cell = document.createElement('td');
                const cellDate = new Date(year, month, date);

                const dateText = document.createElement('span');
                dateText.textContent = date;
                cell.appendChild(dateText);

                cell.addEventListener('click', ()=> {
                    if(cellDate.getFullYear()=== 514 && cellDate.getMonth() === 4 && cellDate.getDate() === 14){
                        window.open('','_blank');
                    } else{
                        selectDate(cellDate);
                    }
                });

                if(isSameDate(cellDate, today)) {
                    cell.classList.add('today');
                }

                if (isSameDate(cellDate, selectedDate)) {
                    cell.classList.add('selected');
                }

                row.appendChild(cell);
                date++;

            }
        }
        calendarBody.appendChild(row);
        if(date > lastDay.getDate()) break;
    }
}

function getDateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function isSameDate(date1, date2){
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    updateCalendar();
}

function changeYear(delta) { 
    currentDate.setFullYear(currentDate.getFullYear()+ delta);
    updateCalendar();
}

function selectDate(date) {
    selectedDate = date;
    loadUpdate();
}






function loadUpdate(){
    updateCalendar();
}

window.addEventListener('load', ()=>{
    initCalendar();
})
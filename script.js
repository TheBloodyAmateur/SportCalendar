/*
*   Database:
*
*   Based on the examples the database will have a single table with the
*   following columns:
*
*   weekday / date_time / sport_type / teams / location
* */
class Database{
    constructor(){
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database("calendar.db");
    }

    addNewEvent(weekday, date, sport_type, teams, location){
        this.db.run(`INSERT INTO events VALUES('${weekday}','${date}','${sport_type}','${teams}','${location}')`);
    }

    sortEvents(column){
        if(column == "weekday")
            this.sortEventbyWeekDay();
        else
            this.db.each(`SELECT * FROM events ORDER BY ${column}`, (error, row) =>{
                if(error)
                    console.log(error.message);
                else
                    console.log(`${row.weekday} - ${row.date_time} - ${row.sport_type} - ${row.teams} - ${row.location}`);
            });
    }

    sortEventbyWeekDay(){
        const weekDays = ["Monday", "Tuesday", "Wednsday","Thursday","Friday","Saturday","Sunday"];
        const data = [];
        
        //Bubblesort algorithm
        for(let i = 0; i < weekDays.length; i++){
                this.db.each(`SELECT * FROM events ORDER BY weekday`,
                (error, row)=>{
                    if(error)
                        console.log(error.message);
                    else
                        if(`${row.weekday}` == weekDays[i])
                            console.log(`${row.weekday} - ${row.date_time} - ${row.sport_type} - ${row.teams} - ${row.location}`);
                });
        }
    }
}

let database = new Database();
database.sortEvents("weekday");

function addEventToTable(){

    const cell = [];
    const column = [];

    column[0] = document.getElementById("weekday").value;
    column[1] = document.getElementById("date").value;
    column[2] = document.getElementById("sport").value;
    column[3] = document.getElementById("Teams").value;
    column[4] = document.getElementById("Location").value;

    var table = document.getElementsByTagName('table')[0];

    var newRow = table.insertRow(table.rows.length);

    // add cells to the row
    for(let i = 0; i < 4; i++){
        cell[i] = newRow.insertCell(i);
    }

    // add values to the cells
    for(let i = 0; i < 4; i++)
    {
        cell[i].innerHTML  = column(i);
    }

    /*var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);

    // add values to the cells
    cel1.innerHTML = weekday;
    cel2.innerHTML = date;
    cel3.innerHTML = sport;
    cel4.innerHTML = Teams;
    cel5.innerHTML = Location;*/
}
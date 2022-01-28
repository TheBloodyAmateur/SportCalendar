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

    closeConnection(){
        this.db.close((error) =>{
            if(error)
                console.error(error.message);
        });
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

//let database = new Database();

function addEventToTable(){

    let database = new Database();

    const cell = [];
    const column = [];

    var weekday = document.getElementById("weekday").value;
    var date = document.getElementById("date").value;
    var sport = document.getElementById("sport").value;
    var teams = document.getElementById("Teams").value;
    var location = document.getElementById("location").value;

    database.addNewEvent(weekday,date,sport,teams,location);

    var table = document.getElementsByTagName('table')[0];
    var newRow = table.insertRow(table.rows.length);

    // add cells to the row
    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);
    // add values to the cells
    cel1.innerHTML = weekday;
    cel2.innerHTML = date;
    cel3.innerHTML = sport;
    cel4.innerHTML = teams;
    cel5.innerHTML = location;

    database.closeConnection();
}
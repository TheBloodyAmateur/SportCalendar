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
        else if(column == "date_time")
            this.db.each(`SELECT * FROM events ORDER BY ${column} DESC`, (error, row) =>{
                if(error)
                    console.log(error.message);
                else
                    console.log(`${row.weekday} - ${row.date_time} - ${row.sport_type} - ${row.teams} - ${row.location}`);
            });
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
//database.sortEvents("location");

const WebSocket = require('ws');
const server = new WebSocket.Server({port:'8080'})

server.on('connection', socket => {

    console.log("New client connected!");

    //Recieving data from the client
    socket.on('message', message => {
        var buffer = JSON.parse(message);
        console.log(`Recieved array: ${buffer}`);
        if(buffer.length == 5)
            database.addNewEvent(buffer[0], buffer[1], buffer[2], buffer[3], buffer[4]);
        else
            database.sortEvents(buffer[0]);
    });

    //Message pops up when the client is closing the connection
    socket.on('close', function(){
        console.log('Client closed!');
    });
    
});
let sendBuffer = []

class Database{
    constructor(){
        this.db = require('better-sqlite3')('calendar.db');
    }

    addNewEvent(weekday, date_time, sport_type, teams, location){
        const stmt = this.db.prepare(`INSERT INTO events VALUES('${weekday}','${date_time}','${sport_type}','${teams}','${location}')`);
        stmt.run();
    }

    sortEvents(column){
        if(column == "weekday"){
            const weekDays = ["Monday", "Tuesday", "Wednsday","Thursday","Friday","Saturday","Sunday"];

            const stmt = this.db.prepare(`SELECT * FROM events ORDER BY weekday`);
            const rows = stmt.all();

            for(let i = 0; i < weekDays.length; i++){
                for(let j = 0; j < rows.length; j++){
                    if(`${rows[j].weekday}` == weekDays[i]){
                        sendBuffer.push(rows[j].weekday,rows[j].date_time,rows[j].sport_type,rows[j].teams,rows[j].location);
                    }
                }    
            }
        }
        else if(column == "date_time"){
            const stmt = this.db.prepare(`SELECT * FROM events ORDER BY date_time DESC`);
            const rows = stmt.all();

            for(let i = 0; i < rows.length; i++)
            {
                //console.log(`${rows[i].weekday} - ${rows[i].date_time} - ${rows[i].sport_type} - ${rows[i].teams} - ${rows[i].location}`);
                sendBuffer.push(rows[i].weekday,rows[i].date_time,rows[i].sport_type,rows[i].teams,rows[i].location);
            }
        }else{
            const stmt = this.db.prepare(`SELECT * FROM events ORDER BY ${column}`);
            const rows = stmt.all();

            for(let i = 0; i < rows.length; i++)
            {
                sendBuffer.push(rows[i].weekday,rows[i].date_time,rows[i].sport_type,rows[i].teams,rows[i].location);
            }
        }
    }
}

let database = new Database();
database.sortEvents("weekday");
//console.log(sendBuffer.length);

const WebSocket = require('ws');
const server = new WebSocket.Server({port:'8080'})

server.on('connection', socket => {

    console.log("New client connected!");

    //Recieving data from the client
    socket.on('message', message => {
        var buffer = JSON.parse(message);
        if(buffer.length == 5){
            database.addNewEvent(buffer[0],buffer[1],buffer[2],buffer[3],buffer[4]);
            database.sortEvents("weekday");    
        }else{
            database.sortEvents(buffer[0]);
            //console.log("SendBuffer: "+sendBuffer);
            socket.send(JSON.stringify(sendBuffer));
        }
        sendBuffer = [];
    });

    //Message pops up when the client is closing the connection
    socket.on('close', function(){
        console.log('Client closed!');
    });
    
});
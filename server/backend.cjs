const http = require('http');

const server_code = () => {

    const Server = new http.createServer((req,res) => {
        res.write("Hi, This message sending from Server Side...");
        res.end();
    })
    
    Server.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

}

module.exports = server_code;
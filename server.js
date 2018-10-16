var express = require('express');
var socket = require('socket.io');
var path = require('path');

const app = express();
const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Listening on port ${port}`));

var io = socket(server);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('Stravant-client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(_dirname, 'Stravant-client', 'build', 'index.html')
    );
  });
}

io.on('connection', socket => {
  console.log('user connected');
  socket.on('pomStart', function(msg) {
    io.emit('pomClick', msg);
    console.log(msg);
  });
  socket.on('pomEnd', function(msg) {
    io.emit('pomClick', msg);
    console.log(msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

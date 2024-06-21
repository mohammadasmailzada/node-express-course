const path = require('path')
const part = ['Users', 'JohnSmith', 'node-express-course', '01-node-tutorial', 'answers'];
const joinedPath = path.join(...parts);

console.log(joinedPath);

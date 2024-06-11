// _id: 5a724953ab83547957541e6a

// 12 bytes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter

    /* 12 bytes you can uniquely identify the document in MongoDB. 
    Having said that there is a very, very very low chance that we will
    generate two object ID's that are the same.
    */

// 1 byte = 8 bits -> In each bit, we have either a 0 or 1.
// 2 ^ 8 = 256
// 3 ^ 24 = 16M

/* 
we have MongoDB that talks to MongoDB.
*/
// Driver -> MongoDB

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);

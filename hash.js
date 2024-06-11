const bcrypt = require('bcrypt');

/* 
Now to use hash a password, we need a salt. 
What is a salt?
-Well, imagine our password is 
1234 --> abcd
When you hash that, let's imagine that. we'll get a 1234 -> abcd one way.
So if we have abcd we cannot decrypt this and get 1234. So from a security piont of view that's great. 
if a hacker looks at our database, he or she cannot decrypt these hash passwords.
However, they can compile a list of popular passwords and hash them. And then 
they  can look in the database of our application define this hash password and 
they know that abcd represents 1234. So that's why we need a salt.

A salt is basically a random string that is added before or after this password,
so the resulting hash password will be different each time based on the salt that is used.
*/

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed)
}

run();
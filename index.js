const userManager = require('./userManager.js')

const userService = new userManager();

let user = {
    first_name: "Augustos",
    last_name: "Ocampso",
    username: "Augustus32323",
    age: 22,
    mail: "augusto@hotmail.snodecom"
}


 // userService.createUser(user).then(result=>console.log(result))


 // userService.findAll().then(result=>console.log(result))

 // userService.findById().then(result=>console.log(result));

 // userService.updateUser(3,user).then(result=>console.log(result))

// userService.updateUser(3,user).then(result=>console.log(result))

userService.deleteUser(2).then(result=>console.log(result));






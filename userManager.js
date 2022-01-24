const fs = require('fs');

/*  

 user = {
     first_name: String (required),
     last_name: String,
     username: String (unique) (required),
     age: Number,
     mail: String (unique) (required)
 }

*/
const pathToUsers ='./files/users.json'
class userManager{
   createUser = async (user) =>{
        //Validations
        if(!user.first_name||!user.username||!user.mail) return {status:"error", error:"missing fields"}
        try{
            if(fs.existsSync(pathToUsers)){
        
                let data = await fs.promises.readFile(pathToUsers, 'utf-8')
                let users = JSON.parse(data);
                let id = users[users.length-1].id+1;
                user.id = id;
                users.push(user);
                await fs.promises.writeFile(pathToUsers, JSON.stringify(users,null,2))
                return {status:"success", message:"User Created"}
                
            }else{// El Archivo no existe
                  user.id = 1
                await fs.promises.writeFile(pathToUsers, JSON.stringify([user],null,2))
                return {status:"success", message:"Created User"}
            }
        }catch(error){
            return {status: "error", message:error}
        }
   }

   
   findAll = async () => {
       if(fs.existsSync(pathToUsers)){
           let data = await fs.promises.readFile(pathToUsers, 'utf-8')
           let users = JSON.parse(data);
           return{status:"success", payLoad:users}
       }
   }
   findById = async (id) =>{
        if(!id) return {status:"Error", error:"ID Needed"}
    if(fs.existsSync(pathToUsers)){
        let data = await fs.promises.readFile(pathToUsers, 'utf-8')
        let users = JSON.parse(data);
        let user = users.filter(u =>u.id===id);
        if(user.length>0) return{status:"success", payload:user}
        else return{status:"error",error:"user not found"}
            
    }
   }
   updateUser = async(id,updatedUser) =>{
    if(!id) return {status:"Error", error:"ID Needed"}
    if(fs.existsSync(pathToUsers)){
        let data = await fs.promises.readFile(pathToUsers, 'utf-8')
        let users = JSON.parse(data);
        let newUsers = users.map((user)=>{
            if(user.id===id){
                // Debo Modificar este
                return updatedUser;
            }
            else{
                return user
            }
        })
        await fs.promises.writeFile(pathToUsers,JSON.stringify(newUsers,null,2))
        return {status:"success", message:"User Updated"}
    }
   }
   deleteUser = async (id) =>{
    if(!id) return {status:"Error", error:"ID Needed"}
    if(fs.existsSync(pathToUsers)){
        let data = await fs.promises.readFile(pathToUsers, 'utf-8')
        let users = JSON.parse(data);
        let newUsers = users.filter(user=>user.id!==id)
        await fs.promises.writeFile(pathToUsers,JSON.stringify(newUsers,null,2))
        return {status:"Success", message:"User Deleted"}
    }
   }
   
}
   
 



module.exports = userManager;
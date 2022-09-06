const fileUsersDal = require("../DALs/fileUsersDAL")

const findUserLogin = async (uname, pass) => {
   let data = await fileUsersDal.getUsers()
   let users = data.users;
   let userLogin = users.find(user => user.userName == uname && user.password == pass)
   return userLogin; // Returns the object of the logged in user
}


const getAllUsers = async () => {
   let data = await fileUsersDal.getUsers()
   let allUsers = data.users;
   return allUsers;
}


const getUserByName = async (uname) => {
   let data = await fileUsersDal.getUsers()
   let allUsers = data.users;
   let user = allUsers.find(user => user.userName == uname)
   return user;
}


const deleteUser = async (username) => {
   let data = await fileUsersDal.getUsers()
   let allUsers = data.users;
   let index = allUsers.findIndex(x => x.userName == username)
   if (index > -1) {
      allUsers.splice(index, 1)
      let usersAfterDelete = { "users": allUsers }
      let status = await fileUsersDal.saveUsers(usersAfterDelete)
      if (status == "Done!")
         return "Deleted!";
   }

}


const addUser = async (newUser) => {
   let data = await fileUsersDal.getUsers()
   let allUsers = data.users;
   let userExist = allUsers.find(x => x.userName == newUser.userName || x.password == newUser.password)
   if (!userExist) {
      allUsers.push(newUser)
      let usersAfterAdd = { "users": allUsers }
      let status = await fileUsersDal.saveUsers(usersAfterAdd)
      if (status == "Done!")
         return "Added!"
   }
   else {
      return "User already exist!"
   }
}


const updateUser = async (usernameBeforeUpdate , updatedUser) => {
   let data = await fileUsersDal.getUsers()
   let allUsers = data.users;
   let index = allUsers.findIndex(x => x.userName == usernameBeforeUpdate)
   if (index > -1) {
      allUsers[index] = updatedUser;
      let usersAfterupdate = { "users": allUsers }
      let status = await fileUsersDal.saveUsers(usersAfterupdate)
      if (status == "Done!")
         return "Updated!"
   }

}

module.exports = { findUserLogin, getAllUsers, deleteUser, addUser, getUserByName, updateUser }
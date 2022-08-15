const path = require('path');
const fs = require('fs')

userModel = {
    file: path.resolve(__dirname, '../database/users.json'),

    getUsers: function () {
        let users = JSON.parse(fs.readFileSync(this.file))
        return users
    },

    getOneUser: function (id) {
        let user = this.getUsers().find(user => user.id == id)
        return user
    },

    getOneUserByField: function (field, text) {
        let user = this.getUsers().find(user => user[field].toLowerCase() == text)
        return user
    },

    registerUser: function (user) {
        let newId;
        let usersInDb = this.getUsers()
        let userIdInDb= usersInDb.map(user => user.id)
        if (userIdInDb.length>0) {
            let lastId = Math.max(...userIdInDb)
            newId = lastId + 1
        }
        else{
            newId = 1
        }
        user = {
            id: newId,
            ...user
        }
        usersInDb.push(user)
        let newUsersJson = JSON.stringify(usersInDb, null, ' ')
        fs.writeFileSync(this.file, newUsersJson, { encoding: 'utf8' })
        return user
    },

    editUser: function(id,data){
        let users = this.getUsers()
        let indexToEdit = users.findIndex(index => index.id == id)
        users[indexToEdit] = {id:id,
                            ...data}
        let editUsersJson = JSON.stringify(users, null, ' ')
        fs.writeFileSync(this.file, editUsersJson, { encoding: 'utf8' })
    },

    deleteUser: function (id) {
        let users = this.getUsers()
        let newUsersDb = users.filter(user => user.id != id)
        let usersJson = JSON.stringify(newUsersDb, null, ' ')
        fs.writeFileSync(this.file, usersJson, { encoding: 'utf8' })
    },

    deleteAvatar: function(id){
        let user = this.getOneUser(id)
        if (user.image != "default.png") {
            let routeAvatar = path.resolve(__dirname,`../../public/images/avatars/${user.image}`)
            fs.existsSync(routeAvatar)?fs.unlinkSync(routeAvatar):'' ;
            return true 
        }
    },

    deleteAvatarByName: function(name){
        path.resolve(__dirname,`../../public/images/avatars/${name}`)
        fs.existsSync(name)?fs.unlinkSync(name):''
        return true
    }

}

module.exports = userModel;
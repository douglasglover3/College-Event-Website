const User = function(user) {
    this.userID = user.userID;
    this.hashedPass = user.hashedPass;
    this.university = user.university;
    this.type = user.type;
};

module.exports = User;
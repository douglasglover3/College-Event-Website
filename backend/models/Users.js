const User = function(user) {
    this.userID = user.userID;
    this.hashedPass = user.hashedPass;
    this.university = user.university;
};

module.exports = User;
const User = function(user) {
    this.userID = user.userID;
    this.hashedPass = user.hashedPass;
    this.userType = user.userType;
};

module.exports = User;
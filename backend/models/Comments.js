const Comment = function(c) {
    this.commentID = c.commentID;
    this.commentText = c.commentText;
    this.userID = c.userID;
    this.eventID = c.eventID;
};

module.exports = Comment;
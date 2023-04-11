const Event = function(e) {
    this.eventID = e.eventID;
    this.eventName = e.eventName;
    this.eventType = e.eventType;
    this.sponsor = e.sponsor;
    this.eventDescription = e.eventDescription;
    this.eventTime = e.eventTime;
    this.eventDate = e.eventDate;
    this.contactPhone = e.contactPhone;
    this.contactEmail = e.contactEmail;
    this.locationName = e.locationName;
};

module.exports = Event;
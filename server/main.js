
Meteor.publish("people", function(t) {
  return People.find({'type': t});
});


Meteor.methods({
  'incVote':  function(id) {
    People.update({_id: id}, {$inc: {'voteCount': 1}});
  },

  'addFeedBack': function(name, city, phone, votes) {
    Feedback.insert({
     'name' :  name,
     'phone':  city,
     'city' :  phone,
     'votes':  votes
    });
  }
});

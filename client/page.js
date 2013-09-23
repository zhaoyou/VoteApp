Meteor.subscribe("people", 1);
Meteor.subscribe("people", 2);
Meteor.subscribe("people", 3);
Meteor.subscribe("people", 4);

Meteor.subscribe("singlePeople", Session.get("currentPersion"));

VoteRouter = Backbone.Router.extend({
     routes: {
        '':'index',
        'index':'index',
        'index2':'index2',
        'index3':'index3',
        'index4':'index4',
        'feedback': 'feedback',
        'success': 'success',
        ':personName': 'detail'
     },
    index: function() {
      Session.set('currentView', 'index');
    },
    index2: function() {
      Session.set('currentView', 'index2');
    },
    index3: function() {
      Session.set('currentView', 'index3');
    },
    index4: function() {
      Session.set('currentView', 'index4');
    },
    feedback: function() {
      Session.set('currentView', 'feedback');
    },
    success: function() {
      Session.set('currentView', 'success');
    },
    detail: function(personName) {
      console.log('detail');
      Session.set('currentView', personName);
      Session.set('currentPersion', personName);
    }
});

Meteor.startup(function(){
  new VoteRouter();
  Backbone.history.start(true);
});


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
    detail: function(personName) {
      Session.set('currentView', personName);
      Session.set('currentPersion', personName);
    }
});

Meteor.startup(function(){
  new VoteRouter();
  Backbone.history.start(true);
});


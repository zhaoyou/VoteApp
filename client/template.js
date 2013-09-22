
Meteor.subscribe("people", 1)
Meteor.subscribe("people", 2)
Meteor.subscribe("people", 3)
Meteor.subscribe("people", 4)

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
      Session.set('currentView', 'detail');
      Session.set('currentPersion', personName);
    }
});

Meteor.startup(function(){
  new VoteRouter();
  Backbone.history.start(true);
});


function ifViewing(viewname) {
  return Session.get("currentView") == viewname;
}


// for four index page.

Template.index.show = function() {
  return ifViewing("index")
}

Template.index2.show = function() {
  return ifViewing("index2")
}

Template.index3.show = function() {
  return ifViewing("index3")
}

Template.index3.rendered = function() {
    var decimal = function(num,v){
        var vv = Math.pow(10,v);
        return Math.round(num*vv)/vv;
    }

    var popAction = new function(){
        var self = this;
        self.db = $("<div>").attr("id","popBg").appendTo($("body"));
        self.dc = $("<div>").attr("id","popContent").addClass("fixed-top").appendTo($("body"));

        self.pop = function(num){
            var w = $(window).width();
            var h = $("body").height();

            var l = (w-637)/2;
            var t = ($(window).height()-455)/2;

            self.db.css({"height":h,"width":w});
            self.dc.css({"top":t,"left":l})
            var d = $("<div>").addClass("relative").appendTo(self.dc);
            var img = $("<img>").attr("src","images/pop0"+num+".jpg").appendTo(d);
            var close = $("<span>").attr("id","popClose").appendTo(d);
            close.bind("click",function(){
                self.dc.html("").hide();
                self.db.hide();
            })
            self.dc.show();
            self.db.show();
        }
    }

    var dragMotion = function(){
        var self = this;

        self.moveTo = function(n){
            var m = (blockW-mainW)*-1;
            var i = n/lineW*m;
            var w = decimal(i,0);
            $('#share-block').css("left",w);
        }
    }

    var blockW = 1900;
    var mainW = 950;
    var barW = 280;
    var lineW = 950-280;

    $(document).ready(function(){

        sd = new dragMotion();
        $("#scrollBar").draggable({
            containment: 'parent',
            drag: function(event, ui){
                var l = parseInt($(this).css("left"));
                sd.moveTo(l);
            }
        });

    })

    $(function(){
        GaAgent.indexPage();
        $.browser.msie && $.browser.version=="6.0" &&
        $("#nav a:not(.on)").each(function(){
            var dom=this;
            DD_belatedPNG.fixPng(this);
        }) && $(".on").each(function(){
            $(this).parent().addClass("over4");
            DD_belatedPNG.fixPng(this);
        });
    });
}

Template.index4.show = function() {
  return ifViewing("index4")
}




//Template.people1.peoples = function() {
//  return People.find({'type': 1});
//}
//
//Template.people2.peoples = function() {
//  return People.find({'type': 2});
//}
//
//Template.people3.peoples = function() {
//  return People.find({'type': 3});
//}
//
//Template.people4.peoples = function() {
//  return People.find({'type': 4});
//}

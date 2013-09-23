
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

Template.index3.peoples1 = function() {
  return People.find({'type': 1}, {sort: {n: 1}});
}

Template.index3.peoples2 = function() {
  return People.find({'type': 2}, {sort: {n: 1}});
}

Template.index3.peoples3 = function() {
  return People.find({'type': 3}, {sort: {n: 1}});
}

Template.index3.peoples4 = function() {
  return People.find({'type': 4}, {sort: {n: 1}});
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
  return ifViewing("index4");
}

Template.user1.show = function() {
  return ifViewing("user1");
}

Template.user1.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user1.events({
  'click #btnVote' : function (e, t) {
     var id = e.currentTarget.getAttribute("uid");
     console.log(id);
     Meteor.call("incVote", id);
  }
});

Template.user2.show = function() {
  return ifViewing("user2");
}


Template.user3.show = function() {
  return ifViewing("user3");
}

Template.user4.show = function() {
  return ifViewing("user4");
}

Template.user5.show = function() {
  return ifViewing("user5");
}

Template.user6.show = function() {
  return ifViewing("user6");
}

Template.user7.show = function() {
  return ifViewing("user7");
}

Template.user8.show = function() {
  return ifViewing("user8");
}

Template.user9.show = function() {
  return ifViewing("user9");
}

Template.user10.show = function() {
  return ifViewing("user10");
}

Template.user11.show = function() {
  return ifViewing("user11");
}

Template.user12.show = function() {
  return ifViewing("user12");
}


function ifViewing(viewname) {
  return Session.get("currentView") == viewname;
}

function addVoteTracker(t) {
  var votes = Session.get("voteTracker");
  if (!votes) {
    votes = [];
  }
  votes.push(t);
  Session.set("voteTracker", votes);
}


Template.main.rendered = function() {
    if (!window._gaq) {
      window._gaq = window._gaq || [];
       _gaq.push(['_setAccount', 'UA-530472-46']);
       _gaq.push(['_trackPageview']);

       (function() {
         var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
         ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
       })();

      var _hmt = _hmt || [];
      (function() {
       var hm = document.createElement("script");
       hm.src = "//hm.baidu.com/hm.js?6b35f61db05df9e63e5b1c568019e03c";
       var s = document.getElementsByTagName("script")[0];
       s.parentNode.insertBefore(hm, s);
      })();
    }
}

Template.ga.rendered = function() {
  _gaq.push(['_trackPageview']);
}

// for four index page.

Template.index.show = function() {
  return ifViewing("index")
}

Template.index.rendered = function() {
  $(function() {
    $(".contrast .czsbg1").hide();
    $(".contrast .czsbg2").hide();
    $(".contrast .czsbg3").hide();
    $(".contrast .czsbg4").hide();
    $(".contrast .caizhuang1").mouseover(function() {
      $(".contrast .czsbg1").show();
    }).mouseout(function() {
      $(".contrast .czsbg1").hide();
    })
    $(".contrast .caizhuang2").mouseover(function() {
      $(".contrast .czsbg2").show();
    }).mouseout(function() {
      $(".contrast .czsbg2").hide();
    })
    $(".contrast .caizhuang3").mouseover(function() {
      $(".contrast .czsbg3").show();
    }).mouseout(function() {
      $(".contrast .czsbg3").hide();
    })
    $(".contrast .caizhuang4").mouseover(function() {
      $(".contrast .czsbg4").show();
    }).mouseout(function() {
      $(".contrast .czsbg4").hide();
    })
  });

}

Template.index.events({
  'click .rules': function(e, t) {
     var t = e.currentTarget.title || e.currentTarget.name || null;
	 var a = e.currentTarget.href || e.currentTarget.alt;
	 var g = e.currentTarget.rel || false;
	 tb_show(t,a,g);
     e.currentTarget.blur();
     e.preventDefault();

     $("#TB_window .guize_close").click(function(){
        tb_remove();
        e.preventDefault();
     });
  }
});

Template.index2.show = function() {
  return ifViewing("index2")
}

Template.index2.rendered = function() {
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

    });

    $(function(){
        //GaAgent.indexPage();
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


Template.index4.rendered = function() {
}

Template.user1.show = function() {
  return ifViewing("user1");
}

Template.user1.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

var addSubbitSuccessGA = function() {
  _gaq.push(['_trackEvent','cloudcam','cloudsuccess',,,false]);
}

var UserDetailEventHandler = {
  'click #btnVote' : function (e, t) {
     var id = e.currentTarget.getAttribute("uid");
     var uname = e.currentTarget.getAttribute("uname");
     Meteor.call("incVote", id);
     addVoteTracker(uname);
     var t = e.currentTarget.title || e.currentTarget.name || null;
	 var a = e.currentTarget.href || e.currentTarget.alt;
	 var g = e.currentTarget.rel || false;
	 tb_show(t,a,g);
     e.currentTarget.blur();
     e.preventDefault();
     // TODO (hacker, add subbuton, cancel, share click event, Show div isn't in Template User)
     $("#TB_window .subbotton").click(function(){
       var name = $("#TB_window #name").val();
       var mobile = $("#TB_window #mobile").val();
       var city = $("#TB_window #city").val();
       var reg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;

       if (name === '') {
          $('#TB_window .error1').show();
          return;
       } else {
          $('#TB_window .error1').hide();
       }

       if (mobile === '' || !reg.test(mobile)) {
          $('#TB_window .error2').show();
          return;
       } else {
          $('#TB_window .error2').hide();
       }

      if (city === '') {
          $('#TB_window .error3').show();
          return;
       } else {
          $('#TB_window .error3').hide();
       }

       Meteor.call("addFeedBack", name, mobile, city, Session.get("voteTracker"));
       Session.set("voteTracker", []);
       $(".form_con").hide();
	   $(".form_success").show();
       addSubbitSuccessGA();
     });

     $("#TB_window .closex").click(function(){
        tb_remove();
     });
  },
  'click .icon': function(e, t) {
     var t = e.currentTarget.title || e.currentTarget.name || null;
	 var a = e.currentTarget.href || e.currentTarget.alt;
	 var g = e.currentTarget.rel || false;
	 tb_show(t,a,g);
     e.currentTarget.blur();
     e.preventDefault();

     $("#TB_window .guize_close").click(function(e){
        tb_remove();
        e.currentTarget.blur();
        e.preventDefault();
     });
  }
};

Template.user1.events(UserDetailEventHandler);

Template.user1.rendered = function() {
}

Template.user2.show = function() {
  return ifViewing("user2");
}

Template.user2.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user2.events(UserDetailEventHandler);

Template.user2.rendered = function() {
}

Template.user3.show = function() {
  return ifViewing("user3");
}

Template.user3.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user3.events(UserDetailEventHandler);

Template.user3.rendered = function() {
}

Template.user4.show = function() {
  return ifViewing("user4");
}

Template.user4.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user4.events(UserDetailEventHandler);

Template.user4.rendered = function() {
}
Template.user5.show = function() {
  return ifViewing("user5");
}

Template.user5.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user5.events(UserDetailEventHandler);

Template.user5.rendered = function() {
}
Template.user6.show = function() {
  return ifViewing("user6");
}

Template.user6.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user6.events(UserDetailEventHandler);

Template.user6.rendered = function() {
}

Template.user7.show = function() {
  return ifViewing("user7");
}
Template.user7.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user7.events(UserDetailEventHandler);

Template.user7.rendered = function() {
}

Template.user8.show = function() {
  return ifViewing("user8");
}
Template.user8.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user8.events(UserDetailEventHandler);

Template.user8.rendered = function() {
}

Template.user9.show = function() {
  return ifViewing("user9");
}
Template.user9.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user9.events(UserDetailEventHandler);

Template.user9.rendered = function() {
}

Template.user10.show = function() {
  return ifViewing("user10");
}
Template.user10.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user10.events(UserDetailEventHandler);
Template.user10.rendered = function() {
}

Template.user11.show = function() {
  return ifViewing("user11");
}
Template.user11.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user11.events(UserDetailEventHandler);

Template.user11.rendered = function() {
}

Template.user12.show = function() {
  return ifViewing("user12");
}
Template.user12.p = function() {
  return People.findOne({name: Session.get("currentPersion")});
}

Template.user12.events(UserDetailEventHandler);

Template.user12.rendered = function() {
}


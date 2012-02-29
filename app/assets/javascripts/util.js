var tags = {
	"ui":{
		"description":"UI Design",
		"img":"tag_ui.png"
	},
	"ux":{
		"description":"UX Design",
		"img":"tag_ux.png"
	},
	"mobile":{
		"description":"Smartphone & Tablets Application",
		"img":"tag_mobile.png"
	},
	"game":{
		"description":"Game Application",
		"img":"tag_game.png"
	},
	"lifestyle":{
		"description":"Life Style Application",
		"img":"tag_lifestyle.png"
	},
	"productivity":{
		"description":"Productivity Application",
		"img":"tag_productivity.png"
	},
	"ecommerce":{
		"description":"E-commerce",
		"img":"tag_ecommerce.png"
	},
	"socialMedia":{
		"description":"Social Media",
		"img":"tag_social_media.png"
	},
	"logo":{
		"description":"Logo & Identity",
		"img":"tag_logo.png"
	},
	"print":{
		"description":"Print Design",
		"img":"tag_print.png"
	},
	"streetInstallment":{
		"description":"Street Installment",
		"img":"tag_street_installation.png"
	},
	"online":{
		"description":"Web Application",
		"img":"tag_online.png"
	},
	"animation":{
		"description":"Animation Production",
		"img":"tag_animation.png"
	},
	"ads":{
		"description":"Advertisement",
		"img":"tag_ads.png"
	}			
};

$(".tags").live("mouseenter", function(event){
	var offsetX = 10;
	var offsetY = -25;
    $("#tooltip").text(tags[$(this).attr("class").substring(5)].description);
	//offsetX = $("#tooltip").width()/2*-1;
	$("#tooltip").css({top:event.pageY + offsetY+ "px", left: event.pageX + offsetX +"px"});
	$("#tooltip").show();
});

$(".tags").live("mouseout", function(){
	$("#tooltip").hide();
});

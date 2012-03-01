var ecl = ecl || {};
ecl.UI = ecl.UI || {}

ecl.UI.homepageNav = {
	myData:{},
	totalSlide:0,
	currentSlide:0,
	currentSlideProjectId:0,
	init:function(){
		//load homepge_navigation_thumbnails
		$.getJSON('/projects.json', function(data) {
			ecl.UI.homepageNav.myData= data;
			ecl.UI.homepageNav.totalSlides=data.length;
			$("#homepage_banner_navigation ul").css("width", (data.length>4)?(data.length*251)+"px":"1000px");
			$.each(data, function(key, val) {
				html ="<li>";
				html+="<img class='thumbnail' src='"+val.img+"'>";
				html+="<div class='thumbnail_bubble'>";
				if(val.labels.length>12) {
				  html+="<h1 class='thumbnail_title2'>"+val.labels+"</h1>";
				}
				else {
				  html+="<h1 class='thumbnail_title'>"+val.labels+"</h1>";
				}
				html+="<input type='hidden' class='project_id' value='" + val.id + "' />";
				html+="</div></li>";
				$("#homepage_banner_navigation ul").append(html);
		
			});
		}).success(function() {})
		  .error(function() {})
		  .complete(function(data) {
		
			//bind button to events
			if(ecl.UI.homepageNav.totalSlides>4){
				$(".arrow-button").filter(".right").bind("click",function(){
					if((ecl.UI.homepageNav.currentSlide+4)>=ecl.UI.homepageNav.totalSlides) return;
					ecl.UI.homepageNav.currentSlide++;
					$("#homepage_banner_navigation ul").animate({"left":"-=250"});
				});
				$(".arrow-button").filter(".left").bind("click",function(){
					if(ecl.UI.homepageNav.currentSlide==0) return;
					ecl.UI.homepageNav.currentSlide--;
					$("#homepage_banner_navigation ul").animate({"left":"+=250"});
				});
			}else{
				$(".arrow-button").hide();
			}				
			//bind live events to created dom elements
			$("#homepage_banner_navigation ul li").live("click", function(){
			  var projectId = $(this).find("input.project_id").val();
			  
				if(ecl.UI.homeBanner.currentSlideProjectId==projectId) return;
				$("#homepage_banner_navigation ul li").find(".thumbnail").css("opacity","1");
				$("#homepage_banner_navigation ul li").find(".thumbnail_bubble").css("background","rgba(0,0,0,0.7)");
				$("#homepage_banner_navigation ul li").find("h1").css("color","#ccc");
				
				if(typeof ecl.UI.homeBanner.showSlide == "function") ecl.UI.homeBanner.showSlide($(this).index(), projectId);
				$(this).find(".thumbnail").animate({"opacity":".2"},200);
				$(this).find(".thumbnail_bubble").css("background","rgba(255,255,255,1)");
				$(this).find("h1").css("color","black");

			});

			
		});
	}
};

ecl.UI.homepageNav.init();

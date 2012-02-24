var newsData = {};
var bannerData={};

$(document).ready(function(){
	
	(function(){
		var totalSlides=0;
		var currentSlide=0;
		
		//load homepage_navigation_thumbnails
		$.getJSON('/assets/news.json', function(data) {
			totalSlides=data.length;
			$("#homepage_banner_navigation ul").css("width", (data.length>4)?(data.length*251)+"px":"1000px");
			$.each(data, function(key, val) {
				dom ="<li>";
				dom+="<img class='thumbnail' src='"+val.img+"'>";
				dom+="<div class='thumbnail_bubble'>";
				dom+="<h1 class='thumbnail_title'>"+val.labels+"</h1>";
				dom+="</div></li>";
				$("#homepage_banner_navigation ul").append(dom);
			});
		}).success(function() {})
		  .error(function() {})
		  .complete(function() {
			//bind button to events
			if(totalSlides>4){
				$(".arrow-button").filter(".left").bind("click",function(){
					if((currentSlide+4)>=totalSlides) return;
					currentSlide++;
					$("#homepage_banner_navigation ul").animate({"left":"-=250"});
				});
				$(".arrow-button").filter(".right").bind("click",function(){
					if(currentSlide==0) return;
					currentSlide--;
					$("#homepage_banner_navigation ul").animate({"left":"+=250"});
				});
			}else{
				$(".arrow-button").hide();
			}					
		});
	})();



});

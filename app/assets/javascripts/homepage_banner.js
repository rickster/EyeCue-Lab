var ecl = ecl || {};
ecl.UI = ecl.UI || {}
ecl.UI.homeBanner = {}

ecl.UI.homeBanner = {
	currentSlide:0,
	myData:{},
	init:function(){
		//load homepge_navigation_thumbnails
		$.getJSON('/showcase/highlighted.json', function(data) {
			ecl.UI.homeBanner.myData = data;
		}).success(function() {})
		  .error(function() {})
		  .complete(function() {
			ecl.UI.homeBanner.showSlide(0);
		});
	},
	showSlide:function(index, projectId){
	  var projectData = ecl.UI.homeBanner.myData;
		banner=projectData[index];
		ecl.UI.homeBanner.currentSlide=index;
		if (projectId != "undefined"){
		  ecl.UI.homeBanner.currentSlideProjectId = projectId;
		  for (var project_index = 0, len = projectData.length; project_index < len; project_index++){
		    if (projectId == projectData[project_index]["id"]){
		      banner=projectData[project_index];
		    }
		  }
		}
		$("#homepage_banner_container").fadeOut(300, function(){
			if(typeof(banner.showcase) != "undefined"){
				html = "<img src='"+banner.showcase+"'>";
			}
			if(typeof(banner.logo) != "undefined"){
				html+= "<img src='"+banner.logo+"' class='homepage_banner_logo'>";
			}
			$("#homepage_banner_container").html(html);
			
			$("#homepage_banner_container").fadeIn();
		});
		$("#homepage_banners_info").fadeOut(200, function(){
			html = '';
			if(typeof(banner.story) != "undefined"){
				html+= '<h1 class="header1 blue_background">What\'s the deal?</h1>';
				html+= '<p class="description1">'+banner.story+'</p>';
			}
			if(typeof(banner.details) != "undefined"){
				html+= '<h1 class="header1 yellow_background black">What\'s the story?</h1>';
				html+= '<p class="description1">'+banner.details+'</p>'
			}
			html+= '<ul class="inline-list icon-list">';
			if(typeof(banner.tags) != "undefined"){
				for(i=0;i<banner.tags.length;i++){
					html+='<li><img src="/assets/tags/'+tags[banner.tags[i]].img+'" class="tags '+banner.tags[i]+'"></li>'
				}
			}
			html+= '</ul>';
			$("#homepage_banners_info").html(html).fadeIn(300);
		});

	}
	
}

ecl.UI.homeBanner.init();

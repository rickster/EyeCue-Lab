var ecl = ecl || {};
ecl.UI = ecl.UI || {}

ecl.UI.thumbnails = {
	myData:{},
	parentObj:{},
	init:function(location, parentId){
		ecl.UI.thumbnails.parentObj = $(parentId);
		$.getJSON(location, function(data) {
			ecl.UI.thumbnails.myData=data;
		}).success(function() {})
		  .error(function() {})
		  .complete(function(data) {
			rowCount=1;
			html="";
			$.each(ecl.UI.thumbnails.myData, function(key, val) {
				if((key+1)%3==1) {
					cssClass="";
					if(rowCount%2) cssClass="section_container_opt1";
					else cssClass="section_container_opt2";
					rowCount++;
					html+= '<div class="'+cssClass+'">';
					html+= '<div class="work_container">';
					html+= '<ul class="inline-list work-list">';
				}
				html+= '<li class="'+(key)+'">';
				html+= '<img src="'+val.img+'">';
				html+= '<div class="mesh-mask work-thumb"></div>'
				if(val.labels.length>12) html+= '<div class="thumbnail_bubble"><h1 class="thumbnail_title2">'+val.labels+'</h1></div>';
				else html+= '<div class="thumbnail_bubble"><h1 class="thumbnail_title">'+val.labels+'</h1></div>';;
				html+= '<div class="thumbnail_icons">';
				html+= '<ul class="inline-list icon-list">';
				if(typeof(val.tags) != "undefined"){
					for(i=0;i<val.tags.length;i++){
						html+='<li><img src="/assets/tags/'+tags[val.tags[i]].img+'" class="tags '+val.tags[i]+'"></li>'
					}
				}
				html+= '</ul></div></li>';
				
				if((key+1)%3==0 || key==ecl.UI.thumbnails.myData.length-1) {
					html+= '</ul></div></div>';
					ecl.UI.thumbnails.parentObj.append(html);
					html="";
				}
			});
		});


		$(".work_container li").live("click", function(){
			window.location=ecl.UI.thumbnails.myData[$(this).attr("class")].redirect;
		});
	}
}
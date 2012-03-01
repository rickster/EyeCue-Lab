class ShowcaseController < ApplicationController
  
  def project
    @project = Project.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render :json => @project.showcase_json }
    end
  end
  
  def highlighted
    @highlighted_projects = Project.highlighted
    
    respond_to do |format|
      format.html
      format.json { render :json => @highlighted_projects.collect{|p| p.showcase_json } }
    end
  end
  
  def home_thumbnails
    @projects = Project.nonhighlighted
    
    respond_to do |format|
      format.html
      format.json { render :json => @projects.collect{|p| p.thumbnails_json }}
    end
  end

end

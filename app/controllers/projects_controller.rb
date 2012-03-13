class ProjectsController < ApplicationController
  
  before_filter :authenticate_user!, :except => [:show]
  layout "admin", :except => [:show]
  layout "application", :only => [:show]
  
  # GET /projects
  # GET /projects.json
  def index
    @projects = Project.all
    
    @projects_json = []
    @projects.each do |p|
      @projects_json.push(p.to_json)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects_json }
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])
    @page_title = @project.name

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @project }
    end
  end

  # GET /projects/new
  # GET /projects/new.json
  def new
    @project = Project.new
    @categories = Category.find(:all)
    @category = Category.new
    @tags = Tag.find(:all).collect{|tag| [tag.name, tag.id]}
    

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @project }
    end
  end

  # GET /projects/1/edit
  def edit
    @project = Project.find(params[:id])
    @categories = Category.find(:all)
    @category = @project.category
    
    @tags = Tag.find(:all).collect{|tag| [tag.name, tag.id]}
    @project_tags = @project.tags.collect{|tag| tag.id}
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(params[:project])
    @categories = Category.find(:all)
    @tags = Tag.find(:all).collect{|tag| [tag.name, tag.id]}
    @project_tags = @project.tags.collect{|tag| tag.id}
    
    if params[:project][:category_id].present?
      @category = Category.find(params[:project][:category_id])
    else
      @category = Category.new
    end
    
    @project.tags = Tag.find(params[:tag_ids]) if params[:tag_ids]

    respond_to do |format|
      @project.category = @category
      if @project.save
        format.html { redirect_to projects_path, notice: 'Project was successfully created.' }
        format.json { render json: @project, status: :created, location: @project }
      else
        format.html { render action: "new" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    @project = Project.find(params[:id])
    @categories = Category.find(:all)
    @tags = Tag.find(:all).collect{|tag| [tag.name, tag.id]}
    @project_tags = @project.tags.collect{|tag| tag.id}
    
    if params[:project][:category_id].present?
      @category = Category.find(params[:project][:category_id])
    else
      @category = @project.category
    end
    
    @project.tags = Tag.find(params[:tag_ids]) if params[:tag_ids]

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to projects_path, notice: 'Project was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :ok }
    end
  end
  
end

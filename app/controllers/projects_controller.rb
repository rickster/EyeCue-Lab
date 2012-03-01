class ProjectsController < ApplicationController
  
  before_filter :authenticate_user!, :except => [:show, :index]
  layout "admin", :except => [:show]
  
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
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(params[:project])
    @categories = Category.find(:all)
    if params[:project][:category_id].present?
      @category = Category.find(params[:project][:category_id])
    else
      @category = Category.new
    end

    respond_to do |format|
      @project.category = @category
      if @project.save
        format.html { redirect_to @project, notice: 'Project was successfully created.' }
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
    if params[:project][:category_id].present?
      @category = Category.find(params[:project][:category_id])
    else
      @category = @project.category
    end

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
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

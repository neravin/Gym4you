class GymnasiaController < ApplicationController
  before_action :set_gymnasium, only: [:show, :edit, :update, :destroy]

  # GET /gymnasia
  # GET /gymnasia.json
  def index
    @gymnasia = Gymnasium.all
  end

  # GET /gymnasia/1
  # GET /gymnasia/1.json
  def show
  end

  # GET /gymnasia/new
  def new
    @gymnasium = Gymnasium.new
  end

  # GET /gymnasia/1/edit
  def edit
  end

  # POST /gymnasia
  # POST /gymnasia.json
  def create
    @gymnasium = Gymnasium.new(gymnasium_params)

    respond_to do |format|
      if @gymnasium.save
        format.html { redirect_to @gymnasium, notice: 'Gymnasium was successfully created.' }
        format.json { render action: 'show', status: :created, location: @gymnasium }
      else
        format.html { render action: 'new' }
        format.json { render json: @gymnasium.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /gymnasia/1
  # PATCH/PUT /gymnasia/1.json
  def update
    respond_to do |format|
      if @gymnasium.update(gymnasium_params)
        format.html { redirect_to @gymnasium, notice: 'Gymnasium was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @gymnasium.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gymnasia/1
  # DELETE /gymnasia/1.json
  def destroy
    @gymnasium.destroy
    respond_to do |format|
      format.html { redirect_to gymnasia_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gymnasium
      @gymnasium = Gymnasium.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def gymnasium_params
      params.require(:gymnasium).permit(:title, :description, :logo_url, :phone_overall)
    end
end

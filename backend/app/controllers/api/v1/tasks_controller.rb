module Api
  module V1
    class TasksController < ApplicationController

      before_action :set_post, only: %i[show destroy update]
      def index
        tasks = Task.all.order(:id)
        render json: tasks
      end

      def show
          render json: @task
      end

      def create
          task = Task.new(task_params)
          if task.save
              render json: task
          else
              render json: task.errors
          end
      end

    def update
      if @task.update(task_params)
        render json: @task
      else
        render json: @task.errors
      end
    end

    def destroy
      if @task.destroy
        render json: @task
      else
        render json: @task.errors
      end
    end

    private

    def set_post
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :state)
    end

    end
  end
end

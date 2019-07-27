class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    # @messages = @group.messages.includes(:user)
    # @members = @group.users
    respond_to do |format|
      format.html
       # params[:id]よりも大きいidがないかMessageから検索、@messagesに代入
      format.json{ @messages = @group.messages.where('id > ?', params[:id]) }
    end
  end
end
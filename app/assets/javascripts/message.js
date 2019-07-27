$(function(){
  
  function buildPost(post){
    image = (post.image)? `<img class= "message__text__image" src=${post.image} >` : "";
    var html = `<div class="message" data-message-id="${post.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${post.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${post.date}
                    </div>
                   </div>
                   <div class="message__text">
                     <p class="message__text__content">
                      ${post.content}
                     </p>
                     ${image}
                   </div>
                 </div>`
    return html;
  }

  var buildMessageHTML = function(message) {
    var image = (message.image)? '<img class= "message__text__image" src='+ message.image + '>' : "" ; 
    var html = '<div class="message" data-message-id='+ message.id + '>' +
                  '<div class="message__upper-info">' +
                    '<div class="message__upper-info__talker">' +
                      message.user_name +
                    '</div>' +
                    '<div class="message__upper-info__date">' +
                      message.created_at +
                    '</div>' +
                   '</div>' +
                   '<div class="message__text">' +
                     '<p class="message__text__content">' +
                      message.content +
                     '</p>' +
                       image +
                   '</div>' +
                 '</div>'
    return html;
  }
    

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      var html = buildPost(post);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('エラー');
    })
  
    return false;
  });

  var reloadMessages = function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      //一番最後にあるmessageクラスのid属性を取得、last_message_id に代入
      var last_message_id = $('.message:last').data('messageId')
      var now_group_id = $('.main-header__left-box__current-group').data('groupId')
      $.ajax({
        url: '/groups/' + now_group_id + '/api/messages', //urlは現在のページを指定
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id,
              group_id: now_group_id} //paramsの形
      })
      .done(function(messages){
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        $(messages).each(function(index, message){
          console.log(message)
          insertHTML = buildMessageHTML(message);
          $('.messages').append(insertHTML)
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
        });
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      })
    }}
    $(function(){
      setInterval(reloadMessages, 5000);
      //5000ミリ秒ごとにreloadMessagesという関数を実行
    });
});
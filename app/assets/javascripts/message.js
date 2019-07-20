$(function(){
  
  function buildPost(post){
    image = (post.image)? `<img class= "message__text__image" src=${post.image} >` : "";
    console.log(image)
    var html = `<div class="message">
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
      console.log(post)
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('エラー');
    })
  
    return false;
  })
});
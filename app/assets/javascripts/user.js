$(function(){

  var search_list = $("#user-search-result");
  var members_list = $("#chat-group-users");
    
  function appendUserToSearchList(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
  }  
    
  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  function appendUserTomembersList(name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    members_list.append(html)
  }

    $("#user-search-field").on("keyup", function(){
      var input = $("#user-search-field").val();

      if(input!==""){
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },  //コントローラーに渡すデータ。keyword=input(入力文字)
          dataType: 'json'
        })
      
        .done(function(users){
          $("#user-search-result").empty();
          if (users.length !== 0){
            users.forEach(function(user){
              appendUserToSearchList(user);
            });
          }
          else {
            appendErrMsgToHTML("一致するユーザーが見つかりません");
          }
        })
        .fail(function(){
          alert('ユーザー検索に失敗しました');
        });
      } 
    });
    
    $(function(){
      $("body").on("click", ".user-search-add", function(){
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();

        appendUserTomembersList(name, user_id)
      })
    })

    $(function(){
      $("body").on("click", ".user-search-remove", function(){
        $(this).parent().remove();
      })
    })
    
});
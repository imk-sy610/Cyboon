
  $(function(){

  // 外部htmlファイルの読込
  $.ajax({
    type: 'GET',
    url: '../text/password_game.html',
    dataType: 'html',
    success: function(data) {
        $('#main').append(data);

        
     $('#main').ready(function () {

      //カードをクリックした時の処理
    $('[id^=card_]').click(function() {

      //クリックした要素のidを取得
      var selectId = $(this).attr('id');    
      
      //カードの枠線の色を変更
      $('#' + selectId).css('border-color','#FFC000');
      console.log(selectId);
  
      //配列deleteListから選択したカードを削除
      var idx = $.inArray(selectId, deleteList); //取得したidから配列の位置を検索
      if(idx >= 0){
        deleteList.splice(idx, 1); 
      }
    
      //クリックした要素のdata-idを取得し、配列に格納
      selectList[count] =  $(this).data('id');
      
      
      //選択したカードでパスワードを作成・表示
      password += selectList[count];
      $("#passwordText").html(password); 
  
  
      //パスワードの文字のアニメーション
      $('#passwordText')
      .animate({'top':'30%'},10)
      .animate({'top':'40%'},10);
  
      //カウントを増やす
      count += 1; 
  
  
      //countが3になった時の処理
      if(count == 3){
  
        //選択していないカードを画面から消す
        $.each(deleteList, function() {
          $('#'+ this).fadeOut();
        });
  
        //パスワード表示のアニメーション
        $("#passwordText").hide();
        $("#passwordText").show(300);
  
          //正解・不正解の判定
          if(password ==  rightPassword){
            //画面を黄色に変更
            $('#pcScreenImg').attr('src', 'images/PcRight.png'); 
          }
          else{
            //画面を赤に変更
            $('#pcScreenImg').attr('src', 'images/PcWrong.png');  
          }
        
      }
    });

  //クリアボタンをクリックした時の処理
  $("#clearButton").click(function(){
    
    //アニメーション
    $(this)
    .animate({'width':'300px'},10)
    .animate({'width':'400px'},20);


    if(count >= 1 && count != 3){

      //隠れていたカードを再表示する
       $.each(deleteList, function() {
           $('#'+ this).show();
       });

       //枠線の色をもとに戻す
      $(".cardsTop div,.cardsBottom div").css('border-color','#D1E1EB'); 
      //$("#passwordText").fadeOut(); //pc画面の文字を消す

      //変数と配列を初期値に戻す
      count = 0; 
      password = "";
      setDeleteList(6); 
      selectList.splice(0);

      //パスワードの表示をやめる
      $("#passwordText").html(password);      
  
    }
  
    });
  });
  


          },     
          error:function() {
              alert('問題がありました。');
          }
  });

    // $('#main').load('text.html');



  var count = 0; //クリックした回数
  var password  = ""; //作成したパスワード
  var rightPassword = "0614yoshioR99"; //正解のパスワード
  var selectList= []; //選択したカードの要素を格納
  var deleteList= []; //選択していないカードの要素を格納

  // 配列deleteListにすべてのカードのid名を格納する
  function setDeleteList(cars){

    for(let i = 0; i < cars; i++){
      var cardNum = i + 1;
      deleteList[i] = "card_" + cardNum;
    }

  }

  setDeleteList(6); //リストに6枚分のカードのidを格納

  console.log("ここまで読込ました");

});
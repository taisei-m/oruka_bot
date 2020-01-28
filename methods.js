//function test(){
//     outputLog("start");
//      var userId = "U2012df34792adf4ce94b2b36d669bd59";
//      notify_enter = get_notify_enter(userId);/////////////入室時の通知
//      if(notify_enter === "true"){
////       m1 = make_list_notify();    来た人と在室している人
//         m1 = get_fool_name(userId) + "\nが入室しました"     ///来た人のみ
//         set_notify_enter_false(userId);
//            
//        
//         count_all_userId = get_count_all_userId(); 
//             outputLog(count_all_userId);
//        for(var i=0; i<count_all_userId.length; i++){  
//          push1(CHANNEL_ACCESS_TOKEN, get_send_userId(i), m1);
//        }
//      }
//        
//        
//      }











function send_exist_room(){
     outputLog("start");
    push_exist_room();
      outputLog("push");
    set_exist_room_false();
      outputLog("delete");
  }  
  



 function oruka(reply_token){
   ///////////////////////////////////////////send_listのsend_trueを全部falseにする
   Send_list = ncmb.DataStore("send_list");
   try{
    //  outputLog("try");
    var items = Send_list.fetchAll();
    for(var i=0; i<items.length; i++ ){
        var item = items[i];
        item.set("send_true", "false");
        item.update();
      }
  }catch(e){
    outputLog("error oruka set_send_true_false" + e);
  }
   
   
   set_uzai();//なんか知らんけどレコードの一番下のexistの値に勝手にtrueが入るから強制的にfalseを入れる
   
   
   
   
   
   
   ///////////arpの方のexsit==trueのuserIdをsend_listに代入
     Arp = ncmb.DataStore("arp");
     Arp.equalTo("exist","true")
     var items = Arp.fetchAll();
     for(var i=0; i<items.length; i++){
       var userId_list = items[i].fields.userId;
       set_send_true(userId_list);
     }
     
      
     ///////////personの方のexsit_room==trueのuserIdをsend_listに代入　
     Person = ncmb.DataStore("person");
     Person.equalTo("exist_room","true")
     var items = Person.fetchAll();
     for(var i=0; i<items.length; i++){
       var userId_list = items[i].fields.userId;
       set_send_true(userId_list);
     }    
       
     //////////////////////////////send_listのsend_trueが人の名前を入れて送信
     var message = "@Y-lab.";
     Send_list = ncmb.DataStore("send_list");
        Send_list.equalTo("send_true","true")
//                 .equalTo("notify","true" )
        var items = Send_list.fetchAll();
   
   
   if(items.length == 0){
     message += "\n誰もいません"
   }

        for(var i=0; i<items.length; i++){
        message += "\n" + items[i].fields.send_name;       
        }
               
     //    var m1 = JSON.stringify(push_message_ylab);
  var url = 'https://api.line.me/v2/bot/message/push';
  reply1(CHANNEL_ACCESS_TOKEN, reply_token, message);
 
//  "U2012df34792adf4ce94b2b36d669bd59",
}        



 
function oruka_mas(reply_token){
  var exist_name = [];
  var reply_message_ylab = "@ylab";
  var reply_message_house = "@house";
  Person = ncmb.DataStore("person");
try{
  Person.equalTo("exist_room","true")
  var items = Person.fetchAll();
  for(var i=0; i<items.length; i++){
//    if(items[i].fields.userId !== "U2012df34792adf4ce94b2b36d669bd59"){
      if(items[i].fields.hwid == "012c669b82"){
        reply_message_ylab += "\n" + items[i].fields.display_name;
      }
      if(items[i].fields.hwid == "000002b868"){
        reply_message_house += "\n" + items[i].fields.display_name;
      }
//    }
  }
  m1 = reply_message_ylab;
  m2 = reply_message_house;
  
  
  reply2(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2);
 }catch(e){
   outputLog(e);
   return;
 }
    
//  "U2012df34792adf4ce94b2b36d669bd59",
}          
  
function push_exist_room(){
  var exist_name = [];
  var push_message_ylab = "ylab:";
  var push_message_house = "house:";
  Person = ncmb.DataStore("person");
try{
  Person.equalTo("exist_room","true")
  var items = Person.fetchAll();
  for(var i=0; i<items.length; i++){
    if(items[i].fields.userId !== "U2012df34792adf4ce94b2b36d669bd59"){
      if(items[i].fields.hwid == "012c669b82"){
        push_message_ylab += items[i].fields.display_name + '\n';
      }
      if(items[i].fields.hwid == "000002b868"){
        push_message_house += items[i].fields.display_name + '\n';
      }
    }
  }
    var m1 = JSON.stringify(push_message_ylab);
    var m2 = JSON.stringify(push_message_house);
  var url = 'https://api.line.me/v2/bot/message/push';
  var push_userId = "U2012df34792adf4ce94b2b36d669bd59";
  push2(CHANNEL_ACCESS_TOKEN,  m1, m2);
 }catch(e){
   outputLog(e);
   return;
 }
    
//  "U2012df34792adf4ce94b2b36d669bd59",
}        
     

function make_list_notify(){
  outputLog("method start")
  var return_message;
  Person = ncmb.DataStore("person");
  Person.equalTo("exist_room","true")
  var items = Person.fetchAll();
  for(var i=0; i<items.length; i++){
    return_message += "\n" + items[i].fields.display_name;
  }
  outputLog(return_message)
  return return_message;
}   


function reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1){
 // outputLog("methodstart");
 // outputLog(CHANNEL_ACCESS_TOKEN);
 // outputLog(m1);
 // outputLog(reply_token);
  var url = 'https://api.line.me/v2/bot/message/reply';     
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {'type': 'text',
         'text': m1,},
        
      ],
    }),
  });
        }

function reply2(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2){
  var url = 'https://api.line.me/v2/bot/message/reply';     
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {'type': 'text',
         'text': m1,},
        {'type': 'text',
         'text': m2,},
        
      ],
    }),
  });
        }

function reply3(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3){
  var url = 'https://api.line.me/v2/bot/message/reply';     
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {'type': 'text',
         'text': m1,},
        {'type': 'text',
         'text': m2,},
        {'type': 'text',
         'text': m3,},
        
      ],
    }),
  });
        }
        
  function reply4(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3, m4){
  var url = 'https://api.line.me/v2/bot/message/reply';     
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [
        {'type': 'text',
         'text': m1,},
        {'type': 'text',
         'text': m2,},
        {'type': 'text',
         'text': m3,},
        {'type': 'text',
         'text': m4,},
        
        
      ],
    }),
  });
        }
  
  function push1(CHANNEL_ACCESS_TOKEN, userId, m1){
   push_userId = "U2012df34792adf4ce94b2b36d669bd59"
   var url = 'https://api.line.me/v2/bot/message/push';
    UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': userId,
      'messages': [
        {'type': 'text',
         'text': m1}
      ],
    }),
  });
        }
  
  function push2(CHANNEL_ACCESS_TOKEN, m1, m2){
   push_userId = "U2012df34792adf4ce94b2b36d669bd59"
   var url = 'https://api.line.me/v2/bot/message/push';
    UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': push_userId,
      'messages': [
        {'type': 'text',
         'text': m1},
        {'type': 'text',
         'text': m2}
      ],
    }),
  });
        }



       

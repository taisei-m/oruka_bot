/*//封印


//linebotと繋ぐ
var CHANNEL_ACCESS_TOKEN = 'qn7G7ooyPk14r+ccerwuokY/Eh44dbrCCh18x+sTowsK+FCIEE1wYQcCaZ3+a8+oPtlsgO6GooYWRM0LbLQy5IWajmvbMIioUoGG+Uar91mMNd+EW+q7hDVS29UjbTyBdMtBi1u4YInQO7+2q2B0VwdB04t89/1O/w1cDnyilFU='; 

//spreadsheetsにjsonのログをとる
function outputLog(data) {
  var id = "1JqCp_y7eOn6e4QPlGbCXHIPnsrvU0EUE2-_-MFTmNXw";  
  var spreadSheet = SpreadsheetApp.openById(id);  
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}



//ニフクラの設定
var application_key = "b472d2ab52ea8c125dd824e2f2da7a3804263d15dd8ae9c2abfab01546e2ca4c";
var client_key = "1c6e63f8db4776114481fbc1129ab2cc59f3bf0e2faa1d0eb48e83be32cbf1d6";
var ncmb = NCMB.init(application_key, client_key);
var Test = ncmb.DataStore("test");
var test = new Test();


function doPost(e) {
     //outputLog(JSON.stringify(e))
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  } 
    
  
  var type = json.events[0].type;
  var reply_message;
  var keyword;
  var text_userId
  var beacon_hwid;
  var beacon_userId;
  var check_hwid;
  var check_keyword;
  var wifi_paswd;
  var waiting_msg;
  var reply_message;
  var reply_message_paswd;
  var reply_message_good;
  
    if(type == 'beacon'){
     beacon_hwid = json.events[0].beacon.hwid;
     beacon_userId = json.events[0].source.userId;
         outputLog("beacon_userId=" + beacon_userId);
      sleep = get_sleep(beacon_userId);
         outputLog(sleep);
      set_beacon_data(beacon_hwid, beacon_userId); 
         
      if(sleep == "true"){
      reply_message = 'ビーコンに反応したよ';
        
      
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
         'text': reply_message,},
      ],
    }),
  });
        }
      
      
      
    } else if(type == 'message'){
        
      keyword = json.events[0].message.text;
      text_userId = json.events[0].source.userId;
      if(keyword == "うるさい"||keyword == "起きて"){
        //outputLog(keyword);
        outputLog(text_userId);
      if(keyword == "うるさい"){
        set_sleep(text_userId, "false");
        　　　　reply_message = "わかったよー。通知やめる！"
         outputLog(reply_message);
      } else if(keyword == "起きて"){
        set_sleep(text_userId, "true");
        　　　　reply_message = "はーい！ ビーコンに近づいたら通知するよ";
  }  
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
         'text': reply_message,},
        
      ],
    }),
  });

        
      } else{
      
      
     text_userId = json.events[0].source.userId;
           outputLog("text_userId=" + text_userId);
     waiting_msg = '合言葉を認証中.....';
           outputLog(reply_message);
     keyword = json.events[0].message.text;
           outputLog("keyword=" + keyword);
     text_userId = json.events[0].source.userId;
           outputLog("text_userId=" + text_userId);
     check_hwid = get_hwid_by_userId(text_userId);
            outputLog("check_hwid=" + check_hwid);
     check_keyword = get_keyword_by_hwid(check_hwid);
            outputLog("check_keyword=" +  check_keyword);
     wifi_paswd = get_wifi_paswd_by_hwid(check_hwid);
            outputLog("wifi_paswd=" + wifi_paswd);      
        
      if(keyword == check_keyword){
        　reply_message = "合言葉が一致したよ！"
          reply_message_paswd = wifi_paswd;
          reply_message_good = "wi-fiのパスワードです☆"
      } else {
          reply_message = "合言葉が違うよ(笑)";
          reply_message_paswd = "もう一度入力して";
          reply_message_good =　"がんばれ！";
        outputLog(reply_message);
        outputLog(reply_message_paswd);
        outputLog(reply_message_good);
      }
    
    
  
  
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
         'text': reply_message,},
        {'type': 'text',
         'text': reply_message_paswd,},
        {'type': 'text',
         'text': reply_message_good,},
      ],
    }),
  });
}
  
 
        }

        }





/*　いらん
var a = "U45c198f192c70ee33d8e36f72c16f4ee";
var b = "U2012df34792adf4ce94b2b36d669bd59";

function main(){
    var check_hwid = get_hwid_by_userId(a);
            outputLog("check_hwid=" + check_hwid);
    var check_keyword = get_keyword_by_hwid(check_hwid);
            outputLog("check_keyword=" +  check_keyword);
    var wifi_paswd = get_wifi_paswd_by_hwid(check_hwid);
            outputLog("wifi_paswd=" + wifi_paswd);      
}
////いらん

function get_hwid_by_userId(id){
  Test.order("createDate",true)
      .equalTo("userId",id)
  var items = Test.fetchAll();
  var item = items[0];
  var result_hwid = item.fields.hwid;
     //outputLog(result_hwid);
     return result_hwid;
}

function get_keyword_by_hwid(id){
  Test = ncmb.DataStore("test");
  Test.order("createDate",true)
      .exists("keyword", true)
      .equalTo("hwid",id)
  var items = Test.fetchAll();
  var item = items[0];
  var result_keyword = item.fields.keyword;
    // outputLog(result_keyword);
     return result_keyword;
}

function get_wifi_paswd_by_hwid (id){
  Test = ncmb.DataStore("test");
  Test.order("createDate",true)
      .exists("keyword", true) 
      .equalTo("hwid",id)
      
  var items = Test.fetchAll();
  var item = items[0];
  var rson = item.fields.wifiPswd;
     //outputLog(rson);
     return(rson);
}
        
        
function set_beacon_data(hwid, userId){ 
  
  test.set("hwid", hwid)
      .set("userId", userId)
      .save() 
}
      
function get_sleep(id){
  Test = ncmb.DataStore("test");
  Test.order("createDate",true)
      .exists("sleep", true) 
      .equalTo("userId",id)
      
  var items = Test.fetchAll();
  var item = items[0];
  var wrson = item.fields.sleep;
     //soutputLog(wrson);
   
  return wrson;
   
}        
        
function set_sleep(userId, st){
  Test = ncmb.DataStore("test");
  Test.order("createDate",true)
      .exists("hwid", true)
      .equalTo("userId", userId)
      var items = Test.fetchAll();
      var item = items[0];
      item.set('sleep', st);
      item.update();
}  
  
*/ ///封印


/*

var CHANNEL_ACCESS_TOKEN = 'qn7G7ooyPk14r+ccerwuokY/Eh44dbrCCh18x+sTowsK+FCIEE1wYQcCaZ3+a8+oPtlsgO6GooYWRM0LbLQy5IWajmvbMIioUoGG+Uar91mMNd+EW+q7hDVS29UjbTyBdMtBi1u4YInQO7+2q2B0VwdB04t89/1O/w1cDnyilFU='; 


//spreadsheetsにjsonのログをとる
function outputLog(data) {
  var id = "1JqCp_y7eOn6e4QPlGbCXHIPnsrvU0EUE2-_-MFTmNXw";  
  var spreadSheet = SpreadsheetApp.openById(id);  
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}


function doPost(e) {
  outputLog(JSON.stringify(e));
  var json = JSON.parse(e.postData.contents);  
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  } 
  
  //返信する内容を作成
  var type = json.events[0].type;
  var reply_message;
    
  if(type == 'message'){
    var user_message = json.events[0].message.text;  
    if (user_message == "かっこいい") {
      reply_message = 'あなたは可愛いね！';
    }　else {
      reply_message = 'かっこいいって言って';
    }
  }else if(type == 'beacon'){
    var beacon_type = json.events[0].beacon.type;
    if(beacon_type = 'enter'){
      reply_message = 'ビーコンに反応したよ';
     var beacon_hwid = json.events[0].beacon.hwid;
     var beacon_userId = json.events[0].source.userId;
     set_beacon_data(beacon_hwid, beacon_userId);
    } else{
      reply_message = 'ちゃんと反応してないよ';
    }
  }
  
  outputLog(reply_token);
  outputLog(type);
  outputLog(typeof type);
  outputLog(user_message);
  outputLog(typeof user_message);
  outputLog(reply_message);
  outputLog(typeof reply_message);
 
  
  var url = 'https://api.line.me/v2/bot/message/reply';
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': reply_message,
      }],
    }),
  });
}





var application_key = "b472d2ab52ea8c125dd824e2f2da7a3804263d15dd8ae9c2abfab01546e2ca4c";
var client_key = "1c6e63f8db4776114481fbc1129ab2cc59f3bf0e2faa1d0eb48e83be32cbf1d6";
var ncmb = NCMB.init(application_key, client_key);
var Test = ncmb.DataStore("test");
var test = new Test();


function main(){
 //set_name("taisei");
 //get_nameByssid(100);
 //update();
  
}


function set_name(name){
  test.set("name", name)
            .save() 
  
}
function set_beacon_data(hwid, userId){ 
  
  test.set("hwid", hwid)
      .set("userId", userId)
      .save() 
}

function get_nameByssid(ssid){
  Test.order("createDate",false)
      .equalTo("name","taisei")
  var items = Test.fetchAll();
  var item = items[0];
  var rson = item.fields.name;
     outputLog(rson);
  
 
  
     
}




function update(){
  Test.order("createDate",false)
      .equalTo("name","taisei")
  var items = Test.fetchAll();
  var item = items[0];
  var rson = item.fields.name;
     outputLog(rson);
  
  item.set('name', 'takashi');
  item.update();
}




  


/*
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    "Content-Type" : 'application/json; charset=UTF-8',
    "Authorization": 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  // お作法②　下記の構造でリクエストボディにデータを持つ
  var data = {
    "replyToken" : reply_token, 
    "messages" : [{
      "type" : "text",
      "text" : user_message,
    }]
  };

  var options = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(data)
  };

  // 返信！
  return UrlFetchApp.fetch(url, options);  
}
*/ 
  

 

    
  

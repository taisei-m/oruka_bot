var data = {
  "name": "taiseisss"
}

function gcp() {
  firestore.updateDocument("exist/arp", data)
}
//////spreadsheetsにjsonのログをとる
function debuglog(data) {
  var id = spreadSheet_Id;
  var spreadSheet = SpreadsheetApp.openById(id);
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}
function userlog(data) {
  var id = set_log_Id;
  var spreadSheet = SpreadsheetApp.openById(id);
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}

function userlog(data) {
  var id = set_log_Id;
  var spreadSheet = SpreadsheetApp.openById(id);
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}


//メインメソッド
function doPost(e) {
  debuglog(JSON.stringify(e))
  userlog(JSON.stringify(e))
  //////linebotと繋ぐ
  CHANNEL_ACCESS_TOKEN = channel_access_token; //your_chennel_access_token
  ///キーの代入
  master_userId = MASTER_USERID;
  hwid_home = HWID_HOME;
  hwid_lab = HWID_LAB;

  ///前処理終わり。ここからスタート
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  var userId = json.events[0].source.userId;
  var type = json.events[0].type;
  if (typeof reply_token === 'undefined') {
    return;
  }
  
  var display_name = getUserDisplayName(userId, CHANNEL_ACCESS_TOKEN);
  var reply_message;
  var keyword;
  var beacon_hwid;
  var check_hwid; ////DBから持ってきたhwid
  var check_keyword; ////DBから持ってきたキーワード
  var wifi_paswd;
  var waiting_msg;
  var reply_message_paswd;
  var reply_message_good;
  var notify_enter;
  var all_userId = [];
  var count_all_userId;
  var m1;
  var m2;
  var m3;

  if (type == 'message') {
    keyword = json.events[0].message.text;
    
    userlog( "display_name = "+display_name +  ",  userId = "+userId + ",  keyword = " + keyword);
    create_account(type, userId, display_name);
    ////////////////////////////////////////隠し合言葉
    if (keyword == "おるか") {
      push1(CHANNEL_ACCESS_TOKEN, userId, "確認中...");
      oruka(reply_token);
    } else if (keyword == "Oi") {
      oruka_mas(reply_token);

      ///////////////////////////////////////////通知設定 自分が入室したのを他の人に通知する
    } else if (keyword == "通知設定・自分の入室を伝える") {
      var url = 'https://api.line.me/v2/bot/message/reply';
      var m2 = "";
      var notify = get_send(userId);
      if (notify == true) {
        m2 = "ONにすると、自分の入室を他の人に通知します\n\n現在の設定：ON";
      } else if (notify == false) {
        m2 = "ONにすると、自分の入室を他の人に通知します\n\n現在の設定：OFF";
      }

      return UrlFetchApp.fetch(url, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': reply_token,
          'messages': [{
            "type": "text", // ①
            "text": m2,
            //  "text": "ONにすると、自分の入室を他の人に通知します", 
            "quickReply": { // ②
              "items": [{
                  "type": "action", // ③
                  "action": {
                    "type": "postback",
                    "label": "ONにする",
                    "displayText": "ONにする",
                    "data": "通知を送る"
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "postback",
                    "label": "OFFにする",
                    "displayText": "OFFにする",
                    "data": "通知を送らない"
                  }
                }
              ]
            }
          }, ],
        }),
      });


    
    ///////////////////////////////////////////通知設定 他の人が入室した通知を受け取る
      }else if (keyword == "通知設定・入室情報を受け取る") {
      var url = 'https://api.line.me/v2/bot/message/reply';

      var m2 = "";
      var notify = get_receive(userId);

      if (notify == true) {
        m2 = "ONにすると、他の人の入室情報を受け取ります\n\n現在の設定：ON";
      } else if (notify == false) {
        m2 = "ONにすると、他の人の入室情報を受け取ります\n\n現在の設定：OFF";
      }


      return UrlFetchApp.fetch(url, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': reply_token,
          'messages': [{
            "type": "text", // ①
            "text": m2,
            "quickReply": { // ②
              "items": [{
                  "type": "action", // ③
                  "action": {
                    "type": "postback",
                    "label": "ONにする",
                    "displayText": "ONにする",
                    "data": "通知を受け取る"
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "postback",
                    "label": "OFFにする",
                    "displayText": "OFFにする",
                    "data": "通知を受け取らない"
                  }
                }
              ]
            }
          }, ],
        }),
      });


      ///////////返信まとまり
      //////////////////////////////////////////////////SSID
    } else {
      var m1 = "ごめんなさい💦その言葉は受け付けていませんm(__)m";
      var m2 = "このbotでは在室状況の確認、入室情報の送受信ができます！";
      var m3 = "メニュー画面から各機能をご使用ください！";
      reply3(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3);

    } ///keyword ==   
  
  
    }else if (type == 'beacon') { ///////////////////////////////////////////////////////////beacon
    userlog("beacon " + display_name)
    beacon_hwid = json.events[0].beacon.hwid;
  
 
//    set_beacon_data(beacon_hwid, userId, display_name);
//    //sleep = get_sleep(userId);
//    set_beacon_data_log(beacon_hwid, userId, display_name);
    
    
    /////////////入室通知を送っていいかどうか。トリガー定期実行で6時間ごとにtrueが入るようにしている
    var notify_enter = get_notify_enter(userId); 
    
    /////////////本人が送る設定にしているかどうか
    var send_notifications = get_send_notifications(userId);
    
    if (notify_enter == true && send_notifications == true) {
    
       ////////通知送ったらfalseにしてビーコンに反応する度に通知を送るのを防いでいる
       set_notify_enter(userId, false); 
    
       /////////////マスターへのメッセージの送信・メッセージの作成
       var date = new Date();
       var time = Utilities.formatDate( date, 'Asia/Tokyo', 'MM/dd/HH:mm');
     
       var name = get_fool_name(userId);

// 研究室にラズパイ負いておるか用、家にlinebeacon負いてるのうち用にしとったけど、研究室にlinebeacon奥から一時的にコメントアウトしてる    
//       if (beacon_hwid == hwid_home) {
//         m2 = "@house \n" + get_fool_name(userId) + "\nが入室しました"; ///来た人のみ
//         push1(CHANNEL_ACCESS_TOKEN, master_userId, m2);
//       } else if (beacon_hwid == hwid_lab) {
      if(beacon_hwid == hwid_home ) {
         m1 = "@Y-lab.  " + time + "\n" + name + "\nが入室しました";///来た人のみ
         debuglog(m1);
       }
    //////通知を受け取る設定にしている人のuserIdを取得する
    var count_all_userId = get_count_all_userId(); 
      for (var i = 0; i < count_all_userId.length; i++) {
        push1(CHANNEL_ACCESS_TOKEN, count_all_userId[i], m1);
      }
    }



    //////////////////////////////////////////////////////////////////////////////postback
  } else if (type == "postback") {
    postbackdata = json.events[0].postback.data;
    if (postbackdata == "通知を送る") {
      set_send_notification(userId, true);
      m1 = "ONにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    } else if (postbackdata == "通知を送らない") {
      set_send_notification(userId, false);
      m1 = "OFFにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    }
    postbackdata = json.events[0].postback.data;
    if (postbackdata == "通知を受け取る") {
      set_receive_notification(userId, true);
      m1 = "ONにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    } else if (postbackdata == "通知を受け取らない") {
      set_receive_notification(userId, false);
      m1 = "OFFにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    }



    //////////////////////////////////////////////////////////////////////////////////message
  }   //type ==
} //post
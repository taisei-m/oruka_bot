//////spreadsheetsにjsonのログをとる
function outputLog(data) {
  var id = spreadSheet_Id;
  var spreadSheet = SpreadsheetApp.openById(id);
  var sheetName = "シート1";
  spreadSheet.getSheetByName(sheetName).appendRow(
    [new Date(), data]
  );
}


//メインメソッド
function doPost(e) {
  //////linebotと繋ぐ
  CHANNEL_ACCESS_TOKEN = channel_access_token; //your_chennel_access_token
  ///キーの代入
  master_userId = MASTER_USERID;
  hwid_home = HWID_HOME;
  hwid_lab = HWID_LAB;

  ///前処理終わり。ここからスタート
  outputLog(JSON.stringify(e))
  var json = JSON.parse(e.postData.contents);
  var reply_token = json.events[0].replyToken;
  var userId = json.events[0].source.userId;
  if (typeof reply_token === 'undefined') {
    return;
  }


  var type = json.events[0].type;
  var reply_message;
  var keyword;
  var beacon_hwid;
  var display_name;
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

  if (type == 'beacon') { ///////////////////////////////////////////////////////////beacon

    beacon_hwid = json.events[0].beacon.hwid;
    display_name = getUserDisplayName(userId, CHANNEL_ACCESS_TOKEN);
    set_beacon_data(beacon_hwid, userId, display_name);
    sleep = get_sleep(userId);
    set_beacon_data_log(beacon_hwid, userId, display_name);


    var notify_enter = get_notify_enter(userId); /////////////入室通知を送っていいかどうか。トリガー定期実行で6時間ごとにtrueが入るようにしている
    var notify_send_list = get_notify_from_send_list(userId);

    if (beacon_hwid == hwid_home) {
      m2 = "@house \n" + get_fool_name(userId) + "\nが入室しました" ///来た人のみ
      push1(CHANNEL_ACCESS_TOKEN, master_userId, m2)
    } else if (beacon_hwid = hwid_lab) {
      m1 = "@Y-lab.\n" + get_fool_name(userId) + "\nが入室しました" ///来た人のみ
    }

    if (notify_enter === "true" && notify_send_list === "true") {
      set_notify_enter_false(userId); //通知送ったらfalseにしてビーコンに反応する度に通知を送るのを防いでいる

      count_all_userId = get_count_all_userId(); //通知を受け取る設定にしている人のuserIdを取得する
      for (var i = 0; i < count_all_userId.length; i++) {
        push1(CHANNEL_ACCESS_TOKEN, get_send_userId(i), m1);
      }
    }



    //////////////////////////////////////////////////////////////////////////////postback
  } else if (type == "postback") {
    postbackdata = json.events[0].postback.data;
    if (postbackdata == "通知を送る") {
      set_notify_true(userId);
      set_sleep(userId, "true");
      set_sleep_log(userId, "true", keyword);
      m1 = "ONにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    } else if (postbackdata == "通知を送らない") {
      set_notify_false(userId);
      set_sleep(userId, "false");
      set_sleep_log(userId, "false", keyword);
      m1 = "OFFにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    }
    postbackdata = json.events[0].postback.data;
    if (postbackdata == "通知を受け取る") {
      set_notify_rece_true(userId);
      m1 = "ONにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    } else if (postbackdata == "通知を受け取らない") {
      set_notify_rece_false(userId);
      m1 = "OFFにしました";
      reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1);
    }



    //////////////////////////////////////////////////////////////////////////////////message
  } else if (type == 'message') {
    keyword = json.events[0].message.text;
    display_name = getUserDisplayName(userId, CHANNEL_ACCESS_TOKEN);

    set_message_data_log(userId, keyword, display_name);
    set_message_data(userId, display_name);
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
      var notify = get_notify(userId);
      if (notify == "true") {
        m2 = "ONにすると、自分の入室を他の人に通知します\n\n現在の設定：ON";
      } else if (notify == "false") {
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


    }
    ///////////////////////////////////////////通知設定 他の人が入室した通知を受け取る
    else if (keyword == "通知設定・入室情報を受け取る") {
      var url = 'https://api.line.me/v2/bot/message/reply';

      var m2 = "";
      var notify = get_send_push_notify(userId);

      if (notify == "true") {
        m2 = "ONにすると、他の人の入室情報を受け取ります\n\n現在の設定：ON";
      } else if (notify == "false") {
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
  } //type ==
} //post
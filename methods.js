function send_exist_room() {
  outputLog("start");
  push_exist_room();
  outputLog("push");
  set_exist_room_false();
  outputLog("delete");
}

<<<<<<< HEAD
function test(){
  var date = new Date();
  var time = Utilities.formatDate( date, 'Asia/Tokyo', 'MM/dd hh:mm')
=======
function test() {
  var date = new Date();
  var time = Utilities.formatDate(date, 'Asia/Tokyo', 'MM/dd hh:mm')
>>>>>>> d57f3392af3c8eb53e5c596cfcb37cac1fcf27a3
  debuglog(time);
}


function oruka(reply_token) {
  //////////////////////////////send_listのsend_trueが人の名前を入れて送信
<<<<<<< HEAD
  var message = "@Y-lab.\n";  
  var firebase_get = firestore.getDocument("exist/arp");
  var arp_exist = firebase_get.fields.exist_hard;
  if(arp_exist == ""){
=======
  var message = "@Y-lab.\n";
  var firebase_get = firestore.getDocument("exist/arp");
  var arp_exist = firebase_get.fields.exist_hard;
  if (arp_exist == "") {
>>>>>>> d57f3392af3c8eb53e5c596cfcb37cac1fcf27a3
    message += "誰もいません";
  } else {
    message += arp_exist;
  }
  var url = 'https://api.line.me/v2/bot/message/push';
  reply1(CHANNEL_ACCESS_TOKEN, reply_token, message)
}




function oruka_mas(reply_token) {
  var exist_name = [];
  var reply_message_ylab = "@ylab";
  var reply_message_house = "@house";
  Person = ncmb.DataStore("person");
  try {
    Person.equalTo("exist_room", "true")
    var items = Person.fetchAll();
    for (var i = 0; i < items.length; i++) {
      if (items[i].fields.hwid == hwid_lab) {
        reply_message_ylab += "\n" + items[i].fields.display_name;
      }
      if (items[i].fields.hwid == hwid_home) {
        reply_message_house += "\n" + items[i].fields.display_name;
      }
    }
    m1 = reply_message_ylab;
    m2 = reply_message_house;

    reply2(channel_access_token, reply_token, m1, m2);
  } catch (e) {
    outputLog(e);
    return;
  }
}

function push_exist_room() {
  var exist_name = [];
  var push_message_ylab = "ylab:";
  var push_message_house = "house:";
  Person = ncmb.DataStore("person");
  try {
    Person.equalTo("exist_room", "true")
    var items = Person.fetchAll();
    for (var i = 0; i < items.length; i++) {
      if (items[i].fields.userId !== master_userId) {
        if (items[i].fields.hwid == hwid_lab) {
          push_message_ylab += items[i].fields.display_name + '\n';
        }
        if (items[i].fields.hwid == hwid_home) {
          push_message_house += items[i].fields.display_name + '\n';
        }
      }
    }
    var m1 = JSON.stringify(push_message_ylab);
    var m2 = JSON.stringify(push_message_house);
    var url = 'https://api.line.me/v2/bot/message/push';
    var push_userId = master_userId;
    push2(CHANNEL_ACCESS_TOKEN, m1, m2);
  } catch (e) {
    outputLog(e);
    return;
  }
}

function make_list_notify() {
  outputLog("method start")
  var return_message;
  Person = ncmb.DataStore("person");
  Person.equalTo("exist_room", "true")
  var items = Person.fetchAll();
  for (var i = 0; i < items.length; i++) {
    return_message += "\n" + items[i].fields.display_name;
  }
  return return_message;
}



function reply1(CHANNEL_ACCESS_TOKEN, reply_token, m1) {
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
          'text': m1,
        },

      ],
    }),
  });
}

function reply2(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2) {
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
          'text': m1,
        },
        {
          'type': 'text',
          'text': m2,
        },

      ],
    }),
  });
}

function reply3(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3) {
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
          'text': m1,
        },
        {
          'type': 'text',
          'text': m2,
        },
        {
          'type': 'text',
          'text': m3,
        },

      ],
    }),
  });
}

function reply4(CHANNEL_ACCESS_TOKEN, reply_token, m1, m2, m3, m4) {
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
          'text': m1,
        },
        {
          'type': 'text',
          'text': m2,
        },
        {
          'type': 'text',
          'text': m3,
        },
        {
          'type': 'text',
          'text': m4,
        },


      ],
    }),
  });
}

function push1(CHANNEL_ACCESS_TOKEN, userId, m1) {
  push_userId = master_userId
  var url = 'https://api.line.me/v2/bot/message/push';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': userId,
      'messages': [{
        'type': 'text',
        'text': m1
      }],
    }),
  });
}

function push2(CHANNEL_ACCESS_TOKEN, m1, m2) {
  push_userId = master_userId
  var url = 'https://api.line.me/v2/bot/message/push';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': push_userId,
      'messages': [{
          'type': 'text',
          'text': m1
        },
        {
          'type': 'text',
          'text': m2
        }
      ],
    }),
  });
}
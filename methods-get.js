function get_send(id) {
  const firebase_get = firestore.query("person").where("userId", "==", id).execute();
  var got_notify = firebase_get[0].fields.setting.send_notifications;
  return got_notify;
}


function get_fool_name(id) {
  const firebase_get = firestore.query("person").where("userId", "==", id).execute();
  var got_notify = firebase_get[0].fields.display_name;
  return got_notify;
}

function get_good_where(id) {
  Master.equalTo("hwid", id)
  var items = Master.fetchAll();
  var item = items[0];
  var result_hwid = item.fields.field_name;
  return result_hwid;
}


function get_hwid_by_userId(id) {
  Person.equalTo("userId", id)
  var items = Person.fetchAll();
  var item = items[0];
  var result_hwid = item.fields.hwid;
  return result_hwid;
}


function get_receive(id) {
  const firebase_get = firestore.query("person").where("userId", "==", id).execute();
  var got_notify = firebase_get[0].fields.setting.receive_notifications;
  return got_notify;
}


function get_send_notifications(id) {
  const firebase_get = firestore.query("person").where("userId", "==", id).execute();
  var got_notify = firebase_get[0].fields.setting.send_notifications;
  return got_notify;
}


function get_ssId_by_hwid(id) {
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid", id)
  var items = Master.fetchAll();
  var item = items[0];
  var rson = item.fields.ssid;
  return (rson);
}


function get_name_by_hwid(id) {
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid", id)
  var items = Master.fetchAll();
  var item = items[0];
  var rson = item.fields.field_name;
  return (rson);
}


function get_keyword_by_hwid(id) {
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid", id)
  var items = Master.fetchAll();
  var item = items[0];
  var result_keyword = item.fields.keyword;
  return result_keyword;
}


function get_wifi_paswd_by_hwid(id) {
  Master = ncmb.DataStore("master");
  Master.equalTo("hwid", id)
  var items = Master.fetchAll();
  var item = items[0];
  var rson = item.fields.wifiPswd;
  return (rson);
}



function get_count_all_userId() {
  const firebase_get = firestore.getDocuments("person");
  var send_list = [];
<<<<<<< HEAD
  for (var i = 0; i<firebase_get.length; i++){   
    if(firebase_get[i].fields.setting.receive_notifications){
=======
  for (var i = 0; i < firebase_get.length; i++) {
    if (firebase_get[i].fields.setting.receive_notifications) {
>>>>>>> d57f3392af3c8eb53e5c596cfcb37cac1fcf27a3
      send_list.push(firebase_get[i].fields.userId);
    }
  }
  return send_list;
}


function get_notify_enter(id) {
  const firebase_get = firestore.query("person").where("userId", "==", id).execute();
  var got_notify_enter = firebase_get[0].fields.setting.notify_enter;
  return got_notify_enter;
}


function get_sleep(id) {
  Person = ncmb.DataStore("person");
  Person.equalTo("userId", id)
  var items = Person.fetchAll();
  var item = items[0];
  var wrson = item.fields.sleep;
  return wrson;
}


function get_date(id) {
  Person = ncmb.DataStore("person");
  Person.equalTo("userId", id)
  var items = Person.fetchAll();
  var item = items[0];
  var data = [];
  data = item.fields.updateDate;
  var hour = Number((data[11]) + (data[12])) + 9;
  data_send = data[5] + data[6] + "/" + data[8] + data[9] + "/" + hour + ":" + data[14] + data[15];
  return data_send;
}


function get_send_userId(i) {
  var message;
  Person = ncmb.DataStore("person");
  Person.equalTo("send_push_notify", "true")
  var items = Person.fetchAll();
  message = items[i].fields.userId;
  return message;
}


function getUserDisplayName(user_id, CHANNEL_ACCESS_TOKEN) {
  var line_endpoint_profile = 'https://api.line.me/v2/bot/profile';
  var res = UrlFetchApp.fetch(line_endpoint_profile + '/' + user_id, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'get',
  });
  var h = JSON.parse(res).displayName;
  return h;
}
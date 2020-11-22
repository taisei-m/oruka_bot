function set_uzai() {
  Send_list = ncmb.DataStore("arp");
  Send_list.equalTo("userId", "0000")
  var items = Send_list.fetchAll();
  var item = items[0];
  item.set("exist", "false");
  item.update();
}


function set_send_true(id) {
  Send_list = ncmb.DataStore("send_list");
  Send_list.equalTo("userId", id)
  var items = Send_list.fetchAll();
  var item = items[0];
  item.set("send_true", "true");
  item.update();
}


function set_send_false() {
  Send_list = ncmb.DataStore("send_list");
  var items = Send_list.fetchAll();
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    item.set("send_true", "false");
    item.update();
  }
}


function set_notify_enter(userId, boolean) {
    var search = firestore.query("person").where("userId", "==", userId).execute();
    var document_data = search[0].name.split('/');
    var document_name = document_data[6];
    var data_update = search[0].fields;
    ////上書き処理
    data_update.setting.notify_enter = boolean;
  
    firestore.updateDocument("person/" + document_name, data_update);
}




function set_notify_enter_true(userId) {
    var search = firestore.getDocuments("person");
    debuglog(JSON.stringify(search));
  for(var i = 0; i<search.length; i++){
    var document_data = search[i].fields;
    var document_name = search[i].name.split('/')[6];
    ////上書き処理
    document_data.setting.notify_enter = true;
    firestore.updateDocument("person/" + document_name, document_data);
  }
}



function set_beacon_data(hwid, userId, display_name) {
  Person = ncmb.DataStore("person");
  try {
    Person.equalTo("userId", userId)
    var items = Person.fetchAll();
    var item = items[0];
    item.set('hwid', hwid);
    item.set('display_name', display_name);
    item.set("exist_room", "true");
    item.update();
  } catch (e) {
    person.set("hwid", hwid)
      .set("userId", userId)
      .set("sleep", "true")
      .set('display_name', display_name)
      .set('exist_room', "true")
      .set('notify_enter', "true")
      .save()
    return;
  }
}


function set_exist_room_false() {
  Person = ncmb.DataStore("person");
  try {
    Person.equalTo("exist_room", "true")
    var items = Person.fetchAll();
    var length = items.length;
    outputLog(length);
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.set("exist_room", "false");
      item.update();
    }
  } catch (e) {
    return;
  }
}



function create_account(type, userId, display_name) {
    var search = firestore.query("person").where("userId", "==", userId).execute();
  if(search == ""){
    var data_new = {
      display_name: display_name,
      exist_arp: false,
      exist_room: false,
      exist_beacon: false,
      mac_pc: "",
      mac_phone: "",
      userId: userId,
      setting: {
        receive_notifications: true,
        send_notifications: true,
        check_connection: false,
        notify_enter: true        
      }
    }
    firestore.createDocument("person", data_new);
  } else {
    var document_data = search[0].name.split('/');
    var document_name = document_data[6];
    var data_update = search[0].fields;
    data_update.display_name = display_name;
    firestore.updateDocument("person/" + document_name, data_update);
    }
}


function set_beacon_data_log(hwid, userId, display_name) {
  person_log.set("hwid", hwid)
    .set("userId", userId)
    .set('display_name', display_name)
    .save()
}

function set_message_data_log(userId, message, display_name) {
  person_log.set("userId", userId)
    .set('message', message)
    .set('display_name', display_name)
    .save()
}


function set_sleep(userId, sleep) {
  Person = ncmb.DataStore("person");
  Person.equalTo("userId", userId)
  var items = Person.fetchAll();
  var item = items[0];
  item.set('sleep', sleep);
  item.update();
}


function set_sleep_log(userId, sleep) {
  person_log.set("sleep", sleep)
    .set("userId", userId)
    .save()
}




function set_send_notification(userId, boolean) {
    var search = firestore.query("person").where("userId", "==", userId).execute();
    debuglog(JSON.stringify(search));
 
    var document_data = search[0].name.split('/');
    var document_name = document_data[6];
    var data_update = search[0].fields;
    ////上書き処理
    data_update.setting.send_notifications = boolean;
  
    firestore.updateDocument("person/" + document_name, data_update);
}


function set_receive_notification(userId, boolean) {
    var search = firestore.query("person").where("userId", "==", userId).execute();
 
    var document_data = search[0].name.split('/');
    var document_name = document_data[6];
    var data_update = search[0].fields;
    ////上書き処理
    data_update.setting.receive_notifications = boolean;
  
    firestore.updateDocument("person/" + document_name, data_update);
}



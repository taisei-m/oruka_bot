////keys
//line
var channel_access_token = 'qn7G7ooyPk14r+ccerwuokY/Eh44dbrCCh18x+sTowsK+FCIEE1wYQcCaZ3+a8+oPtlsgO6GooYWRM0LbLQy5IWajmvbMIioUoGG+Uar91mMNd+EW+q7hDVS29UjbTyBdMtBi1u4YInQO7+2q2B0VwdB04t89/1O/w1cDnyilFU=';
var MASTER_USERID = "U2012df34792adf4ce94b2b36d669bd59";
var HWID_HOME = "000002b868";
var HWID_LAB = "012c669b82";
//spreadSheet
var spreadSheet_Id = "1JqCp_y7eOn6e4QPlGbCXHIPnsrvU0EUE2-_-MFTmNXw";
//ニフクラ
var application_key = "b472d2ab52ea8c125dd824e2f2da7a3804263d15dd8ae9c2abfab01546e2ca4c";
var client_key = "1c6e63f8db4776114481fbc1129ab2cc59f3bf0e2faa1d0eb48e83be32cbf1d6";

////共通変数定義
var CHANNEL_ACCESS_TOKEN; 
var master_userId;
var hwid_home;
var hwid_lab;

////ニフクラの設定
var ncmb = NCMB.init(application_key, client_key);
var Test = ncmb.DataStore("test");
var Master = ncmb.DataStore("master");
var Person = ncmb.DataStore("person");
var Send_list = ncmb.DataStore("send_list");
var Person_log = ncmb.DataStore("person_log");
var master = new Master();
var person = new Person();
var send_list = new Send_list();
var person_log = new Person_log();

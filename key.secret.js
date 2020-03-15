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

//firebase
var email = "firebase-adminsdk-tqv6n@oruka-19d46.iam.gserviceaccount.com";
var key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+khj2uh2wQce+\nDZxx2RtcpVkjN5utzy+soC0GgipTS8T7X7KcQXArzw2bztREhtekG0vtwzkBO/OC\nRjGxXs8xRzfAaD5NthWchd5iqej3S586XL2DxfZ1v0g7umdqiqMdWbGNE1XklFs+\nfGEUDx2Ud+Mf43+ySlpVEkyuwmMbqjGFwINoFVj4ka8fQXkaNqFcX6UAN+dZTS9S\nneXk3sl8v9RsfRieDw2u5dcgoFp7esTjVMwZj+OuDN5rurvOt4wlE64Qf/1/HBZr\nZyXaTGpnXnFw3qgGKc/IFLsDUDGZh2rZq5aU2Q6DSDeNJbJyCKZMQuDSoA2qLdSk\nR2yp8wTLAgMBAAECggEARfBwYPxlMO6zU7jDFbVMKXA1ios6A0vqfzw5yg2zYuaH\n4Il6j4YkmK9gmzIJDS0/rualsxjWrvFFqSYBzsqw17D/cQnQ88xDmjI3L5aT/U4v\nncezdc0NaqFM7T63/Y3r1zW3x8K03zLjWcdkCWySuo5VOLrRfqlzBY21vt1wahIl\nSa6TagDkYKqhJ8pJoxU8gMTFj0RyHjZRbrHWTe6m9tmT2MhVzJdur7Olz0Plyoj5\ntEREiKLFroYlTEF4XIAlpwizuo2syi32OjXjifIOEGnErfctQSzl8alTKJmtoeOz\nLDUwrmi6GYI0d2Pl5WQkb0l3px3uGK4HqJG5pzgYAQKBgQDyvXHfsHbD8cbSWzRv\n9x1066ZX8ifIH73FAgBD7k8e+FGpGl/b2vqOHeWqiPLcYymVIL/m5wg6Z+cUvivm\nEFdCnccBUXgo6YZj7ErrgyRl4vrDUYMcsb65sq1Ous27cZTILCpouxYCeWVPTJMp\ncCVa0A9X46B7nQAl6mqu7FCzAQKBgQDI+xmUgxRRUQ2Dt4o7XD7FbnQtjKhwQhzv\nu3w+Yk6PbIpTJTI92+4wYx+JE2F8aKAo2Y0CsRxvJWjjEb+pRmVfjFc/FRnjknKR\nq3i5NshlOE+H5Lvw6JjSEKS4rw//a6tlq2ojCn6f4DPnxFYbv2hSDDXYXwmQBc/N\nZP8pBKwTywKBgQDbLB6zoLu7tISWzu8L4Y5hUZzCb81nrvFD/siKjZQ3HHNvQncn\nJhNxWqFSV5EhWQ/krMtZC2WshsBpRESS2FJRvfA/ynW6SxCjDGmhOKoWrNlKnkDK\nGdtiBGjjW1wDUUzLaMVqBvKajU3iSfveQHoaAx63droiouHNWlm1U36SAQKBgF0Y\nWtf9A6tLBRyPJvuqFfVz3WK/9cHSDf9J9BodhVBQMZ6j6yrWNfW55IClNpHfENj7\nNKMbkRU22efcb9AkKI7ivgMdbhmI24L4T3pTku238Lb8z8WeqDMdvH9DsABbSlBU\n31wN32uE+eYQfuZpehQPTd3E3/QTjRcSAlNos6CTAoGALm6BnsoSQeFc5mECOgb8\nEL6QKLu6nKBTSg/n/G/O1cxI9FJYwG6aPDpTuiG6zZWPQNkT0y5ePQjyyIr7xRsz\nG+fO78RL0DBUZGiI7YMO0rdGO2/0uNL96dvn9aByQDT6tTAkSGpTHeILpW2rbR5v\niSgkHkTRELGFf3RKYOhpTU8=\n-----END PRIVATE KEY-----\n";
var projectId = "oruka-19d46";
var firestore = FirestoreApp.getFirestore(email, key, projectId);

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


function test(){
const test = ncmb.Object('role');
test
  .set('msg', 'こんにちは、世界！')
  .save();
}
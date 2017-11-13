// ==UserScript==
// @name         YTS
// @namespace    https://github.com/fcannizzaro/yts
// @version      1.0
// @description  Sync Youtube video playback (firebase)
// @author       Francesco Cannizzaro (fcannizzaro)
// @require      https://www.gstatic.com/firebasejs/4.6.2/firebase.js
// @require      https://raw.githubusercontent.com/fcannizzaro/yts/master/yts.js
// @match        https://www.youtube.com/watch*
// ==/UserScript==

const API_KEY = "<api-key>";
const DATABASE_URL = "https://<database-url>.firebaseio.com";
sync(API_KEY, DATABASE_URL);
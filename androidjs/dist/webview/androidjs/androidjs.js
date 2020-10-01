var app=function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";var n=o(1),r=o(2),i=o(3),a=o(4),d=o(5),s=o(6),c=o(7),u=o(8),l=o(9),f=o(10),p=o(11),w=o(12),h=o(13);t.exports={camera:n,microphone:r,call:i,hotspot:a,notification:d,toast:s,wifi:c,contact:l,deeplink:f,sms:p,getPath:u.getPath,reload:u.reload,loadURL:u.loadURL,location:w,mobiledata:h}},function(t,e,o){"use strict";var n=function(){function t(){this.mediaRecorder=null,this.recordedBlobs=[],this.canvas=document.createElement("canvas"),this.stream=null}return t.prototype.init=function(t,e){null!=this.stream&&this.stopMediaTracks(this.stream),navigator.getUserMedia(e,function(e){this.stream=e,t.srcObject=e},function(t){throw console.log(t),t})},t.prototype.handleDataAvailable=function(t){t.data&&t.data.size>0&&this.recordedBlobs.push(t.data)},t.prototype.startRecording=function(t){this.recordedBlobs=[];try{this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(e){console.log("Unable to create MediaRecorder with options Object: ",t,e);try{t={mimeType:"video/webm;codecs=vp8",bitsPerSecond:1e5},this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(e){console.log("Unable to create MediaRecorder with options Object: ",t,e);try{t="video/mp4",this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(t){return alert("MediaRecorder is not supported by this browser."),void console.error("Exception while creating MediaRecorder:",t)}}}this.mediaRecorder.ondataavailable=this.handleDataAvailable,this.mediaRecorder.start()},t.prototype.stopRecording=function(){this.mediaRecorder.stop()},t.prototype.saveRecording=function(t,e,o){var n=new Blob(this.recordedBlobs,o);this.saveCameraBlob(t,e,n)},t.prototype.previewRecording=function(t,e){t.controls=!0;var o=new Blob(this.recordedBlobs,e);t.src=window.URL.createObjectURL(o)},t.prototype.saveCameraBlob=function(t,e,o){var n=new FileReader;n.onload=function(){2==n.readyState&&(front.send("androidjs:saveBlob",t,e,n.result,"video"),console.log("saving "+JSON.stringify({filename:e,size:o.size})))},n.readAsArrayBuffer(o)},t.prototype.getDevices=function(t){var e=[];navigator.mediaDevices.enumerateDevices().then(function(o){for(var n=0;n<o.length;n++)"videoinput"===o[n].kind&&e.push(o[n].deviceId);t(e)})},t.prototype.stopMediaTracks=function(t){t.getTracks().forEach(function(t){t.stop()})},t.prototype.getBuffer=function(t,e){var o=new Blob(this.recordedBlobs,t),n=new FileReader;n.onload=function(){2==n.readyState&&e(n.result)},n.readAsArrayBuffer(o)},t.prototype.takePhoto=function(t,e){this.canvas.width=t.videoWidth,this.canvas.height=t.videoHeight,this.canvas.getContext("2d").drawImage(t,0,0),null!=e&&(e.src=this.canvas.toDataURL("image/webp"))},t.prototype.savePhoto=function(t,e){var o=this.canvas.toDataURL("image/webp").replace(/^data:image\/\w+;base64,/,"");front.send("androidjs:saveBlob",t,e,o,"image"),console.log("saving file")},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){this.mediaRecorder=null,this.recordedBlobs=[],this.stream=null}return t.prototype.handleDataAvailable=function(t){t.data&&t.data.size>0&&this.recordedBlobs.push(t.data)},t.prototype.stopMediaTracks=function(t){t.getTracks().forEach(function(t){t.stop()})},t.prototype.startRecording=function(t){null!=this.stream&&this.stopMediaTracks(this.stream),navigator.getUserMedia(t,function(t){this.stream=t,this.mediaRecorder=new MediaRecorder(t),this.mediaRecorder.ondataavailable=this.handleDataAvailable,this.mediaRecorder.start()},function(t){throw console.log(t),t})},t.prototype.stopRecording=function(){this.mediaRecorder.stop()},t.prototype.previewRecording=function(t,e){t.controls=!0;var o=new Blob(this.recordedBlobs,e);t.src=URL.createObjectURL(o)},t.prototype.saveRecording=function(t,e,o){var n=new Blob(this.recordedBlobs,o);this.saveAudioBlob(t,e,n)},t.prototype.saveAudioBlob=function(t,e,o){var n=new FileReader;n.onload=function(){2==n.readyState&&(front.send("androidjs:saveBlob",t,e,n.result,"audio"),console.log("saving "+JSON.stringify({filename:e,size:o.size})))},n.readAsArrayBuffer(o)},t.prototype.getBuffer=function(t,e){var o=new Blob(this.recordedBlobs,t),n=new FileReader;n.onload=function(){2==n.readyState&&e(n.result)},n.readAsArrayBuffer(o)},t.prototype.getDevices=function(t){var e=[];navigator.mediaDevices.enumerateDevices().then(function(o){for(var n=0;n<o.length;n++)"audioinput"==o[n].kind&&e.push(o[n].deviceId);t(e)})},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.makeCall=function(t){window.android.makeCall(t)},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.enable=function(t){window.android.enableHotspot(t)},t.prototype.disable=function(){window.android.disableHotspot()},t.prototype.isEnabled=function(){return window.android.isHotspotEnabled()},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.init=function(t,e){window.android.initNotification(t,e)},t.prototype.initBig=function(t,e){if("string"==typeof e)throw"Error: second parameter of initBig() should be an array of strings";window.android.initBigNotification(t,e)},t.prototype.show=function(t){window.android.showNotification(t)},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.show=function(t,e){window.android.showToast(t,e)},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.enable=function(){window.android.enableWifi()},t.prototype.disable=function(){window.android.disableWifi()},t.prototype.disconnect=function(){window.android.disconnectWifi()},t.prototype.getState=function(){return window.android.getWifiState()},t.prototype.isEnabled=function(){return window.android.isWifiEnabled()},t.prototype.getScanResults=function(){return JSON.parse(window.android.getWifiScanResults())},t.prototype.connect=function(t,e){window.android.connectWifi(t,e)},t}();t.exports=new n},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getPath=function(t){return window.android.getPath(t)},e.loadURL=function(t){location.href=t},e.reload=function(){location.reload()}},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.getAll=function(){return JSON.parse(window.android.getAllContacts())},t.prototype.getCount=function(){return window.android.getContactsCount()},t.prototype.getByName=function(t){return JSON.parse(window.android.getContactByName(t))},t.prototype.add=function(t,e,o){return null==t&&(t=null),null==e&&(e=null),null==o&&(o=null),JSON.parse(window.android.addContact(t,e,o))},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.getLink=function(){return window.android.getDeepLink()},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.send=function(t,e){return JSON.parse(window.android.sendSMS(t,e))},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.get=function(){return JSON.parse(window.android.getLocation())},t}();t.exports=new n},function(t,e,o){"use strict";var n=function(){function t(){}return t.prototype.isEnabled=function(){return window.android.isMobileDataEnabled()},t}();t.exports=new n}]);
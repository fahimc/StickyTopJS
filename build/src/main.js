(function(window) {
 function Main() {
 if(window.addEventListener) {
 window.addEventListener("load", onLoad);
 } else {
 window.attachEvent("onload", onLoad);
 }
 
 }
 function onLoad() {
		var stickyTop = new StickyTop();
		stickyTop.addElementById("sticky");
		stickyTop.addListener("onsticky",onSticky);
		stickyTop.addListener("offsticky",offSticky);
		
 }
 function onSticky()
 {
 	console.log("onSticky");
 }
 function offSticky()
 {
 	console.log("offSticky");
 }
 Main();
 }
 )(window);

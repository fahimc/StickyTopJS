StickyTopJS
===========
#About
This Class makes objects stick to the top of the page once it reaches the top.  

#Usage

1. Include the StickTopJS in the HTML page.

```
 <script type="text/javascript" src="src/StickyTop.js"></script>
```

2. Create a Script file which waits for the page to load like body onload method or JQuery 'ready'. Then create an instance of StickTop.  
```
...
function onLoad() {
  	var stickyTop = new StickyTop();
}
...
```

3. Add the Element you wish to make sticky. Use the 'addElementById' method and provide the id of your element.

```
var stickyTop = new StickyTop();
stickyTop.addElementById("sticky");
...
```

4. Thats it!! now the Class will handle resize and when the element becomes sticky then a class name is added to the element called 'stickyTop'. You can use this to change the elements styling.

#Options

1. Add Callbacks for when the element becomes stick or not sticky.

###event names 
* onsticky  
* offsticky  

###addListener Method
```
stickyTop.addListener(eventName:String,callback:Function);
```

###removeListener Method
```
stickyTop.removeListener (eventName:String,callback:Function);
```

##Example

```
stickyTop.addListener("onsticky",onSticky);
stickyTop.addListener("offsticky",offSticky);

function onSticky()
 {
 	console.log("onSticky");
 }
 function offSticky()
 {
 	console.log("offSticky");
 }
```

var StickyTop = function() {
	this.init();
};
(function() {
	var _ = StickyTop.prototype;
	
	_.events=
	{
		ON_STICKY:"onsticky",
		OFF_STICKY:"offsticky"
	}
	_.classNames=
	{
		STICKY:"stickyTop"
	}
	_.defaultCSS=
	{
		position:"",
		top:""
	}
	_.stickyItems=[];
	_.callbacks=[];
	_.init = function() {
		
		
		//add resize listener
		var root=this;
		if (window.addEventListener) {
			window.addEventListener("resize", function(){root.resize()});
		} else {
			window.attachEvent("onresize", function(){root.resize()});
		}
		if (window.addEventListener) {
			window.addEventListener("scroll", function(){root.scroll()});
		} else {
			window.attachEvent("onscroll", function(){root.scroll()});
		}
		this.resize();
	}
	_.addListener=function(eventName,callback)
	{
		if(!this.callbacks[eventName])this.callbacks[eventName]=[];
		this.callbacks[eventName].push(callback);
	}
	_.removeListener=function(eventName,callback)
	{
		if(!this.callbacks[eventName])return;
		for(var a=0;a<this.callbacks[eventName].length;a++)
		{
			if(this.callbacks[eventName][a]==callback)
			{
			this.callbacks[eventName].splice(a,1);
			return;				
			}
		}
		
	}
	_.addElementById=function(id)
	{
		this.stickyItems.push({id:id,defaultTop:this.getOffset(document.getElementById(id)).top});
	}
	_.resize=function()
	{
		this.stick();
	}
	_.scroll=function()
	{
		this.stick();
	}
	_.stick=function()
	{
		
		for(var a=0;a<this.stickyItems.length;a++)
		{
			var element = document.getElementById(this.stickyItems[a].id);
			var currentTop = this.getOffset(element).top;
			var currentParentTop =this.getOffset(element.parentNode).top;
			if(currentTop<=0 && element.className.indexOf(this.classNames.STICKY)<0)
			{
				element.className+=" "+this.classNames.STICKY;
				this.stickyItems[a].defaultTop=currentParentTop;
				this.setSticky(element);
				this.executeCallbacks(this.events.ON_STICKY);
			}else if(this.stickyItems[a].defaultTop<=currentParentTop && element.className.indexOf(this.classNames.STICKY)>=0){
				element.className=element.className.replace(" "+this.classNames.STICKY,"");
				this.removeSticky(element);
				this.executeCallbacks(this.events.OFF_STICKY);
			}
		}
	}
	_.executeCallbacks=function(eventName)
	{
		if(!this.callbacks[eventName])return;
		for(var a=0;a<this.callbacks[eventName].length;a++)
		{
			this.callbacks[eventName][a]();
		}
	}
	_.setSticky=function(element)
	{
		this.defaultCSS.position = element.style.position;
		this.defaultCSS.top = element.style.top;
		
		 element.style.position= "fixed";
		 element.style.top= "0";
	}
	_.removeSticky=function(element)
	{
		element.style.position= this.defaultCSS.position;
		 element.style.top= this.defaultCSS.top;
	}
	_.getOffset=function( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
})();

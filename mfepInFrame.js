
//Trigger action when the contexmenu is about to be shown
$("html").bind("contextmenu", function (event) {
	var testCheck = $('input[name="mfepModeSelect"]').prop('checked');
	
	// Check if select mode is active
	if(testCheck){
		
		//Avoid the real one
		event.preventDefault();
		
		//Show contextmenu
		console.log("open");
		$(".custom-menu").finish().toggle(100).
		
		//In the right position (the mouse)
		css({
			top: event.pageY + "px",
			left: event.pageX + "px"
		});
	 }
});

// If the document is clicked somewhere
$(document).bind("mousedown", function (e) {
    
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        
        // Hide it
        $(".custom-menu").hide(100);
		console.log("close");
		elementHoverOut()
    }
});

// If the menu element is clicked
$(".custom-menu li").click(function(){

	// Hide it AFTER the action was triggered
	$(".custom-menu").hide(100);
	//console.log("close");
	elementHoverOut()
});

function elementOnHover() {
    $(".mfepContentSelectMain").addClass("elementActive")
}

function elementHoverOut() {
    $(".mfepContentSelectMain").removeClass("elementActive")
}



// Edit variant name

$("html").click(function(){
	$("#toggleEditVarName").show();
	$("#varNameNotEditable").show();
	$("#varNameEditable").hide();
});

$("#toggleEditVarName").click(function(event){
	event.stopPropagation();
	$(this).hide();
	$("#varNameNotEditable").hide();
	$("#varNameEditable").show();
	$("#varNameEditable").focus();
});

$("#varNameEditable").click(function(event){
	event.stopPropagation();
});



// Visual DOM Highlighter

 // Create the divs to be injected in the iFrame
$("html").addClass("mfepNotSelect");

$("body").css({
	marginTop: "32px",
	position: "inherit"
});

var box = $("<div class='mfepOuter' />").css({
	display: "none",
}).appendTo("body");

var infoNavMain = $("<div class='mfepdic mfepNotSelect'><div class='mfEpModeTgle'><input type='checkbox' id='hasNoState' name='mfepModeSelect' checked><label for='hasNoState'><span class='lever'></span><span class='slot'></span><span class='text'></span></label></div><div class='mfepInteractModeInfoText'>Interactive mode allows you to navigate freely between pages, toggle back to Selection mode to select an element.</div><div class='mfepdtim'></div></div>").appendTo("body");


// Initial variables for pointer location and taget element
var mouseX, mouseY, target, lastTarget;

//
window.requestAnimationFrame(function frame() {
	window.requestAnimationFrame(frame);
	
	var testCheck = $('input[name="mfepModeSelect"]').prop('checked');
	
	// Check if Select mode is active
	if(testCheck){
		
		$(".mfepdtim").show();
		$(".mfepInteractModeInfoText").hide();
				
		if (target && target.className === "mfepOuter") {
			box.hide();
			target = document.elementFromPoint(mouseX, mouseY);
		};
		
		if (!$(target).hasClass("mfepNotSelect")) {
			box.show();   
		} else {
			box.hide();
		}
			
		if (target === lastTarget) return;
		
		// get element parents to build Dom map
		var a = target;
		var els = [];
		while (a) {
			els.unshift(a.tagName);
			a = a.parentNode;
		};
		els.splice(0, 2);
		els = els.join("</a><span><i class='material-icons'>navigate_next</i></span><a>");
		
		// show element dom map
		$(".mfepdtim").html("<a>" + els + "</a>");

		// get lastTarget
		lastTarget = target;
		var $target = $(target);
		var offset = $target.offset();
		
		// Set size and position the Box around element
		box.css({
			width:  $target.outerWidth()  - 1, 
			height: $target.outerHeight() - 1, 
			left:   offset.left, 
			top:    offset.top 
		});
		
	} else {
		
		box.hide();
		$(".mfepdtim").hide();
		$(".mfepInteractModeInfoText").show();
		
	}

});

// Listen to the mousemove event and get target and pointer position
$("body > *:not(.mfepNotSelect)").mousemove(function (e) {
	var testCheck = $('input[name="mfepModeSelect"]').prop('checked');
	
	// Check if select mode is active
	if(testCheck){
		
		// Get target and pointer X & Y positions
		target = e.target;
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
});

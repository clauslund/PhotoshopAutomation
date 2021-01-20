// High Pass Sharpeningjsx
// 2010-08-06 Claus Lund
// Create a High Pass Filter layer from the background document and blend it with Soft Light

function main() {
	var myDisplayMode = setDisplayModeNo(myDoc)	
	var myDoc = getDocument()

	setBackgroundLayer(myDoc);
	duplicateBackgroundLayer(myDoc);
 
	setDisplayMode(myDisplayMode)
	} // end func

function setDisplayModeNo(myDoc) {
	var oldDisplayDialog = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;
	return oldDisplayDialog;
	}

function setDisplayMode(myDisplayMode)  {
	app.displayDialogs = myDisplayMode;
	}

function getDocument() {
	// if there is no documents open, then open one
	if (app.documents.length == 0) {
		var myDoc = open(File.openDialog ("Select a document"));
	} 
    else {
			//select the active document
			var myDoc = app.activeDocument;
	}
     
// there must be only one layer in the document
	if (myDoc.layers.length > 1) {
		if(confirm("The active document contain more than one layer. Flatten it now?")) {
            myDoc.flatten();
         } 
         else {
            alert("terminated - for futher informations, contact lund.claus@yahoo.com");
		}
	}           
     
    return myDoc;
	}

function setBackgroundLayer(myDoc) {
	myDoc.bitsPerChannel = BitsPerChannelType.SIXTEEN
	myDoc.activeLayer.isBackgroundLayer = true;
	myDoc.activeLayer.name = "Original";
	myDoc.activeLayer.opacity = 100;
	myDoc.activeLayer.fillOpacity = 100;
	myDoc.activeLayer.blendMode = BlendMode.NORMAL;
    myDoc.activeLayer.visible = true;	
	myDoc.activeLayer.allLocked = true;
	}


function duplicateBackgroundLayer(myDoc) {
	myDoc.artLayers.getByName("Original").duplicate();
	var myNewLayer = myDoc.artLayers.getByName("Original copy");
	myNewLayer.name = "High Pass Filter";
	myNewLayer.allLocked = false;
	myNewLayer.visible = true;
    myNewLayer.applyHighPass(5);
    myNewLayer.blendMode = BlendMode.SOFTLIGHT;
	}
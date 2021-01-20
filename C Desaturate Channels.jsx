﻿main();function main() {	var myDisplayMode = setDisplayModeNo(myDoc);		var myDoc = getDocument();        setBackgroundLayer(myDoc);    var myLayer = myDoc.artLayers.add();    myLayer.kind = LayerKind.HUESATURATION;    		setDisplayMode(myDisplayMode);	}function setDisplayModeNo(myDoc) {	var oldDisplayDialog = app.displayDialogs;    app.displayDialogs = DialogModes.NO;	return oldDisplayDialog;	}function setDisplayMode(myDisplayMode)  {	app.displayDialogs = myDisplayMode;	}function getDocument() {	if (app.documents.length == 0) {		var myDoc = open(File.openDialog ("Select a document"));	}     else {			//select the active document			var myDoc = app.activeDocument;	}              return myDoc;	}function setBackgroundLayer(myDoc) {	//myDoc.bitsPerChannel = BitsPerChannelType.SIXTEEN	myDoc.activeLayer.isBackgroundLayer = true;	myDoc.activeLayer.name = "Original";	myDoc.activeLayer.opacity = 100;	myDoc.activeLayer.fillOpacity = 100;	myDoc.activeLayer.blendMode = BlendMode.NORMAL;    myDoc.activeLayer.visible = true;		myDoc.activeLayer.allLocked = true;	}function createDesaturateLayer(myDoc) {    myDoc.artLayers.getByName("Original").duplicate();	var myDesaturateLayer = myDoc.artLayers.getByName("Original copy");	myDesaturateLayer.name = "Desaturate";	myDesaturateLayer.allLocked = false;		myDesaturateLayer.desaturate();	myDesaturateLayer.visible = false;	}
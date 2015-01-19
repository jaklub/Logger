"use strict";
define(["jquery", "d3", "d3logger", "test"], function($, d3, log, test) {

    console.log("client-main loaded!");
    log.init();

    $('#client-log').bind('click',logClient);

    var i = 1

    function logClient(arg1,arg2){
        console.log("logClient");
        log.logMessage("Log message " + i.toString());
        i = i +1;
    };

});
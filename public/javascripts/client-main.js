"use strict";
define(["jquery", "d3", "d3logger", "test"], function($, d3, log, test) {

    console.log("client-main loaded!");
    log.init();

    $('#client-log').bind('click',logClient);

    var i = 1

    function logClient(arg1,arg2){

        var temp = [{name:"foo1", label:"bar1"},{name:"foo2", label:"bar2"}];
        var temp2 = JSON.stringify(temp,null,2);

        console.log("logClient");
        //log.logMessage("Log message " + i.toString());
        log.logMessage("Log message " + temp2);
        i = i +1;
    };

});
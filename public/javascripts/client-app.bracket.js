require.config({
    baseUrl: 'javascripts',
    paths: {
        'client-main': '/public/javascripts/client-main',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'd3': '/bower_components/d3/d3.min',
        //socketio: 'libs/socket.io',
        'd3logger': '/modules/d3.logger',
        'test': '/modules/test',
        shim: {
            d3: {
                exports: 'd3'
            }
        }
    }
});


requirejs(["client-main"]);
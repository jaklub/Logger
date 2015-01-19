require.config({
    baseUrl: 'javascripts',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        'client-main': 'client-main',
        'jquery': '../jquery/dist/jquery.min',
        'd3': '../d3/d3.min',
        //socketio: 'libs/socket.io',
        'd3logger': '../d3.logger',
        'test': '../test',
        shim: {
            d3: {
                exports: 'd3'
            }
        }
    }
});

requirejs(["client-main"]);
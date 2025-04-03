
import { serve } from 'bun';

serve({
    fetch(request) {
        const url = new URL(request.url);  //url given by bun itself

        if (url.pathname === '/') {
            return new Response("Hello from Bikash Adhikari, a Backend developer !!!", { status: 200 });

        } else if (url.pathname === '/contact') {
            return new Response("email: bikash98@gmail.com", { status: 200 });

        } else {
            return new Response('404 Page Not Found !', { status: 404 });
        }
    },

    port: 3000,
    hostname: '127.0.0.1'

});



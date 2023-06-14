<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" type="text/css" href="{{ public_path(mix('css/mail.css')) }}">
    </head>
    <body>
        <div class="flex h-full items-center justify-center px-8 pt-12 pb-20 md:px-12 lg:px-16">
            {{ $slot }}
        </div>
    </body>
</html>

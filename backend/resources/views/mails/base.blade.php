<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="{{ public_path(mix('css/mail.css')) }}">
</head>

<body>
    <div class="flex h-full items-center justify-center px-8 pt-12 pb-20 md:px-12 lg:px-16">
        <div class="max-w-md flex-grow">
            <div class="w-full flex mb-4">
                <a href="http://localhost:3000/">
                    <img src="https://lh3.googleusercontent.com/pw/AJFCJaXsIi1gDMqkIvKMbNV1A8Bpa0nLDTw3r0ir7Ge9Dv3sA0lD9P50ZmSxYBY6DXXmsVTKOrNxKHd-y3MrSEYWfXS5a4_ILQ29_MnNRGO4G479FNg05EQMtxjmn7NpKrARaJA-EznASCNAuUmvZ68zDPW_-A=w619-h618-s-no?authuser=0"
                        class="w-14 h-14">
                    {{-- <image src="{{ public_path('images/logoWhite.png') }}" class="w-8 h-8"> --}}
                </a>
            </div>
            {{ $slot }}
        </div>
    </div>
</body>

</html>

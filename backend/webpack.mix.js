let mix = require('laravel-mix');
mix.postCss("resources/css/mail.css", "public/css", [
    require("tailwindcss"),
]);
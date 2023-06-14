<x-mails.base>
    <div class="max-w-md flex-grow">
        <div class="w-full flex mb-4">
            <a href="http://localhost:3000/">
                <img src="https://lh3.googleusercontent.com/pw/AJFCJaXsIi1gDMqkIvKMbNV1A8Bpa0nLDTw3r0ir7Ge9Dv3sA0lD9P50ZmSxYBY6DXXmsVTKOrNxKHd-y3MrSEYWfXS5a4_ILQ29_MnNRGO4G479FNg05EQMtxjmn7NpKrARaJA-EznASCNAuUmvZ68zDPW_-A=w619-h618-s-no?authuser=0"
                    class="w-14 h-14">
                {{-- <image src="{{ public_path('images/logoWhite.png') }}" class="w-8 h-8"> --}}
            </a>
        </div>
        <div class="flex w-full flex-col gap-2">
            <div class="">
                <h1 slot="header" class="md:text-2xl text-xl font-medium text-primary">Hello!</h1>
            </div>
            <p class="text-primary md:text-base text-sm">
                You are receiving this email because we received a password reset request for your account.
            </p>
            <div class="mt-4 flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                    <a href="http://localhost:3000/"
                        class="inline-flex items-center justify-center rounded-lg md:text-sm text-xs font-semibold bg-primary text-primary-foreground py-2 px-4">
                        <div>Recover link</div>
                    </a>
                </div>
            </div>
            <p class="text-primary md:text-sm text-xs">
                This password reset link will expire in 60 minutes.<br><br>
                If you did not request a password reset, no further action is required.
            </p>
        </div>
    </div>
</x-mails.base>

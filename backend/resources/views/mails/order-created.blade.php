<x-mails.base>
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
</x-mails.base>

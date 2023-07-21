<template>
    <UiButton variant="invertSolid" size="logo" @click="action" :class="{ 'border-solid': (isActive && isActive()) }"
        :title="title">
        <svg class="w-5 h-5">
            <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
        </svg>
    </UiButton>
</template>
  
<script>
import remixiconUrl from '@/assets/font/remixicon.symbol.svg'

export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        action: {
            type: Function,
            required: true,
        },
        isActive: {
            default: false,
            required: false
        },
    },

    data() {
        return {
            remixiconUrl,
        }
    }
}
</script>
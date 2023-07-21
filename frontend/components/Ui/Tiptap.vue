<template>
    <UiTiptapMenu v-if="editor" :editor="editor"></UiTiptapMenu>
    <editor-content :editor="editor" />
    <floating-menu :editor="editor" :tippy-options="{ duration: 100, placement: 'bottom-start' }" v-if="editor">
        <div class="flex gap-1 p-1 border-input border rounded-lg bg-solid-foreground">
            <template v-for="(item, index) in floatingMenuItems">
                <div class="" v-if="item.type === 'divider'" :key="`divider${index}`" />
                <UiTiptapMenuItem v-else :key="index" v-bind="item" />
            </template>
        </div>
    </floating-menu>
</template>
  
<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, FloatingMenu } from '@tiptap/vue-3'
import Placeholder from '@tiptap/extension-placeholder'
export default {
    props: {
        modelValue: {
            default: '',
        },
        placeholder: {
            type: String,
            default: '......',
            required: false
        },
    },
    components: {
        EditorContent,
        FloatingMenu,
    },
    data() {
        return {
            editor: null,
            floatingMenuItems: [
                {
                    icon: 'h-2',
                    title: 'Heading 2',
                    action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
                    isActive: () => this.editor.isActive('heading', { level: 2 }),
                },
                {
                    icon: 'h-3',
                    title: 'Heading 3',
                    action: () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
                    isActive: () => this.editor.isActive('heading', { level: 3 }),
                },
                {
                    icon: 'h-4',
                    title: 'Heading 4',
                    action: () => this.editor.chain().focus().toggleHeading({ level: 4 }).run(),
                    isActive: () => this.editor.isActive('heading', { level: 4 }),
                },
                {
                    icon: 'list-check-2',
                    title: 'Task List',
                    action: () => this.editor.chain().focus().toggleTaskList().run(),
                    isActive: () => this.editor.isActive('taskList'),
                },
            ]
        }
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: this.placeholder,
                })

            ],
            editorProps: {
                attributes: {
                    class: `w-full flex flex-col transition-all min-h-[10em] md:min-h-[25em] w-full rounded-lg border border-input px-3 py-3 text-sm bg-solid-foreground text-solid fill-solid border border-input hover:border-solid ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 drop-shadow`,
                },
            },
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())
                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        })
    },
    watch: {
        modelValue(value) {
            // HTML
            const isSame = this.editor.getHTML() === value
            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
            if (isSame) {
                return
            }
            this.editor.commands.setContent(value, false)
        },
    },
    beforeUnmount() {
        this.editor.destroy()
    },
    emits: ['update:modelValue'],
}
</script>
<style>
.ProseMirror code {
    @apply bg-accent text-accent-foreground;
}

.ProseMirror pre {
    @apply bg-accent text-accent-foreground;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

.ProseMirror pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
}

.ProseMirror img {
    max-width: 100%;
    height: auto;
}

.ProseMirror blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
}

.ProseMirror hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 1rem 0;
}

.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    @apply text-muted-foreground;
    pointer-events: none;
    height: 0;
}

h1 {
    @apply text-3xl font-semibold;
}

h2 {
    @apply text-2xl font-semibold;
}

h3 {
    @apply text-xl font-semibold;
}

h4 {
    @apply text-lg font-semibold;
}
</style>
# TipTap Render View

<!-- NOTE: [description] Sync description with GitHub and package.json -->

Serialize [Tiptap](https://github.com/ueberdosis/tiptap) JSON content with interactive components.

## Installation

```sh
# Using npm
npm install tiptap-render-view
# Using yarn
yarn add tiptap-render-view
# Using pnpm
pnpm add tiptap-render-view
```

## Usage

At the time of writing this package only provides a Vue component to render your `JSONContent`. But it also provides types and tools to build components for your prefered JavaScript framework.

### Vue

Check out this [example on StackBlitz](https://stackblitz.com/github/formfcw/tiptap-render-view/tree/main/vue/example-app)

```vue
<template>
    <RenderNodes
        :content="content"
        :serializers="serializers"
        :componentSerializers="componentSerializers"
    />
</template>

<script setup lang="ts">
    import { Node, Mark } from "@tiptap/core";
    import RenderNodes from "tiptap-render-view/vue";
    import Document from "@tiptap/extension-document";
    import Text from "@tiptap/extension-text";
    import Paragraph from "@tiptap/extension-paragraph";
    import Textfield from "./components/Textfield.vue";
    import type {
        VueComponentSerializers,
        JSONContent,
        Extensions,
    } from "./tiptap-render-view/vue";

    const props = defineProps<{
        content: JSONContent;
    }>();

    const serializers: Extensions = [Document, Text, Paragraph];

    const componentSerializers: VueComponentSerializers = [
        // marks with `type: 'mark'`
        { name: "italic", type: "mark", component: Textfield },
        {
            name: "bold",
            type: "mark",
            render: (attrs) => [
                Textfield,
                { ...attrs, style: "background:lightgreen" },
            ],
        },
        // blocks
        { name: "heading", render: (attrs) => ["textarea", attrs] },
    ];
</script>
```

### Other Frameworks

Feel free to contribute

## Contribution

Contributions are welcome. Make sure to open an issue for bugs or start a discussion for feature requests, before you start writing code!

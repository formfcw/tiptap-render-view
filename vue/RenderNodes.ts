import { h, defineComponent, computed } from "vue";
import type { PropType } from "vue";
import { renderView, mergeSerializers } from "../index";

import type {
    VNode,
    Component,
    JSONContent,
    Extensions,
    VueComponentSerializers,
} from "./types";

export default defineComponent({
    functional: true,
    props: {
        content: {
            type: Object as PropType<JSONContent>,
            required: true,
        },
        serializers: {
            type: Array as PropType<Extensions>,
            default: () => [],
        },
        componentSerializers: {
            type: Array as PropType<VueComponentSerializers>,
            default: () => [],
        },
    },
    setup(props) {
        return () => {
            const content = JSON.parse(JSON.stringify(props.content));
            const serializers = mergeSerializers<Component>(
                props.serializers,
                props.componentSerializers
            );

            return renderView<VNode>(
                content,
                serializers,
                (tag, attrs, content) => h(tag, attrs, content as any)
            );
        };
    },
});

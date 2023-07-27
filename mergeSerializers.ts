import { Node, Mark } from "@tiptap/core";
import type { Extensions, ComponentSerializers } from "./types";

export default <T>(
    serializers: Extensions,
    componentSerializers: ComponentSerializers<T>
): Extensions => {
    const _componentSerializers = componentSerializers.map((item) => {
        const nodeType = item.type == "mark" ? Mark : Node;

        return nodeType.create({
            name: item.name,
            renderHTML({ HTMLAttributes }) {
                if (item.render)
                    return [...item.render(HTMLAttributes), 0] as any;

                const element =
                    item.component ?? (item.type == "mark" ? "span" : "div");

                return [element, HTMLAttributes, 0] as any;
            },
        });
    });

    const componentSerializerNames = _componentSerializers.map(
        ({ name }) => name
    );

    const _serializers = serializers.filter(
        (item) => componentSerializerNames.indexOf(item.name) < 0
    );

    return [..._serializers, ..._componentSerializers] as Extensions;
};

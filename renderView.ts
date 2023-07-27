import type {
    JSONContent,
    Extensions,
    RenderedNode,
    Attrs,
    NodeType,
    RenderCallback,
    SerializedNode,
    Serializer,
} from "./types";

export default <T>(
    node: JSONContent,
    serializers: Extensions,
    renderCallback: RenderCallback<T>
): RenderedNode<T> => {
    return renderView(node);

    function renderView(node: JSONContent): RenderedNode<T> {
        if (node.content) {
            node.content = node.content.map(renderView) as JSONContent[];
        }

        if (node.type === "text") {
            if (node.marks) {
                let _node: any;

                node.marks.reverse().forEach((mark) => {
                    const [tag = "span", attrs = mark.attrs] = _serializeNode(
                        mark,
                        "mark"
                    );

                    _node = renderCallback(
                        tag,
                        attrs,
                        _node ? _node : node.text
                    );
                });

                return _node;
            }

            return node.text ?? "";
        }

        const [tag = "div", attrs = node.attrs] = _serializeNode(node);

        return renderCallback(tag, attrs, node.content);
    }

    function _serializeNode(
        node: JSONContent,
        type: NodeType = "node"
    ): SerializedNode {
        const serializer = _getSerializer(node.type, type);
        if (!serializer?.renderHTML) return [];

        const HTMLAttributes = _getHTMLAttributes(node.attrs, serializer);

        return serializer.renderHTML({
            node,
            HTMLAttributes,
        });
    }

    function _getSerializer(
        name: JSONContent["type"],
        type: NodeType
    ): Serializer["config"] | undefined {
        const serializer = serializers.find(
            (item) => item.type == type && item.name == name
        );

        if (!serializer) return;

        return {
            ...serializer.config,
            options: serializer.options,
        };
    }

    function _getHTMLAttributes(
        attrs: Attrs,
        serializer: Serializer["config"]
    ) {
        const serializerAttrs = serializer.addAttributes?.();
        if (!serializerAttrs || !attrs) return attrs;

        return Object.fromEntries(
            Object.entries(attrs).filter(
                ([key]) => serializerAttrs[key]?.rendered !== false
            )
        );
    }
};

import type { JSONContent, Extensions, AnyExtension } from "@tiptap/core";
export { JSONContent, Extensions };

export type RenderedNode<T> = T | string | (T | string)[];

export type Tag = string;
export type Attrs = JSONContent["attrs"];
export type NodeType = "mark" | "node";

export type RenderCallback<T> = (
    tag: Tag,
    attrs: Attrs,
    content?: JSONContent[]
) => RenderedNode<T>;

export type SerializedNode = [tag?: Tag, attrs?: Attrs];
export type Serializer = AnyExtension & {
    options?: any;
    renderHTML?: (attributes: Record<string, any>) => SerializedNode;
    addAttributes: () => any;
};

export type ComponentSerializers<T> = {
    name: string;
    component?: T;
    render?: (attrs: Attrs) => [Tag | T, Attrs];
    type?: NodeType;
}[];

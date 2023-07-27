export type * from "../types";

import type { ComponentSerializers } from "../types";

import type { VNode, Component } from "vue";
export { Component, VNode };

export type VueComponentSerializers = ComponentSerializers<Component>;

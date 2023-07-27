<template>
  <main>
    <p>JSON content</p>
    <pre><code>{{ content }}</code></pre>
    <hr />
    <p>Rendered result: <button @click="show = !show">Toggle component serializers</button></p>
    <RenderNodes
      :content="content"
      :serializers="serializers"
      :componentSerializers="show ? componentSerializers : []"
      class="result"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RenderNodes, { VueComponentSerializers } from 'tiptap-render-view/vue'
import serializers from './tiptap-extensions'
import content from './content.json'
import Textfield from './components/Textfield.vue'

const componentSerializers: VueComponentSerializers = [
  // marks with `type: 'mark'`
  { name: 'italic', type: 'mark', component: Textfield },
  { name: 'bold', type: 'mark', render: (attrs) => [Textfield, { ...attrs, style: 'background:lightgreen' }] },
  // blocks
  { name: 'heading', render: (attrs) => ['textarea', attrs] },
]

const show = ref(false)
</script>

<style>
main {
  padding: 1rem;
}
pre {
  height: 12rem;
  overflow: auto;
}
pre,
.result {
  padding: 0.5rem;
  background: #f2f2f2;
}
.result {
  margin-top: 0.5rem;
}
</style>

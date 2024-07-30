<script lang="ts">
  import { stepsIndexer, steps, target, algorithm } from "$lib/refs.svelte";
</script>

<div>
  Target: {target.v}
  <br />
  Visual: {stepsIndexer.v} / {steps.v.length - 1}
  <br />
  Algorithm: {algorithm.v}
</div>
{#if stepsIndexer.v !== 1}
  <!-- prettier-ignore -->
  <button
    class="fa-solid fa-arrow-left"
    onclick={(): void => { stepsIndexer.v--; }}
    aria-label="Left arrow"
  ></button>
{:else}
  <button style:visibility="hidden"></button>
{/if}
{#if stepsIndexer.v !== steps.v.length - 1}
  <!-- prettier-ignore -->
  <button
    class="fa-solid fa-arrow-right"
    onclick={(): void => { stepsIndexer.v++; }}
    aria-label="Right arrow"
  ></button>
{:else}
  <button style:visibility="hidden"></button>
{/if}
<!-- prettier-ignore -->
<button class="fa-solid fa-rotate-right" onclick={(): void => { stepsIndexer.reset(); steps.v.splice(1); }} aria-label="Reset footer"></button>

<style lang="scss">
  div {
    bottom: 20px;
    left: 20px;
    position: absolute;
  }
</style>

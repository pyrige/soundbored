<script lang="ts">
  import { Styles } from "sveltestrap";

  import SoundGroup from "./SoundGroup.svelte";
  import { SoundType } from "./Sound";
</script>

<Styles />

<main>
  <SoundGroup soundType={SoundType.Music} style="grid-area: m;" />
  <SoundGroup soundType={SoundType.Ambience} style="grid-area: a;" />
  <SoundGroup soundType={SoundType.Effect} style="grid-area: e;" />
</main>

<style>
  :root {
    --gap: 1vw;
    --row-height: calc(0.5 * (100vh - 3 * var(--gap)));
    --col-width: calc(0.5 * (100vw - 3 * var(--gap)));
  }
  main {
    height: 100vh;
    padding: var(--gap);

    display: grid;
    grid-gap: var(--gap);
    grid-template:
      "m a" var(--row-height)
      "e e" var(--row-height) / var(--col-width) var(--col-width);
  }
</style>

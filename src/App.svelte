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
  main {
    padding: 1vw;
    height: 100vh;

    display: grid;
    grid-gap: 1vw;
    grid-template:
      "m a" 1fr
      "e e" 1fr / 1fr 1fr;
  }
</style>

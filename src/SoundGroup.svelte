<script lang="ts">
  import { onMount } from "svelte";

  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Icon,
  } from "sveltestrap";

  import SoundControl from "./SoundControl.svelte";
  import SoundUpload from "./SoundUpload.svelte";
  import { Sound, SoundType } from "./Sound";

  export let soundType: SoundType;
  export let style: string;

  let sounds: Array<Sound> = [];

  const loadSounds = async () => {
    sounds = await Sound.load(soundType);
  };
  onMount(loadSounds);

  // upload dialog
  let uploadOpen = false;
  const soundsChanged = async (e: CustomEvent) => {
    console.log(`Sound ${e.detail} changed. Reloading sounds…`);
    await loadSounds();
  };
</script>

<Card {style}>
  <CardHeader>
    <CardTitle>
      <div class="card-title">
        <strong>{SoundType[soundType]}</strong>
        <Button
          outline
          size="sm"
          color="primary"
          on:click={() => (uploadOpen = true)}
        >
          <Icon name="plus" />
          Add Sound
        </Button>
      </div>
    </CardTitle>
  </CardHeader>
  <CardBody style="overflow-y: auto;">
    <section
      class={soundType == SoundType.Effect ? "sound-tiles" : "sound-list"}
    >
      {#each sounds as sound (sound.id)}
        <SoundControl
          {sound}
          tile={soundType == SoundType.Effect}
          on:deleted={soundsChanged}
        />
      {/each}
    </section>
    <SoundUpload
      bind:isOpen={uploadOpen}
      {soundType}
      on:uploaded={soundsChanged}
    />
  </CardBody>
</Card>

<style>
  :root {
    --gap: 5px;
  }

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  section.sound-list {
    display: grid;
    grid-gap: var(--gap);
    grid-template-columns:
      minmax(min-content, max-content)
      auto
      minmax(min-content, max-content);
    align-items: center;
    justify-items: end;
  }

  section.sound-tiles {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    justify-content: start;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { Button, Icon } from "sveltestrap";

  import { Sound, SoundType } from "./Sound";

  export let sound: Sound;

  let control: HTMLAudioElement;

  const dispatch = createEventDispatcher();
  const deleteSound = async () => {
    await Sound.delete(sound.id);
    dispatch("deleted", sound.id);
  };
</script>

<strong style="white-space: nowrap;">{sound.name}</strong>

<audio bind:this={control} loop={sound.type != SoundType.Effect} preload="auto" controls>
  <source src={sound.url} />
</audio>

<Button size="sm" color="danger" on:click={deleteSound}>
  <Icon name="trash" />
</Button>

<style>
  audio {
    height: 25px;
    width: 100%;
  }
</style>

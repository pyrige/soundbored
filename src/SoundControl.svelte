<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import {
    Button,
    ButtonGroup,
    Card,
    CarouselControl,
    Icon,
  } from "sveltestrap";

  import { Sound, SoundType } from "./Sound";

  export let sound: Sound;
  export let tile: boolean = false;

  let control: HTMLAudioElement;

  const dispatch = createEventDispatcher();

  let preDelete: boolean = false;
  const deleteSound = async () => {
    if (preDelete) {
      await Sound.delete(sound.id);
      dispatch("deleted", sound.id);

      return;
    }

    // prime Sound for deletion, reset after 2s
    preDelete = true;
    setTimeout(() => {
      preDelete = false;
    }, 2000);
  };

  const playSound = async () => {
    control.currentTime = 0;
    await control.play();
  };

  let duration: string = "";
  const updateDuration = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "second",
      unitDisplay: "narrow",
      maximumFractionDigits: 2,
    });
    duration = formatter.format(control.duration);
  };
</script>

{#if tile}
  <Card body style="flex-grow: 0; align-items: flex-start;">
    <strong style="white-space: nowrap;">
      {sound.name}
      <small>[{duration}]</small>
    </strong>

    <ButtonGroup>
      <Button size="sm" color="primary" on:click={playSound}>
        <Icon name="play" />
      </Button>
      <Button
        size="sm"
        color={preDelete ? "danger" : "warning"}
        on:click={deleteSound}
      >
        <Icon name="trash" />
      </Button>
    </ButtonGroup>

    <audio
      bind:this={control}
      on:loadedmetadata={updateDuration}
      loop={sound.type != SoundType.Effect}
      preload="auto"
    >
      <source src={sound.url} />
    </audio>
  </Card>
{:else}
  <strong style="white-space: nowrap;">{sound.name}</strong>

  <audio loop={sound.type != SoundType.Effect} preload="auto" controls>
    <source src={sound.url} />
  </audio>

  <Button
    size="sm"
    color={preDelete ? "danger" : "warning"}
    on:click={deleteSound}
  >
    <Icon name="trash" />
  </Button>
{/if}

<style>
  audio[controls] {
    height: 1.5rem;
    width: 100%;
  }
</style>

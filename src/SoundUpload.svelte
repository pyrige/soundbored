<script lang="ts">
  import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "sveltestrap";

  import { Sound, SoundType } from "./Sound";

  import { createEventDispatcher } from "svelte";

  export let isOpen: boolean;
  export let soundType: SoundType;

  let fileName: string = "";
  let fileList: Array<File> = [];

  $: nameValid = Boolean(fileName);
  $: fileValid = Boolean(fileList && fileList[0]);

  const toggle = () => {
    isOpen = !isOpen;

    fileName = "";
    fileList = [];
  };

  const dispatch = createEventDispatcher();

  const uploadSound = () => {
    if (!nameValid || !fileValid) return;

    const displayName = fileName;
    const file = fileList[0];

    const reader = new FileReader();
    reader.addEventListener("load", async () => {
      const url = reader.result as string;
      const sound = new Sound(displayName, url, soundType);
      await sound.save();

      dispatch("uploaded", sound.id);
    });

    reader.readAsDataURL(file);
  };
</script>

<Modal {isOpen} {toggle}>
  <ModalHeader {toggle}>Add new {SoundType[soundType]}</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="soundFileInput">Sound File</Label>
        <Input
          type="file"
          bind:files={fileList}
          id="soundFileInput"
          accept="audio/*"
          valid={fileValid}
          invalid={!fileValid}
        />
      </FormGroup>
      <FormGroup>
        <Label for="displayNameInput">Display Name</Label>
        <Input type="text" bind:value={fileName} id="displayNameInput" valid={nameValid} invalid={!nameValid} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" on:click={toggle}>Cancel</Button>
    <Button
      color="primary"
      on:click={() => {
        uploadSound();
        toggle();
      }}>Save</Button
    >
  </ModalFooter>
</Modal>

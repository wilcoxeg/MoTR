Magpie allows creating experiments where participants interact with each other online.
This works via a web socket connection to the magpie server that relays events to all participants in the same experiment room.
There are a number of preconfigured components available for you to use in such scenarios, like e.g. the Chat component, which allows participants to communicate via text messages.

You will likely want to create your own interactive components. To showcase how this works, we'll use a simplified version of the chat component as an example:

```html
<template>
  <div class="chat">
    <div ref="box" class="chat-box">
      <!-- List all chat messages -->
      <p
        v-for="(message, i) in messages"
        :key="i"
        v-text="message.message"
      ></p>
    </div>
    <div class="chat-input">
      <!-- Textarea (with a ref called 'text') for composing messages and 'send' button for sending them -->
      <textarea ref="text"></textarea>
      <button @click.stop="send()">Send</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Chat',
  data() {
    return {
      messages: []
    };
  },
  // This is a magpie-specific extension to Vue, which allows
  // you to specify callbacks for specific socket events. In this case
  // we're listening on the 'chat_message' event 
  socket: {
    chat_message(payload) {
      this.messages.push(payload);
    }
  },
  methods: {
    send() {
      // Here we get the current message from the textarea using the Vue ref we set above
      const message = this.$refs.text.value;
      // If the experiment was setup with a socketURL config setting,
      // the socket will be available as part of the magic $magpie property
      // allowing us to broadcast this message to the fellow participants in the current room (including ourself)
      this.$magpie.socket.broadcast('chat_message', message);
    }
  }
};
</script>
```

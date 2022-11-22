<docs>
This interactive component provides participants the opportunity to chat with each other, if they are in the same room.

```vue
<Experiment>
    <Screen>
      <button @click="$magpie.nextScreen()">Start</button>
    </Screen>

    <ConnectInteractiveScreen />

    <Screen>

      <Slide>
        <Chat :data.sync= "$magpie.measurements.data" />
        <p>{{$magpie.measurements.data? $magpie.measurements.data.chatMessage.length : 0}} messages sent so far.</p>
        <p>{{ $magpie.socket.active.length }} participants chatting.</p>
      </Slide>

    </Screen>

</Experiment>
```


</docs>
<template>
  <div class="chat">
    <div ref="box" class="chat-box">
      <p
        v-for="(message, i) in messages"
        :key="i"
        :class="{
          message: message.event === 'message',
          userEvent: message.event === 'join' || message.event === 'leave',
          me: message.participantId === $magpie.socket.participantId
        }"
        :style="{
          ...(message.message && {
            background: $magpie.socket.getParticipantColor(
              message.participantId
            )
          }),
          ...(!message.message && {
            color: $magpie.socket.getParticipantColor(message.participantId)
          })
        }"
        v-text="
          message.message ||
          (message.participantId === $magpie.socket.participantId
            ? message.event === 'join'
              ? $t('interactive.Chat.statusYouJoined')
              : message.event === 'leave'
              ? $t('interactive.Chat.statusYouLeft')
              : ''
            : message.event === 'join'
            ? $t('interactive.Chat.statusParticipantJoined', {
                user: $magpie.socket.getParticipantName(message.participantId)
              })
            : message.event === 'leave'
            ? $t('interactive.Chat.statusParticipantLeft', {
                user: $magpie.socket.getParticipantName(message.participantId)
              })
            : '')
        "
      ></p>
    </div>
    <div class="chat-input">
      <textarea
        ref="text"
        cols="50"
        :placeholder="$t('interactive.Chat.messageLabel')"
        @keydown.enter.prevent="send"
      ></textarea>
      <button @click.stop="send()">{{ $t('general.send') }}</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import difference from 'lodash/difference';
export const EVENT_CHAT_MESSAGE = '$magpie.chat_message';

export default {
  name: 'Chat',
  props: {
    participantLabel: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      messages: [],
      interval: null
    };
  },
  socket: {
    [EVENT_CHAT_MESSAGE](payload) {
      this.messages.push(payload);
      Vue.nextTick(() => {
        this.$refs.box.scrollTop = this.$refs.box.scrollHeight;
      });
      /**
       * Messages contains all chat messages as objects: `[{message: '', participantId: '', time: 2345678765}, ...]`
       */
      this.$emit(
        'update:messages',
        this.messages.filter((m) => m.event === 'message')
      );
      /**
       * Data contains all chat messages in tabular form: `{chatMessage: [], chatParticipantId: [], chatTime: []}`
       */
      this.$emit(
        'update:data',
        this.flattenData(this.messages.filter((m) => m.event === 'message'))
      );
    }
  },
  watch: {
    ['$magpie.socket.active'](newParticipants, oldParticipants) {
      const joined = difference(newParticipants, oldParticipants);
      const left = difference(oldParticipants, newParticipants);
      left.forEach((participantId) => {
        this.messages.push({
          time: Date.now(),
          participantId,
          event: 'leave',
          message: ''
        });
      });
      joined.forEach((participantId) => {
        this.messages.push({
          time: Date.now(),
          participantId,
          event: 'join',
          message: ''
        });
      });
    }
  },
  mounted() {
    this.$magpie.socket.active.forEach((participantId) => {
      this.messages.push({
        time: Date.now(),
        participantId,
        event: 'join',
        message: ''
      });
    });
  },
  EVENT_CHAT_MESSAGE,
  methods: {
    send() {
      const message = this.$refs.text.value;
      if (!message) {
        return;
      }
      this.$magpie.socket.broadcast(EVENT_CHAT_MESSAGE, {
        event: 'message',
        message,
        participantId: this.$magpie.socket.participantId,
        participantLabel: this.participantLabel,
        time: Date.now()
      });
      this.$refs.text.value = '';
      this.$refs.text.focus();
    },
    flattenData(messages) {
      return {
        chatMessage: messages.map((m) => m.message),
        chatParticipantId: messages.map((m) => m.participantId),
        chatParticipantLabel: messages.map((m) => m.participantId),
        chatTime: messages.map((m) => m.time)
      };
    }
  }
};
</script>
<style>
.chat {
  width: 450px;
}

.chat-box {
  overflow: auto;
  height: 400px;
}

.userEvent {
  width: 45%;
  clear: both;
  text-align: center;
  margin: 5px auto;
}

.userEvent.me {
  color: #70ba517a !important;
}

.message {
  width: 55%;
  float: left;
  text-align: left;
  background: #5187ba7a;
  border-radius: 4px;
  padding: 4px;
  margin: 5px 0;
}

.message.me {
  float: right;
  background: #70ba517a !important;
}

.chat-input {
  display: flex;
}

.chat-input textarea {
  flex-grow: 1;
  height: 32px;
}

.chat-input button {
  margin: 0;
}
</style>

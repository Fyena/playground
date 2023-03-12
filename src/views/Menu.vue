<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="h-full bg-[#000000] absolute top-0 left-0 w-full font-2 text-white flex flex-col">
        <div class='text-4xl text-center text-white my-48 shadow-white'>Playground</div>
        <div class='text-center hover:cursor-pointer' v-on:click="this.$router.push('/game')">Start game</div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

export default  defineComponent({
  name: 'MenuPage',
  components: { IonContent, IonPage },

});
</script>

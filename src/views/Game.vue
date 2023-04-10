<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class='relative h-full w-full bg-black' v-on:click='this.loadAudio' v-if='this.showGame'>
        <audio id='audio1'></audio>
        <audio id='audio2'></audio>
        <audio id='audio3'></audio>
        <audio id='audio4'></audio>
        <input id='mainInput' class='opacity-0 absolute z-50 w-screen h-screen scale-100 hover:cursor-default' @keydown.w="this.move('w')" @keydown.a="this.move('a')" @keydown.s="this.move('s')" @keydown.d="this.move('d')" @keydown.enter="this.move('enter')" v-model="this.input" v-on:click='this.interact' autofocus>
        <div class="absolute w-screen h-screen top-0 left-0 bg-no-repeat transition-all duration-200" :style="'background-position: ' + (this.sceneX + this.offsetX) + 'px ' + (this.sceneY + this.offsetY) + 'px;' + 'background-image: url('+ this.imageSource + '); transform: scale(' + this.scale + '); opacity: ' + this.opacity"></div>
        <div v-for="npc in this.npcs" v-bind:key="npc.id" class="absolute w-screen h-screen top-0 left-0 bg-no-repeat transition-all duration-200" :style="'background-position: ' + (this.sceneX + this.offsetX - npc.x) + 'px ' + (this.sceneY + this.offsetY - npc.y) + 'px;' + 'background-image: url('+ npc.sprites[npc.direction] + '); transform: scale(' + this.scale + '); z-index: 2;'"></div>
        <!-- Battle -->
        <div v-if='this.battle' class='absolute top-0 left-0 h-screen w-screen'>
        <!-- Animal 1 -->
          <div class="absolute w-screen h-screen top-0 left-0 bg-no-repeat transition-all duration-200 z-50" :style="'background-position: ' + (this.sceneX + 150) + 'px ' + (this.sceneY + 200) + 'px;' + 'background-image: url(assets/animals/animal'+ this.battle.ownAnimals[this.fightingAnimalIndex].animalId + 'back.png); transform: scale(' + this.scale + '); z-index: 2;'"></div>
          <div class="absolute transition-all duration-1000 z-50 w-[200px] bg-yellow-700 text-white border-4 border-yellow-600 p-2 rounded-xl font-2 text-xs flex flex-col" :style="'left: ' + (this.sceneX - 50) + 'px; top: ' + (this.sceneY + 100) + 'px; z-index: 2;'">
            <span>{{this.battle.ownAnimals[this.fightingAnimalIndex].name}}</span><span class='text-right px-2'> Lv. {{this.battle.ownAnimals[this.fightingAnimalIndex].level}}</span>
            <span>HP: {{this.battle.ownAnimals[this.fightingAnimalIndex].health ?? (Math.floor(this.battle.ownAnimals[this.fightingAnimalIndex].healthPerLevel * this.battle.ownAnimals[this.fightingAnimalIndex].level + this.battle.ownAnimals[this.fightingAnimalIndex].baseHealth))}} / {{Math.floor(this.battle.ownAnimals[this.fightingAnimalIndex].healthPerLevel * this.battle.ownAnimals[this.fightingAnimalIndex].level + this.battle.ownAnimals[this.fightingAnimalIndex].baseHealth)}}</span>
            <span>XP: {{this.battle.ownAnimals[this.fightingAnimalIndex].xp / this.battle.ownAnimals[this.fightingAnimalIndex].xpPerLevel * this.battle.ownAnimals[this.fightingAnimalIndex].level * 100}}%</span>
          </div>
        <!-- Animal 2 -->
          <div class="absolute w-screen h-screen top-0 left-0 bg-no-repeat transition-all duration-200 z-50" :style="'background-position: ' + (this.sceneX + 390) + 'px ' + (this.sceneY + 80) + 'px;' + 'background-image: url(assets/animals/animal'+ this.battle.opponent.animalId + 'front.png); transform: scale(' + this.scale + '); z-index: 2;'"></div>
          <div class="absolute transition-all duration-1000 z-50 w-[200px] bg-yellow-700 text-white border-4 border-yellow-600 p-2 rounded-xl font-2 text-xs flex flex-col" :style="'left: ' + (this.sceneX + 500) + 'px; top: ' + (this.sceneY - 150) + 'px; z-index: 2;'">
            <span>{{this.battle.opponent.name}}</span><span class='text-right px-2'> Lv. {{this.battle.opponent.level}}</span>
            <span>HP: {{this.battle.opponent.health}} / {{(this.battle.opponent.maxHealth)}}</span>
          </div>
        </div>
        <!-- End battle -->
        <img v-if="this.showSprite" v-bind:src="spriteSource" class='w-12 h-12 absolute left-[50%] top-[50%] transition-all duration-200' :class="this.spriteScale" :style="'z-index: ' + this.spriteZIndex + ';'"/>
        <div class='absolute bg-black bg-opacity-50'>X: {{this.sceneX}} Y: {{this.sceneY}}</div>
        <div class='absolute top-6 bg-black bg-opacity-100 text-6xl text-red-700'>devX: {{this.devX}} devY: {{this.devY}}</div>
        <div class='absolute top-24 h-96 w-96 bg-black bg-opacity-50 overflow-y-scroll z-50'>Console:
          <div v-for='log in this.console' :key='log' class='border-t py-2'>{{log}}</div>
        </div>
        <span class='absolute top-0 right-0 z-50'><input type='number' min='-10' max='10' v-model='this.offsetX'>{{this.offsetX}}</span>
        <input type='number' min='-10' max='10' v-model='this.offsetY' class='absolute top-6 right-0 z-50'>
        <div class='absolute sm:w-1/2 w-screen sm:left-1/4 left-0 bottom-0 font-2 bg-yellow-700 bg-opacity-80 p-5 border-double border-4 border-yellow-600 transition-all duration-500 rounded min-h-[100px]' :class="this.chatMessageOpacity">
          <p v-if='!this.chatMessageInput'>{{this.chatMessage}}</p>
          <input id='choiceTextInput' :class='this.choiceInputType === 2 ? "block border-b bg-white bg-opacity-0 focus:border-b focus:outline-none" : "w-0 h-0 opacity-0"' v-model='this.choiceTextInput' type='text' @keydown.enter='this.move("enter")' />
          <div v-if='this.choiceInputType === 1' class='flex flex-row w-full'>
            <div v-for='choice in this.choices' v-bind:key='choice' class='flex-1 text-center transition-all duration-100' :class='this.choices[this.selectedChoice] === choice ? "text-white underline" : "text-neutral-300"'>
              {{choice}}
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import forbiddenAreas from '../constants/forbiddenAreas.js';
import interactions from '../constants/interactions.js';
import sceneVariables from '../constants/sceneVariables.js';
import cutscenes from '../constants/cutscenes.js';
import service from '../services/service.js';
import consequences from '../constants/consequences.js';

export default  defineComponent({
  name: 'GamePage',
  components: { IonContent, IonPage },
  data() {
    return {
      showGame: true,
      showLogin: false,
      imageSource: '',
      opacity: 1,
      sceneX: -340,
      sceneY: -340,
      offsetX: 0,
      offsetY: 0,
      sceneId: 3,
      devX: -340,
      devY: -340,
      facing: 0, // 0 = w, north / 1 = s, south / 2 = a, west / 3 = d, east
      sceneName: 'home',
      movement: 48,
      scale: 1.5,
      showStaticScene: true,
      spriteSource: '/assets/img/sprite2.png',
      showSprite: true,
      spriteScale: 'scale-[2]',
      spriteZIndex: 3,
      audio: false,
      loadedForbiddenAreas: [],
      loadedInteractions: [],
      chatMessages: [],
      chatMessage: '',
      chatMessageIndex: 0,
      chatMessageOpacity: 'opacity-0',
      chatSkippable: true,
      paused: false,
      instantFillChatMessage: false,
      filledChatMessage: false,
      lockedDialogs: [],
      console: [],
      cutsceneIndex: 0,
      cutsceneMessageIndex: 0,
      cuts: [],
      sceneVariables: undefined,
      nextScene: 0,
      nextX: undefined,
      nextY: undefined,
      cutscenePlaying: false,
      night: false,
      npcs: [],
      input: '',
      showChatMessageInput: false,
      chatMessageInput: undefined,
      choices: [],
      choiceInputType: 0, // 0 = nothing, 1 = choices, 2 = text input
      choiceTextInput: '',
      selectedChoice: 0,
      choiceData: [],
      action: undefined,
      battle: undefined,
      fightingAnimalIndex: 0,
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    interact() {
      this.log(this.chatMessages);
      if (this.cutscenePlaying || this.choiceInputType > 0) {
        return;
      }
      this.log('a');
      if (this.chatMessages[this.chatMessageIndex]) {
        if (!this.chatSkippable && !this.filledChatMessage) {
          return;
        }
              this.log('b');
        if (!this.filledChatMessage) {
          this.instantFillChatMessage = true;
          return;
        }
              this.log('c');
        this.chatMessage = '';
        if (this.chatMessages[this.chatMessageIndex + 1]) {
                this.log('d');
          this.chatMessageOpacity = 'opacity-1';
          this.chatMessageIndex++;
          this.fillChatMessage();
          this.filledChatMessage = false;
          this.instantFillChatMessage = false;
          this.playSound('chat');
          return;
        } else {
          this.chatMessageIndex = 0;
          this.chatMessages = [];
          this.chatMessageOpacity = 'opacity-0';
          this.chatSkippable = true;
          this.paused = false;
                this.log('e');
          return;
        }
      }
            this.log('f');
      // Check if and which npc is in front of player
      let targetNPC = undefined;
      if (this.npcs) {
        for (let i = 0; i < this.npcs.length; i++) {
          let npc = this.npcs[i];
          this.log(npc);
          if (
            
            (this.facing === 0 && this.devX >= npc.x - npc.size * 0.5 && this.devX <= npc.x && this.devY + this.movement >= npc.y - npc.size * 1.5 + (-64 + npc.size) * 1.2 && this.devY + this.movement <= npc.y - npc.size + (-64 + npc.size) * 1.2) ||
            (this.facing === 1 && this.devX >= npc.x - npc.size * 0.5 && this.devX <= npc.x && this.devY - this.movement >= npc.y - npc.size * 1.5 + (-64 + npc.size) * 1.2 && this.devY - this.movement <= npc.y - npc.size + (-64 + npc.size) * 1.2) ||
            (this.facing === 2 && this.devX + this.movement >= npc.x - npc.size * 0.5 && this.devX + this.movement <= npc.x && this.devY >= npc.y - npc.size * 1.5 + (-64 + npc.size) * 1.2 && this.devY <= npc.y - npc.size + (-64 + npc.size) * 1.2) ||
            (this.facing === 3 && this.devX - this.movement >= npc.x - npc.size * 0.5 && this.devX - this.movement <= npc.x && this.devY >= npc.y - npc.size * 1.5 + (-64 + npc.size) * 1.2 && this.devY <= npc.y - npc.size + (-64 + npc.size) * 1.2)
          ) {
            targetNPC = npc;
          }
        }
      }
      for (let i = 0; i < this.loadedInteractions.positions.length; i++) {
        let pos = this.loadedInteractions.positions[i];
        if (targetNPC || (this.devX === pos.x && this.devY === pos.y && this.facing === pos.facing)) {
          let action = targetNPC ? this.loadedInteractions.actions[targetNPC.interactions[i]] : this.loadedInteractions.actions[pos.action];
          if (targetNPC) {
            this.npcs[targetNPC.id].direction = this.facing === 0 ? 1 : this.facing === 1 ? 0 : this.facing === 2 ? 3 : 2;
          }
          this.log(action);
          if (this.lockedDialogs.includes(action.name)) {
            continue;
          }
          if (action.instaLock) {
            this.lockedDialogs.push(action.name);
          }
          for (let i = 0; i < action.thisLocks.length; i++) {
            this.lockedDialogs.push(action.thisLocks[i]);
          }
          if (action.type === 'chat' || action.type === 'noise' || action.type === 'choice' || action.type === 'animal') {
            this.log(action);
            this.chatSkippable = action.skippable;
            this.chatMessageIndex = 0;
            this.chatMessages = action.messages.length > 0 ? action.messages : action.choices;
            this.chatMessageOpacity = 'opacity-100';
            this.playSound('chat');
            this.fillChatMessage();
            this.filledChatMessage = false;
            this.instantFillChatMessage = false;
            this.paused = true;
            this.action = action;
          }
          switch (action.type) {
            case 'noise':
              this.chatMessageOpacity = 'opacity-100 italic';
              break;
            case 'scene':
              this.nextScene = action.newScene;
              this.nextX = action.x ?? undefined;
              this.nextY = action.y ?? undefined;
              this.switchScene();
              break;
            case 'cutScene':
              this.loadCutscene(action.cutscene);
              break;
            case 'choice':
              this.chatMessages = action.choices;
              this.log('choice');
              this.interact();
              break;
            case 'animal':
              setTimeout(() => this.startAnimalFight(action.animalFightId), 1000);
          }
          return;
        }
      }
    },
    fillChatMessage() {
      setTimeout(() => {
        this.log('y');
        if (this.instantFillChatMessage) {
          this.chatMessage = this.chatMessages[this.chatMessageIndex];
          this.filledChatMessage = true;
          this.instantFillChatMessage = false;
          return;
        }
        this.log('z');
        this.log(this.chatMessage);
        this.log(this.chatMessages[this.chatMessageIndex].question);
        let mode = this.chatMessages[0].question ? 1 : 0; // 0 = use messages array, 1 = use choices array
        this.log(mode);
        if (this.chatMessage.length < this.chatMessages[this.chatMessageIndex].length && mode === 0) {
          this.log('v');
          this.chatMessage = this.chatMessage + this.chatMessages[this.chatMessageIndex][this.chatMessage.length];
          this.fillChatMessage();
        } else if (this.chatMessages[this.chatMessageIndex].question && this.chatMessage.length < this.chatMessages[this.chatMessageIndex].question.length && mode === 1) {
          this.log('x');
          this.chatMessage = this.chatMessage + this.chatMessages[this.chatMessageIndex].question[this.chatMessage.length];
          this.fillChatMessage();
        }
        else {
          this.filledChatMessage = true;
          // Activate choice in chatbox
          if (this.chatMessages[this.chatMessageIndex].question) {
            let choice = this.chatMessages[this.chatMessageIndex];
            this.choiceInputType = choice.inputType;
            document.getElementById('mainInput').focus();
            switch(choice.inputType) {
              case 0: // no choice, just chat message within choice menu
                break;
              case 1: // multiple choice, put choices in chatbox and enable choice selection
                this.selectedChoice = 0;
                this.choices = choice.choices;
                break;
              case 2: // text input, enable text input
                document.getElementById('choiceTextInput').focus();
                break;

            }
          }
        }
      }, 50);
    },
    load() {
      this.sceneVariables = sceneVariables.sceneVariables[this.sceneId];
      this.sceneX = this.newX ? this.newX + screen.width * 0.5 : this.sceneVariables.x + screen.width * 0.5;
      this.sceneY = this.nexY ? this.newY + screen.height * 0.5 : this.sceneVariables.y + screen.height * 0.5;
      this.devX = this.newX ?? this.sceneVariables.x;
      this.devY = this.newY ?? this.sceneVariables.y;
      this.newX = undefined;
      this.newY = undefined;
      this.chatMessage = '';
      this.chatMessages = [];
      this.chatMessageIndex = 0;
      this.chatMessageOpacity = 'opacity-0';
      this.scale = this.sceneVariables.scale;
      this.imageSource = this.sceneVariables.imageSource;
      this.movement = this.sceneVariables.movement;
      this.night = this.sceneVariables.night;
      this.lockedDialogs = [];
      this.npcs = this.sceneVariables.npcs;
      if (this.npcs.length) {
        this.npcLoop();
      }
      switch(this.sceneVariables.facing) {
        case 0:
          if (this.night) {
            this.spriteSource = '/assets/img/sprite1night.png';
          } else {
            this.spriteSource = '/assets/img/sprite1.png';
          }
          this.facing = 0;
          break;
        case 2:
          if (this.night) {
            this.spriteSource = '/assets/img/sprite3night.png';
          } else {
            this.spriteSource = '/assets/img/sprite3.png';
          }
          this.facing = 2;
          break;
        case 1:
          if (this.night) {
            this.spriteSource = '/assets/img/sprite2night.png';
          } else {
            this.spriteSource = '/assets/img/sprite2.png';
          }
          this.facing = 1;
          break;
        case 3:
          if (this.night) {
            this.spriteSource = '/assets/img/sprite4night.png';
          } else {
            this.spriteSource = '/assets/img/sprite4.png';
          }
          this.facing = 3;
          break;
      }
      this.showSprite = true;
      this.opacity = 1;
      this.stopMusic();
      this.playMusic(this.sceneVariables.musicSource, this.sceneVariables.musicVolume);
      this.loadedForbiddenAreas = forbiddenAreas.forbiddenAreas[this.sceneId].areas;
      this.loadedInteractions = interactions.interactions[this.sceneId];
      this.paused = false;
    },
    move(direction) {
      if (this.paused) {
        if (this.choiceInputType === 0) {
          return;
        }
        switch(direction) {
          case 'a':
            this.log('a');
            if (this.selectedChoice === 0) break;
            this.selectedChoice--;
            break;
          case 'd':
            if (this.selectedChoice === this.choices.length) break;
            this.selectedChoice++;
            break;
          case 'enter': //submit choice
            this.submitChoice();
            this.log('submitchoice');
            break;
        }
        return;
      }
      this.input = '';
      let newX = this.sceneX;
      let newY = this.sceneY;
      let newDevX = this.devX;
      let newDevY = this.devY;
      switch(direction) {
        case 'w':
          if (this.night) {
            this.spriteSource = '/assets/img/sprite1night.png';
          } else {
            this.spriteSource = '/assets/img/sprite1.png';
          }
          newY = this.sceneY + this.movement;
          newDevY = this.devY + this.movement;
          this.facing = 0;
          break;
        case 'a':
          if (this.night) {
            this.spriteSource = '/assets/img/sprite3night.png';
          } else {
            this.spriteSource = '/assets/img/sprite3.png';
          }
          newX = this.sceneX + this.movement;
          newDevX = this.devX + this.movement;
          this.facing = 2;
          break;
        case 's':
          if (this.night) {
            this.spriteSource = '/assets/img/sprite2night.png';
          } else {
            this.spriteSource = '/assets/img/sprite2.png';
          }
          newY = this.sceneY - this.movement;
          newDevY = this.devY - this.movement;
          this.facing = 1;
          break;
        case 'd':
          if (this.night) {
            this.spriteSource = '/assets/img/sprite4night.png';
          } else {
            this.spriteSource = '/assets/img/sprite4.png';
          }
          newX = this.sceneX - this.movement;
          newDevX = this.devX - this.movement;
          this.facing = 3;
          break;
      }
      for (let i = 0; i < this.loadedForbiddenAreas.length; i++) {
        let area = this.loadedForbiddenAreas[i];
        if (newDevX >= area.xb && newDevX <= area.xa && newDevY >= area.yb && newDevY <= area.ya) {
          return;
        }
      }
      // Player move into npc collision check & z index behind npc
      if (this.npcs) {
        for (let i = 0; i < this.npcs.length; i++) {
          let npc = this.npcs[i];
          if (this.devY > npc.y - npc.size * 1.5 + (-64 + npc.size) * 1.2 && (newDevX >= npc.x - 200 && newDevX <= npc.x + 200 && newDevY >= npc.y - 200 && newDevY <= npc.y + 400)) {
            this.spriteZIndex = 1;
          } else {
            this.spriteZIndex = 3;
          }
          if (newDevX >= npc.x - npc.size * 0.5 && newDevX <= npc.x && newDevY >= npc.y - npc.size * 1.5 + (-64 + npc.size) * 1.2 && newDevY <= npc.y - npc.size + (-64 + npc.size) * 1.2) {
            return;
          }
        }
        if (direction === 'w' || direction === 's') {
          this.sceneY = newY;
          this.devY = newDevY;
        } else {
          this.sceneX = newX;
          this.devX = newDevX;
        }
      }
    },
    playMusic(url, volume) {
      if (this.audio === false) {
        let x = document.getElementById('audio1');
        x.loop = true;
        x.src = url;
        x.play();
        x.volume = volume;
        this.audio = true;
      }
    },
    stopMusic() {
      this.audio = false;
      let x = document.getElementById('audio1');
      x.pause();
    },
    playSound(sound) {
      let x = document.getElementById('audio2');
      let y = document.getElementById('audio3');
      switch(sound) {
        case 'chat':
          x.src = '/assets/mp3/select.mp3';
          y.src = '/assets/mp3/chat.mp3';
          y.volume = 0.5;
          y.play();
          break;
      }
      x.play();
    },
    playSoundUrl(url) {
      let x = document.getElementById('audio4');
      x.src = url;
      x.play();
    },
    switchScene() {
      this.sceneId = this.nextScene;
      this.load();
    },
    loadCutscene(sceneId) {
      let cutscene = cutscenes.cutscenes[sceneId];
      this.stopMusic();
      this.cutsceneIndex = 0;
      this.cutsceneMessageIndex = 0;
      this.cuts = cutscene.cuts;
      this.nextScene = cutscene.nextScene;
      this.audio = false;
      if (cutscene.backgroundMusic) {
        this.playMusic(cutscene.backgroundMusic, cutscene.volume);
      }
      this.imageSource = '';
      this.showSprite = false;
      this.cutscenePlaying = true;
      this.playCutscene();
      this.opacity = 0;
      if (this.cuts[this.cutsceneIndex].imageSource) {
        this.imageSource = this.cuts[this.cutsceneIndex].imageSource;
        this.sceneX = this.cuts[this.cutsceneIndex].x + screen.width * 0.5;
        this.sceneY = this.cuts[this.cutsceneIndex].y + screen.height * 0.5;
        this.scale = this.cuts[this.cutsceneIndex].scale;
        this.opacity = 1;
      }
    },
    playCutscene() {
      setTimeout(() => {
        if (!this.cuts[this.cutsceneIndex + 1] && !this.cuts[this.cutsceneIndex].messages[this.cutsceneMessageIndex + 1]) {
          this.switchScene();
          this.cutscenePlaying = false;
          return;
        }
        let message = this.cuts[this.cutsceneIndex].messages[this.cutsceneMessageIndex].message;
        this.chatMessages = [];
        if (message) {
          this.chatMessages.push(message);
          this.instantFillChatMessage = false;
          this.chatMessage = '';
          this.chatMessageIndex = 0;
          this.chatMessageOpacity = 'opacity-100';
          if (this.cuts[this.cutsceneIndex].messages[this.cutsceneMessageIndex].instafill) {
            this.instantFillChatMessage = true;
          }
          this.fillChatMessage();
          if (this.cuts[this.cutsceneIndex].messages[this.cutsceneMessageIndex].sound) {
            this.playSound('chat');
          }
        } else {
          this.chatMessageOpacity = 'opacity-0';
        }
        if (this.cuts[this.cutsceneIndex].messages[this.cutsceneMessageIndex + 1]) {
          this.cutsceneMessageIndex++;
        } else {
          this.cutsceneMessageIndex = 0;
          this.cutsceneIndex++;
          if (this.cuts[this.cutsceneIndex].imageSource) {
            this.imageSource = this.cuts[this.cutsceneIndex].imageSource;
            this.sceneX = this.cuts[this.cutsceneIndex].x + screen.width * 0.5;
            this.sceneY = this.cuts[this.cutsceneIndex].y + screen.height * 0.5;
            this.scale = this.cuts[this.cutsceneIndex].scale;
            this.opacity = 0.8;
          } else {
            this.opacity = 0;
          }
          if (this.cuts[this.cutsceneIndex].audioSource) {
            this.playSoundUrl(this.cuts[this.cutsceneIndex].audioSource);
          }
        }
        this.playCutscene();
      }, this.cuts[this.cutsceneIndex].messages[this.cutsceneMessageIndex].time);
    },
    log(data) {
      if (typeof data === 'string' || parseInt(data)) {
        this.console.unshift(data);
      } else if (typeof data === 'object' || Array.isArray(data)) {
        this.console.unshift(JSON.stringify(data));
      } else {
        this.console.unshift(data);
      }
    },
    // Move random npc
    npcLoop() {
      setTimeout(() => {
        if (!this.npcs || this.paused) {
          this.npcLoop();
          return;
        }
        let randomNPC = this.npcs[Math.floor(Math.random() * this.npcs.length)];
        if (!randomNPC.path[this.npcs[randomNPC.id].pathIndex]) {
          this.npcs[randomNPC.id].pathIndex = 0;
        }
        this.npcs[randomNPC.id].direction = randomNPC.path[this.npcs[randomNPC.id].pathIndex].direction;
        let newX = this.npcs[randomNPC.id].x + randomNPC.path[this.npcs[randomNPC.id].pathIndex].x * this.movement;
        let newY = this.npcs[randomNPC.id].y + randomNPC.path[this.npcs[randomNPC.id].pathIndex].y * this.movement;
        // Cancel movement if collision
        if (this.devX >= newX - this.npcs[randomNPC.id].size * 0.5 && this.devX <= newX && this.devY >= newY - this.npcs[randomNPC.id].size * 1.5 + (-64 + this.npcs[randomNPC.id].size) * 1.2 && this.devY <= newY - this.npcs[randomNPC.id].size + (-64 + this.npcs[randomNPC.id].size) * 1.2) {
          this.npcLoop();
          return;
        }
        this.npcs[randomNPC.id].x = newX;
        this.npcs[randomNPC.id].y = newY;
        this.npcs[randomNPC.id].pathIndex++;
        this.npcLoop();
      }, Math.random() * 1000 + 1000);
    },
    async submitChoice() {
      let choice = this.chatMessages[this.chatMessageIndex];
      if (choice.keepData) {
        this.choiceData.push(this.choiceTextInput.length > 0 ? this.choiceTextInput : this.selectedChoice);
      }
      if (choice.consequence > -1) {
        const result = await consequences(choice.consequence, this.selectedChoice, this.choiceTextInput, this.choiceData);
        if (result.success) {
          if (result.fightResponse) {
            this.fightResponse(result.fightResponse);
            return;
          }
          if (choice.resetDataAfterConsequence) {
            this.choiceData = [];
          }
          if (choice.nextChoice.length > 0) {
            this.chatMessageIndex = choice.nextChoice[this.selectedChoice] - 1;
            setTimeout(() => this.interact(), 500);
          } else {
            if (this.action.newScene) {
              this.log(this.action);
              this.switchScene();
            }
            this.chatMessageIndex = 0;
            this.chatMessages = [];
            this.chatMessageOpacity = 'opacity-0';
            this.chatMessage = '';
            this.chatSkippable = true;
            this.paused = false;
          }
          this.choiceTextInput = '';
          this.selectedChoice = 0;
          this.choiceInputType = 0;
          this.choices = [];
          return;
        }
        if (!result.success && result.error) {
          this.chatMessage = result.error;
          this.chatMessageIndex--;
          this.choiceData.pop();
          if (choice.resetDataAfterConsequence) {
            this.choiceData = [];
          }
          if (result.choiceAfterError || result.choiceAfterError === 0) {
            console.log(result.choiceAfterError);
            this.choiceTextInput = '';
            this.selectedChoice = 0;
            this.choiceData = [];
            this.chatMessageIndex = result.choiceAfterError - 1;
          }
          setTimeout(() => {this.choiceInputType = 0; this.choices = []; this.chatMessage = ''; this.interact()}, 3000);
          return;
        }
      }
      if (choice.resetDataAfterConsequence) {
        this.choiceData = [];
      }
      if (choice.nextChoice.length > 0) {
        this.chatMessageIndex = choice.nextChoice[this.selectedChoice] - 1;
        this.log(this.chatMessageIndex);
      } else {
        this.chatMessageIndex = 999;
      }
      this.choiceTextInput = '';
      this.selectedChoice = 0;
      this.choiceInputType = 0;
      this.choices = [];
      this.interact();
    },
    async startAnimalFight(id) {
      try {
        this.chatMessageIndex = 0;
        this.chatMessage = '';
        const result = await service.startAnimalFight(id);
        console.log(result);
        this.stopMusic();
        this.audio = false;
        this.paused = true;
        let scene = sceneVariables.sceneVariables[4];
        console.log(scene);
        if (scene.musicSource) {
          this.playMusic(scene.musicSource, scene.musicVolume);
        }
        this.interactions = [];
        setTimeout(() => {
          this.opacity = 0;
          this.imageSource = '';
          this.showSprite = false;
          this.npcs = [];
        }, 2000);
        setTimeout(() => {
          if (scene.imageSource) {
            this.imageSource = scene.imageSource;
            this.sceneX = scene.x + screen.width * 0.5;
            this.sceneY = scene.y + screen.height * 0.5;
            this.scale = scene.scale;
            this.opacity = 1
          }
        }, 4000);
        setTimeout(() => {
          this.battle = result.data;
          this.fightBeginTurn();
        }, 6000);
      } catch (error) {
        console.error(error);
      }
    },
    fightBeginTurn() {
      let animal = this.battle.ownAnimals[this.fightingAnimalIndex];
      let choices = [animal.move1name];
      if (animal.move2name) {
        choices.push(animal.move2name);
      }
      if (animal.move3name) {
        choices.push(animal.move3name);
      }
      if (animal.move4name) {
        choices.push(animal.move4name);
      }
      this.chatMessages = [
        {
            id: 0,
            question: "nothing",
            choices: [],
            inputType: 0,
            nextChoice: [],
            consequence: -1,
            keepData: false,
        },
        {
            id: 1,
            question: "What does " + animal.name + " need to do?",
            choices: choices,
            inputType: 1,
            nextChoice: [],
            consequence: 4,
            keepData: true,
        },
      ];
      this.log(this.chatMessages);
      setTimeout(() => this.interact(), 2000);
    },
    fightResponse(response) {
      // chat messages in fight
      const chatMessages = [

      ]
    }
  },
});
</script>

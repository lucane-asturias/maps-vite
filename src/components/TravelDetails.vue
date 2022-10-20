<template>
  <div v-if="distance" class="travel-container column">
    <div class="col"> Distancia: <strong>{{ distance }} kms</strong> </div>
    <div class="col"> Duração: 
      <strong v-if="hours !== 0">
        {{ hours }} {{ hours < 2 ? 'hora' : 'horas' }} e 
      </strong>
      <strong>
        {{ minutes }} {{ minutes < 2 ? 'minuto' : 'minutos' }}
      </strong> 
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMap } from '@/composables';

  const { distance, hours, minutes } = useMap()
</script>


<style scoped>
.travel-container {
  background-color: white;
  border-radius: 10px;
  bottom: 50px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 22px;
  left: 20px;
  padding: 10px;
  position: fixed;
  width: 470px;
}

strong {
  color: #42b983;
}
</style>
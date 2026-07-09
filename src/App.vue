<script setup>
import BottomNav from './components/BottomNav.vue'
import OrderFlowModal from './components/OrderFlowModal.vue'
</script>

<template>
  <div class="phone-frame font-body text-ink">
    <main class="flex-1 overflow-y-auto pb-28 bg-sand">
      <router-view v-slot="{ Component }">
        <Transition name="view-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <BottomNav />
    <OrderFlowModal />
  </div>
</template>

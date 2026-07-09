<script setup>
import { useAuthStore } from './stores/auth.js'
import BottomNav from './components/BottomNav.vue'
import OrderFlowModal from './components/OrderFlowModal.vue'
import ToastStack from './components/ToastStack.vue'
import Mascot from './components/Mascot.vue'

const auth = useAuthStore()
</script>

<template>
  <div class="phone-frame font-body text-ink">
    <main class="flex-1 overflow-y-auto bg-sand" :class="auth.isAuthenticated ? 'pb-28' : ''">
      <router-view v-slot="{ Component }">
        <Transition name="view-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <template v-if="auth.isAuthenticated">
      <BottomNav />
      <OrderFlowModal />
      <Mascot />
    </template>
    <ToastStack />
  </div>
</template>

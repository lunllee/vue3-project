<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useSidebarStore } from '@/stores/sidebar'
const sidebar = useSidebarStore()
</script>

<template>
  <aside :class="`${sidebar.collapsed && 'collapsed'}`">
    <div class="menu">
      <RouterLink class="button" to="/">
        <span class="font-awesome-icon">
          <font-awesome-icon icon="gauge" />
        </span>
        <span class="text">대시보드</span>
      </RouterLink>
      <RouterLink class="button" to="/system">
        <span class="font-awesome-icon">
          <font-awesome-icon icon="gear" />
        </span>
        <span class="text">시스템 설정</span>
      </RouterLink>
    </div>

    <span 
      class="collapse-icon"
      :class="{ 'rotate-180': sidebar.collapsed }"
      @click="sidebar.toggleSidebar"
    >
      <font-awesome-icon icon="angles-left" />
    </span>
  </aside>
</template>

<style>
:root {
  --sidebar-bg-color: #0c2246;
  --sidebar-item-hover: #0c2246;
  --sidebar-item-active: #5e3afa;
  --sidebar-width: 240px;
  --sidebar-collapsed-width: calc(1rem + 32px);
  --menu-color: rgba(255, 255, 255, 0.5);
  --menu-hover-color: rgba(255, 255, 255, 1);
}
</style>
<style scoped lang="scss">
aside {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  width: var(--sidebar-width);
  padding: 1rem;

  color: white;
  background-color: var(--sidebar-bg-color);

  transition: 0.2s ease-out;

  .button .text {
    opacity: 1;
  }

  .menu {
    position: fixed;
    width: var(--sidebar-width);
    margin: 0 -1rem;
    margin-top: 4rem;

    transition: 0.2s ease-out;
  
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
    
      padding: 0.5rem 2rem;
      transition: 0.2s ease-out;
  
      .font-awesome-icon {
        font-size: 1rem;
        color: var(--menu-color);
        margin-right: 1rem;
        transition: 0.2s ease-out;
      }
  
      .text {
        color: var(--menu-color);
        transition: 0.2s ease-out;
        transition-delay: 0.1s;
      }
  
      &:hover, &.router-link-exact-active {
        
        .font-awesome-icon, .text {
          color: var(--menu-hover-color);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid #5e3afa;
      }
    }
  }

  &.collapsed {
    width: var(--sidebar-collapsed-width);

    .button .text {
      opacity: 0;
      font-size: 0;
      transition: 0.1s ease-out;
    }

    .menu {
      width: var(--sidebar-collapsed-width);
      margin: 0 -1rem;
      margin-top: 4rem;

      transition: 0.1s ease-out;
    }

    .rotate-180 {
      margin: 0 -1rem;
    }

    .button {
      padding: 0.5rem 1rem;
      .font-awesome-icon{
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 100;
  }
}

.collapse-icon {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  padding: 0.75em;

  color: var(--menu-color);

  transition: 0.2s linear;

  cursor: pointer;

  &:hover {
    color: var(--menu-hover-color);
  }
}

.rotate-180 {
  transform: rotate(180deg);
  transform: 0.2s linear;
}
</style>
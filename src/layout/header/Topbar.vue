<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <!--begin::User-->
    <div
      class="d-flex align-items-center ms-1 ms-lg-3"
      id="kt_header_user_menu_toggle"
    >
      <!--begin::Menu-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <img :src="imgPerfil" alt="perfil" />
      </div>
      <KTUserMenu></KTUserMenu>
      <!--end::Menu-->
    </div>
    <!--end::User -->
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";

export default defineComponent({
  name: "topbar",
  components: {
    KTUserMenu
  },
  setup() {
    const store = useStore();
    const user = store.getters.currentUser;
    const imgPerfil = ref(user.imagem);
    return {
      imgPerfil
    }
  }
});
</script>

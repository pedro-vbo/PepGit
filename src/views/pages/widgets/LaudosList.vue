<template>
  <div id="style-4">
    <div className="card card-custom">
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">
          Últimos Laudos Efetuados
        </h3>
      </div>
      <div className="card-body pt-2" v-for="laudo in laudos" :key="laudo.id">
        <div className="d-flex flex-wrap align-items-center border-bottom pb-5">
          <span
            className="d-flex align-items-center w-100 justify-content-between"
          >
            <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
              <span class="fs-5"
                >{{ laudo.marca }} - {{ laudo.modelo }} |
                {{ laudo.placa }}</span
              >
              <span>{{ laudo.nome }}</span>
            </div>
            <router-link
              class="btn btn-sm btn-light-primary"
              :to="{ name: 'Cadastrar-laudo', params: { analiseId: laudo.id } }"
            >
              <i class="bi bi-ui-checks fs-3"></i> Ver laudo
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "ClientesList",
  components: { RouterLink },
  props: {
    laudos: Array
  },
  setup() {
    return {
      RouterLink
    };
  }
});
</script>

<template>
  <div class="d-flex flex-column mb-10 bg-light rounded p-5">
    <span class="fw-bold fs-1">{{ resposta.item }}</span>
    <span class="mb-3"> Categoria: {{ resposta.categoria }} </span>
    <div class="d-flex align-items-center justify-content-start">
      <label
        class="form-check form-check-lg form-check-custom form-check-solid pe-5"
      >
        <Field
          class="form-check-input"
          type="radio"
          :name="resposta.itemId"
          :value="1"
          v-model="resposta.resposta"
          @change="atualizarResposta"
        />
        <span class="form-check-label d-flex align-items-center">
          <i class="bi bi-check-lg fs-3 text-success"></i>
        </span>
      </label>
      <label
        class="form-check form-check-lg form-check-custom form-check-solid pe-5"
      >
        <Field
          class="form-check-input"
          type="radio"
          :name="resposta.itemId"
          :value="2"
          v-model="resposta.resposta"
          @change="atualizarResposta"
        />
        <span class="d-flex align-items-center form-check-label">
          <i class="bi bi-exclamation-diamond fs-3 text-danger"></i>
        </span>
      </label>
      <label
        class="form-check form-check-lg form-check-custom form-check-solid"
      >
        <Field
          class="form-check-input"
          type="radio"
          :name="resposta.itemId"
          :value="0"
          v-model="resposta.resposta"
          @change="atualizarResposta"
        />
        <span class="form-check-label fw-bold text-gray-700 fs-5">
          Não se aplica
        </span>
      </label>
    </div>
    <Field
      name="obs"
      as="textarea"
      rows="3"
      class="border border-secondary mt-3"
      v-model="resposta.observacao"
      @change="atualizarResposta"
    />
  </div>
</template>

<script lang="ts">
import { Field } from "vee-validate";
import { defineComponent, ref } from "vue";
import emitter from "tiny-emitter/instance";

export default defineComponent({
  name: "Pergunta",
  components: { Field },
  props: {
    pergunta: Object
  },
  setup(context) {
    const resposta = ref(context.pergunta);
    function atualizarResposta() {
      emitter.emit("atualizarResposta", resposta.value);
    }
    return {
      Field,
      resposta,
      atualizarResposta
    };
  }
});
</script>

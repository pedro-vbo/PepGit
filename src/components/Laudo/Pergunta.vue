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
    <div class="">
      <!-- <h4>Fotos já adicionadas</h4> -->
      <div class="d-flex flex-nowrap overflow-auto align-items-start my-3">
        <template v-for="(evidencia, index) in imagens" :key="index">
          <img :src="evidencia.url" class="img-thumbnail mw-100px me-1" />
        </template>
      </div>
      <button
        class="btn btn-sm btn-secondary d-flex align-items-center"
        @click="
          () => {
            input.click();
          }
        "
      >
        <i class="fa fa-camera fs-3"></i>
        <span>Adicionar imagens</span>
      </button>
      <input
        type="file"
        multiple="multiple"
        @change="onFileAdd"
        class="form-control-file d-none"
        id="my-file"
        :ref="
          (el) => {
            input = el;
          }
        "
      />
      <div class="border p-2 mt-3" v-if="previewList.length">
        <h4>Imagens para adicionar:</h4>
        <div class="d-flex flex-nowrap overflow-auto align-items-start mb-3">
          <div v-for="(item, j) in previewList" :key="j" class="overlay">
            <div class="overlay-wrapper">
              <img :src="item" class="img-thumbnail mw-100px me-1" />
            </div>
            <div class="overlay-layer bg-dark bg-opacity-10">
              <button @click="removeImagem(j)"  class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    pergunta: Object,
    imagens: Array,
  },
  setup(context) {
    const resposta = ref<any>(context.pergunta);
    resposta.value.imagens = [];
    const input = ref<HTMLInputElement>();
    const previewList = ref<any>([]);

    const atualizarResposta = () => {
      emitter.emit("atualizarResposta", resposta.value);
    };

    const removeImagem = (index) => {
      previewList.value.splice(index, 1);
      resposta.value.imagens.splice(index, 1);
      atualizarResposta();
    }

    const onFileAdd = (event) => {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            previewList.value.push(e.target.result);
            resposta.value.imagens.push(
              e.target.result.replace(/^data:image\/[a-z]+;base64,/, "")
            );
            atualizarResposta();
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    };

    return {
      Field,
      resposta,
      input,
      onFileAdd,
      previewList,
      atualizarResposta,
      removeImagem
    };
  },
});
</script>

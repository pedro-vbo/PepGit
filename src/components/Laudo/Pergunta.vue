<template>
  <div class="d-flex flex-column mb-10 bg-light rounded p-5">
    <span class="fw-bold fs-1">{{ resposta.item }}</span>
    <!-- <span class="mb-3"> Categoria: {{ resposta.categoria }} </span> -->
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
        <div
          v-for="(evidencia, index) in evidencias"
          :key="index"
          class="overlay"
        >
          <div class="overlay-wrapper">
            <img
              :src="evidencia.url"
              class="img-thumbnail mw-100px me-1"
              v-if="isImage(evidencia.url)"
            />
            <video class="mw-200px me-1" controls v-else>
              <source :src="evidencia.url" />
            </video>
          </div>
          <div class="overlay-layer bg-dark bg-opacity-10">
            <button
              @click="removeEvidencia(evidencia.id, index)"
              class="btn btn-sm btn-danger"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
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
        accept="video/*|image/*"
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
              <img
                :src="item"
                class="img-thumbnail mw-100px me-1"
                v-if="item.indexOf('data:image') >= 0"
              />
              <video class="mw-200px me-1" controls v-else>
                <source :src="item" />
              </video>
            </div>
            <div class="overlay-layer bg-dark bg-opacity-10">
              <button @click="removeImagem(j)" class="btn btn-sm btn-danger">
                <i class="fas fa-trash"></i>
              </button>
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
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "Pergunta",
  components: { Field },
  props: {
    pergunta: Object,
    imagens: Array,
  },
  setup(context) {
    const resposta = ref<any>(context.pergunta);
    const evidencias = ref<any>(context.imagens);
    resposta.value.imagens = [];
    const input = ref<HTMLInputElement>();
    const previewList = ref<any>([]);

    const atualizarResposta = () => {
      console.log("resposta", resposta.value);
      emitter.emit("atualizarResposta", resposta.value);
    };

    const enviarImagem = (imagem, itemId, categoria) => {
      emitter.emit("enviarImagem", imagem, itemId, categoria);
    };

    const isImage = (fileUrl) => {
      const imgExtensions = ["jpg", "png", "jpeg", "bmp"];
      const videoExtensions = ["mkv", "mp4", "webm"];
      const lastDot = fileUrl.lastIndexOf(".");

      const ext = fileUrl.substring(lastDot + 1);

      if (imgExtensions.includes(ext)) {
        return true;
      } else {
        return false;
      }
    };

    const removeImagem = (index) => {
      previewList.value.splice(index, 1);
      resposta.value.imagens.splice(index, 1);
      atualizarResposta();
    };

    const removeEvidencia = (id, index) => {
      evidencias.value.splice(index, 1);
      ApiService.delete("/evidencia/excluir/" + id).then(({ data }) => {
        console.log("data", data);
      });
    };

    const compress = (img, size) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const initSize = img.src.length;
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      //Base color
      if (ctx !== null) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
      }
      //Minimum compression
      const ndata = canvas.toDataURL("image/jpeg", size);
      console.log("* * * * * * * * * *");
      // console.log(ndata)
      console.log(ndata.length / 1024);
      return ndata;
    };

    const onFileAdd = (event) => {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const result = e.target.result;
            previewList.value.push(result);
            if (result.indexOf("data:image") >= 0) {
              const img = new Image();
              img.src = e.target.result;
              img.onload = function () {
                const data = compress(img, 0.5);
                const imagem = data.replace(/^data:image\/[a-z]+;base64,/, "");
                resposta.value.imagens.push(imagem);
                enviarImagem(
                  imagem,
                  resposta.value.itemId,
                  resposta.value.categoria
                );
                atualizarResposta();
              };
            } else {
              const imagem = e.target.result.replace(
                /^data:video\/[a-z,0-9]+;base64,/,
                ""
              );
              resposta.value.imagens.push(imagem);
              enviarImagem(
                imagem,
                resposta.value.itemId,
                resposta.value.categoria
              );
              atualizarResposta();
            }
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
      evidencias,
      previewList,
      atualizarResposta,
      removeImagem,
      removeEvidencia,
      isImage,
    };
  },
});
</script>

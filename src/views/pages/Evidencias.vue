<template>
  <main class="d-flex align-items-center justify-content-center">
    <div class="card card-custom gutter-b example example-compact w-100">
      <div class="card-header d-flex flex-column">
        <h1 class="mt-4">Iniciar Laudo</h1>
        <span class="text-muted font-weight-bold font-size-sm my-1">
          {{ model.analise.marca }} - {{ model.analise.modelo }} |
          {{ model.analise.placa }}
        </span>
        <span class="text-muted mb-4 font-weight-bold font-size-sm">
          Cliente:
          <span class="text-dark font-weight-bold">{{
            model.analise.nome
          }}</span>
        </span>
      </div>
      <div class="accordion" id="accordionEvidencias">
        <template v-for="(categoria, i) in model.perguntas" :key="i">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button bg-white text-dark fs-1 text-center"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + categoria.value"
                aria-expanded="true"
                :aria-controls="categoria.value"
              >
                {{ categoria.text }}
              </button>
            </h2>
            <div
              :id="categoria.value"
              class="accordion-collapse collapse"
              :class="{ show: i === 0 }"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionEvidencias"
            >
              <div class="card-body mb-10">
                <div class="">
                  <div
                    class="d-flex flex-nowrap overflow-auto align-items-start mb-3"
                  >
                    <template
                      v-for="(evidencia, index) in categoriaFilter(
                        categoria.value
                      )"
                      :key="index"
                    >
                      <img
                        :src="evidencia.url"
                        class="img-thumbnail mw-100px"
                      />
                    </template>
                  </div>
                  <button
                    class="btn btn-light-primary d-flex align-items-center"
                    @click="
                      () => {
                        inputs[i].click();
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
                      el => {
                        inputs[i] = el;
                      }
                    "
                  />
                  <div class="border p-2 mt-3" v-if="previewList.length">
                    <p>Imagens para adicionar:</p>
                    <div
                      class="d-flex align-items-center justify-content-start flex-wrap"
                    >
                      <template v-for="(item, j) in previewList" :key="j">
                        <img :src="item" class="img-thumbnail mw-100px" />
                      </template>
                    </div>
                  </div>
                </div>
                <div class="progress mt-3 mb-3">
                  <div
                    class="progress-bar progress-bar-striped"
                    role="progressbar"
                    style="width: 0%"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :ref="
                      el => {
                        progressBars[i] = el;
                      }
                    "
                  ></div>
                </div>
                <button
                  @click="enviar(categoria.value, i)"
                  class="
                    btn btn-success
                    mt-5
                  "
                >
                  <span>Enviar respostas {{ categoria.text }}</span>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
interface Evidencia {
  url: string;
  categoria: string;
}

import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUpdate,
  computed
} from "vue";
import { saveToken } from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import emitter from "tiny-emitter/instance";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "Laudo",
  components: {},
  setup() {
    saveToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlBlZHJvIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJuYmYiOjE2MjUwOTk2MzQsImV4cCI6MTY1NjYzNTYzNCwiaWF0IjoxNjI1MDk5NjM0fQ.SFpPm7a5AIKjIkb0rwXIi5DxqI_pjAaNG4XtPw-_VJk"
    );
    ApiService.setHeader();

    const route = useRouter();
    const model = reactive({
      perguntas: [
        { text: "Conservação", value: "Conservacao" },
        { text: "Estrutura", value: "Estrutura" },
        { text: "Extra", value: "Extra" },
        { text: "Funcionamento", value: "Funcionamento" },
        { text: "Identificação", value: "Identificacao" },
        { text: "Pintura", value: "Pintura" }
      ],
      analiseId: computed(() => {
        return route.currentRoute.value.params.analiseId;
      }),
      analise: { marca: "", modelo: "", placa: "" }
    });

    let imageList: Array<Evidencia> = [];
    const previewList = ref<any>([]);
    const progressBars = ref<any>([]);
    const inputs = ref<any>([]);
    let progressBar;

    onBeforeUpdate(() => {
      inputs.value = [];
      progressBars.value = [];
    });

    const onFileAdd = event => {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            previewList.value.push(e.target.result);
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    };

    const onUpload = status => {
      const percent = (status.loaded / status.total) * 100;
      const progress = Math.round(percent);
      progressBar.setAttribute("style", "width: " + progress.toString() + "%");
      if (progress === 100) {
        Swal.fire({
          text: "Imagens enviadas com sucesso",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok ",
          customClass: {
            confirmButton: "btn fw-bold btn-light-success"
          }
        });
      }
    };

    const enviar = (categoria: string, index) => {
      progressBar = progressBars.value[index];
      const formData = new FormData();

      Array.prototype.forEach.call(inputs.value[index].files, file => {
        formData.append("imagens", file);
      });

      formData.append("categoria", categoria);
      formData.append("analiseId", model.analiseId.toString());

      ApiService.post("analise/upload", formData, {
        onUploadProgress: onUpload,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(resp => {
        console.log(resp);
      });
    };

    const categoriaFilter = categoria => {
      return imageList.filter(x => { return x.categoria === categoria })
    };

    onMounted(() => {
      ApiService.get(`analise?id=${model.analiseId}`).then(({ data }) => {
        model.analise = data;
      });
      ApiService.get(`analise/evidencias?id=${model.analiseId}`).then(({ data }) => {
        imageList = data;
      });
    });

    return {
      model,
      previewList,
      onFileAdd,
      enviar,
      inputs,
      categoriaFilter,
      progressBars
    };
  }
});
</script>

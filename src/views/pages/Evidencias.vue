<template>
  <main class="d-flex align-items-center justify-content-center">
    <div class="card card-custom gutter-b example example-compact w-100">
      <div class="card-header d-flex flex-column">
        <h1 class="mt-4">Iniciar Laudo</h1>
        <span class="text-muted font-weight-bold font-size-sm my-1">
          {{ cadastro.marca }} - {{ cadastro.modelo }} |
          {{ cadastro.placa }}
        </span>
        <span class="text-muted mb-4 font-weight-bold font-size-sm">
          Cliente:
          <span class="text-dark font-weight-bold">{{
            cadastro.nome
          }}</span>
        </span>
      </div>
      <div class="container-fluid mb-6">
        <div class="row">
          <div class="col-md-4">
        <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">Foto principal</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                style="background-image: url(media/avatars/carros.jpg)"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-100px h-100px"
                  :style="`background-image: url('${cadastro.imagem ? cadastro.imagem : previewImage}')`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="
                    btn btn-icon btn-circle btn-active-color-primary
                    w-25px
                    h-25px
                    bg-white
                    shadow
                  "
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input
                    type="file"
                    name="avatar"
                    @change="onFotoPrincipalAdd"
                    accept=".png, .jpg, .jpeg"
                    ref="imagem"
                  />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="
                    btn btn-icon btn-circle btn-active-color-primary
                    w-25px
                    h-25px
                    bg-white
                    shadow
                  "
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Aceito somente arquivos de imagem</div>
              <!--end::Hint-->
            </div>
          </div>
          <div class="col-md-8">
            <label class="col-lg-4 col-form-label fw-bold fs-6">Parecer final</label>
            <div class="col-lg-8">
              <!--begin::Image input-->
              <textarea class="w-100" rows="5" v-model="cadastro.parecerFinal"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="btn btn-success" @click="salvarParecerFinaleFoto">Salvar alterações</button>
          </div>
        </div>
        <!--end::Col-->
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
                  <h4>Fotos já adicionadas</h4>
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
                    <h4>Imagens para adicionar:</h4>
                    <div
                      class="d-flex flex-nowrap overflow-auto align-items-start mb-3"
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
      })
    });

    const cadastro = ref<any>({});

    let imageList: Array<Evidencia> = [];
    const previewList = ref<any>([]);
    const previewImage = ref("media/avatars/carros.jpg");
    const progressBars = ref<any>([]);
    const inputs = ref<any>([]);
    const imagem = ref<any>();
    let progressBar;

    onBeforeUpdate(() => {
      inputs.value = [];
      progressBars.value = [];
    });

    const onFotoPrincipalAdd = event => {
      cadastro.value.imagem = null;
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            previewImage.value = e.target.result;
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    };

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

    const removeImage = () => {
      cadastro.value.imagem = null;
      previewImage.value = "media/avatars/carros.png";
    };

    const salvarParecerFinaleFoto = () => {
      const formData = new FormData();
      formData.append("imagem", imagem.value.files[0]);
      formData.append("analiseId", model.analiseId.toString());
      formData.append("parecer", cadastro.value.parecerFinal);

      ApiService.post("analise/parecer-final", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(() => {
        Swal.fire({
          text: "Informações salvas com sucesso",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          }
        });
      })
    }

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
        cadastro.value = data;
      });
      ApiService.get(`analise/evidencias?id=${model.analiseId}`).then(({ data }) => {
        imageList = data;
      });
    });

    return {
      model,
      cadastro,
      imagem,
      previewImage,
      previewList,
      onFotoPrincipalAdd,
      removeImage,
      onFileAdd,
      enviar,
      inputs,
      categoriaFilter,
      progressBars,
      salvarParecerFinaleFoto
    };
  }
});
</script>

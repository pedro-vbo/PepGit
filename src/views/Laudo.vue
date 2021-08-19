<template>
  <div class="page d-flex flex-row flex-column-fluid">
    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
      <!-- begin:: Content -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <!-- begin:: Content Body -->
        <div class="post d-flex flex-column-fluid">
          <div class="container">
            <div className="card card-custom">
              <div className="card-body pt-2">
                <div className="d-flex flex-wrap align-items-center">
                  <div
                    className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3"
                  >
                    <div class="row mb-3">
                      <div class="col-lg-6">
                        <img
                          src="media/logos/Pryal Horizontal Tagline.png"
                          class="mw-200px mb-5"
                        />
                        <div class="row">
                          <div
                            class="col-6 d-flex flex-column align-items-center py-5"
                          >
                            <h3>Parecer final</h3>
                            <span class="d-flex align-items-center text-info">
                              <!-- <i
                                class="fa fa-check-circle text-success me-3"
                                style="font-size: 50px"
                              ></i>
                              Aprovado -->
                              {{ model.laudo.parecerFinal }}
                            </span>
                            <span class="mt-5"
                              ><span class="fs-8 text-muted"
                                >Data do laudo </span
                              ><span class="fs-8">{{
                                model.laudo.data
                              }}</span></span
                            >
                          </div>
                          <div
                            class="col-6 d-flex justify-content-center align-items-center"
                          >
                            <img
                              src="media\misc\QRCode.png"
                              style="width: 100px"
                            />
                          </div>

                          <hr class="mt-5" />
                        </div>
                        <div class="row">
                          <div class="col-6 col-lg-12 mb-3">
                            <div class="row">
                            <!--begin::Label-->
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Marca</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark">{{
                                model.laudo.marca
                              }}</label>
                            </div>
                          </div>
                          <div class="col-6 col-lg-12 mb-3">
                            <!--begin::Label-->
                            <div class="row">
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Modelo</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark">{{
                                model.laudo.modelo
                              }}</label>
                            </div>
                          </div>
                          <div class="col-6 col-lg-12 mb-3">
                            <div class="row">
                              <!--begin::Label-->
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Km</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark">{{
                                model.laudo.quilometragem
                              }}</label>
                            </div>
                          </div>
                          <div class="col-6 col-lg-12 mb-3">
                            <div class="row">
                            <!--begin::Label-->
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Ano Fab/Mod</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark"
                                >{{ model.laudo.anoFabricacao }} /
                                {{ model.laudo.anoModelo }}</label
                              >
                            </div>
                          </div>
                          <div class="col-6 col-lg-12 mb-3">
                            <div class="row">
                              <!--begin::Label-->
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Placa</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark">{{
                                model.laudo.placa
                              }}</label>
                            </div>
                          </div>
                          <div class="col-6 col-lg-12 mb-3">
                            <div class="row">
                              <!--begin::Label-->
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Chassi</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark">{{
                                model.laudo.chassi
                              }}</label>
                            </div>
                          </div>
                          <div class="col-6 col-lg-12 mb-3">
                            <div class="row">
                              <!--begin::Label-->
                              <label
                                class="
                                  col-lg-5
                                  fs-5
                                  fw-bold
                                  align-middle
                                  text-muted
                                "
                                >Renavam</label
                              >
                              <!--end::Label-->

                              <!--begin::Col-->
                              <label class="col-lg-7 fs-5 fw-bold text-dark">{{
                                model.laudo.renavam
                              }}</label>
                            </div>
                          </div>
                        </div>
                        <div class="row d-block d-lg-none">
                          <hr />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-7">
                            <div
                              class="card border border-2 position-relative"
                              style="border-color: #15151e !important"
                            >
                              <div className="card-body p-3">
                                <div
                                  class="
                                    d-flex
                                    justify-content-center
                                    flex-grow-1
                                    py-1
                                    position-relative
                                  "
                                  style="background-color: #15151e"
                                >
                                  <div
                                    class="
                                      bg-white
                                      p-2
                                      rounded
                                      border border-3
                                      position-absolute
                                    "
                                    style="
                                      top: -7px;
                                      left: -5px;
                                      border-color: #15151e !important;
                                    "
                                  >
                                    <img
                                      src="media/logos/Pryal P.png"
                                      class="mw-30px"
                                    />
                                  </div>
                                  <span class="text-white">{{
                                    model.laudo.marca
                                  }}</span>
                                </div>
                                <img
                                  class="mw-100"
                                  :src="model.laudo.imagem"
                                  alt=""
                                />
                                <div
                                  class="
                                    d-flex
                                    justify-content-center
                                    flex-grow-1
                                    py-1
                                    position-relative
                                    rounded-bottom
                                  "
                                  style="background-color: #15151e"
                                >
                                  <span class="text-white">{{
                                    model.laudo.modelo
                                  }}</span>
                                </div>
                                <div
                                  class="
                                    rounded
                                    p-2
                                    d-flex
                                    justify-content-between
                                    mt-3
                                    position-relative
                                  "
                                  :class="[
                                    getItemsOk(categoria.items) ==
                                    categoria.items.length
                                      ? 'bg-success'
                                      : 'bg-warning'
                                  ]"
                                  v-for="(categoria, index) in model.laudo
                                    .categorias"
                                  :key="index"
                                >
                                  <label>{{ categoria.categoria }}</label>
                                  <label
                                    ><span v-if="getItemsOk(categoria.items) !== categoria.items.length" class="badge badge-circle badge-white me-1"><i class="fa fa-exclamation-triangle  text-warning"></i></span>{{ getItemsOk(categoria.items) }}/{{
                                      categoria.items.length
                                    }}</label
                                  >
                                </div>
                                <div
                                  class="
                                    rounded
                                    p-2
                                    d-flex
                                    justify-content-between
                                    mt-3
                                    d-none
                                  "
                                  :class="[
                                    getItemsOk(categoria.items) ==
                                    categoria.items.length
                                      ? 'bg-success'
                                      : 'bg-warning'
                                  ]"
                                  v-for="(categoria, index) in model.laudo
                                    .categorias"
                                  :key="index"
                                >
                                  <label>{{ categoria.categoria }}</label>
                                  <label
                                    >{{ getItemsOk(categoria.items) }}/{{
                                      categoria.items.length
                                    }}</label
                                  >
                                </div>
                              </div>
                              <div
                                class="
                                  position-absolute
                                  top-100
                                  start-50
                                  translate-middle
                                "
                              >
                                <label class="bg-white">
                                  <img
                                    src="media/logos/Pryal Horizontal.png"
                                    class="mw-50px"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-5">
                            <div
                              class="card border border-warning my-3 pb-3"
                              v-for="(categoria,
                              index) in getCategoriaComProblema(
                                model.laudo.categorias
                              )"
                              :key="index"
                            >
                              <div class="card-title text-center">
                                <h3 class="text-warning pt-3">
                                  {{ categoria.categoria }}
                                </h3>
                              </div>
                              <div class="px-3 d-flex flex-column">
                                <span
                                  v-for="(item,
                                  indexItem) in getItemsComProblema(
                                    categoria.items
                                  )"
                                  :key="indexItem"
                                  role="button"
                                  @click="goToMensagemProblema(item.item)"
                                  ><span class="bullet bg-warning"></span>
                                  {{ item.item }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="row"
                      v-for="(categoria, index) in model.laudo.categorias"
                      :key="index"
                    >
                      <div class="col-lg-8">
                        <div class="card border mb-3">
                          <div className="card-body d-flex flex-column">
                            <h3>{{ categoria.categoria }}</h3>
                            <div
                              class="row"
                              v-for="(item, indexItem) in categoria.items"
                              :key="indexItem"
                              :id="removeWhiteSpace(item.item)"
                            >
                              <span
                                class="col-lg-7 col-md-6"
                                :class="[
                                  item.positivo
                                    ? 'text-success'
                                    : 'text-warning'
                                ]"
                                ><i
                                  class="fas"
                                  :class="[
                                    item.positivo
                                      ? 'text-success fa-check-circle'
                                      : 'text-warning fa-exclamation-triangle'
                                  ]"
                                ></i>
                                {{ item.item }}</span
                              >
                              <span class="col-lg-5 col-md-6">{{ item.observacao }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="card border mb-3" v-if="getImagensCategoria(
                                  categoria.categoria
                                ).length > 0">
                          <div className="card-body">
                            <h3>Fotos</h3>
                            <div class="row images cursor" v-viewer>
                                <div class="col-6 p-2" v-for="src in getImagensCategoria(
                                  categoria.categoria
                                )" :key="src">
                                  <img class="mw-100" role="button" :src="src">
                                </div>
                              
    
                              <!-- <hr>
                              <div
                                class="col-6 p-2"
                                v-for="(evidencia,
                                indexEvidencia) in getImagensCategoria(
                                  categoria.categoria
                                )"
                                :key="indexEvidencia"
                              >
                                <img :src="evidencia" class="mw-100" />
                              </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { saveToken } from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { ElementAnimateUtil } from "@/assets/ts/_utils/ElementAnimateUtil";

export default defineComponent({
  name: "laudo",
  setup() {
    const route = useRouter();
    const laudoId = route.currentRoute.value.params.laudoId;
    const model = reactive({
      laudo: {
        marca: null,
        modelo: null,
        quilometragem: null,
        anoFabricacao: null,
        anoModelo: null,
        chassi: null,
        placa: null,
        items: [],
        evidencias: []
      }
    });

    const removeWhiteSpace = (text) => {
      return text.replace(' ', '');
    }

    const goToMensagemProblema = (item) => {
      ElementAnimateUtil.scrollTo(
        document.getElementById(removeWhiteSpace(item)),
        24
      );
    }

    const getItemsOk = list => {
      if (!list) return;
      return list.filter(x => {
        return x.positivo === true;
      }).length;
    };

    const getCategoriaComProblema = list => {
      if (!list) return;
      return list.filter(x => {
        return x.items.some(y => y.positivo === false);
      })
    };

    const getItemsComProblema = list => {
      if (!list) return;
      return list.filter(x => {
        return x.positivo === false;
      });
    };

    const getImagensCategoria = categoria => {
      return model.laudo.evidencias.filter(x => {
        return x["categoria"] == categoria;
      }).map(x => { return x["imagem"] });
    };

    ApiService.get(`laudo/${laudoId}`).then(({ data }) => {
      model.laudo = data;
      console.log(data.items);
    });
    return {
      model,
      getItemsOk,
      getCategoriaComProblema,
      getItemsComProblema,
      getImagensCategoria,
      goToMensagemProblema,
      removeWhiteSpace
    };
  }
});
</script>

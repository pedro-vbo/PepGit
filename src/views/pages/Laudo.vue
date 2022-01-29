<template>
  <main class="d-flex align-items-center justify-content-center">
    <div class="card card-custom gutter-b example example-compact w-100">
      <div class="card-header d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="mt-4">Iniciar Laudo</h1>
          <div
            class="d-flex justify-content-between align-items-center"
            v-if="!isCadastroNovo"
          >
            <router-link
              :to="{ name: 'Cadastrar-evidencias-laudo' }"
              class="btn btn-primary btn-primary d-flex align-items-center mt-4 me-4"
            >
              <i class="fa fa-camera fs-2"></i>
              Enviar evidências
            </router-link>
            <button class="btn btn-sm btn-link mt-4" @click="excluir">
              Excluir
            </button>
          </div>
        </div>

        <span class="text-muted font-weight-bold font-size-sm my-1">
          {{ analise.marca }} - {{ analise.modelo }} | {{ analise.placa }}
        </span>
        <span class="text-muted mb-4 font-weight-bold font-size-sm">
          Cliente:
          <span class="text-dark font-weight-bold">{{ analise.nome }}</span>
        </span>
      </div>

      <div class="accordion" id="accordionLaudo">
        <template
          v-for="(localizacao, indexPergunta) in perguntas"
          :key="indexPergunta"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                :ref="
                  el => {
                    accordions.push(el);
                  }
                "
                class="accordion-button bg-white text-dark fs-1 text-center"
                :class="{
                  'bg-success':
                    getNumeroRespostasPorLocalizacao(
                      localizacao.localizacao
                    ) === localizacao.items.length
                }"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#' + localizacao.localizacao.replace(' ', '')"
                aria-expanded="true"
                :aria-controls="localizacao.localizacao.replace(' ', '')"
              >
                {{ localizacao.localizacao }}
              </button>
            </h2>
            <div
              :id="localizacao.localizacao.replace(' ', '')"
              class="accordion-collapse collapse"
              :class="{ show: indexPergunta === 0 }"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionLaudo"
            >
              <div class="card-body position-relative mb-10">
                <Pergunta
                  :pergunta="item"
                  :imagens="getEvidencias(item.itemId)"
                  :analiseId="analiseId"
                  v-for="(item, index) in localizacao.items"
                  :key="index"
                />
                <button
                  @click="enviarRespostas(localizacao, indexPergunta, $event)"
                  class="
                    btn btn-success
                    position-absolute
                    bottom-0
                    start-50
                    translate-middle-x
                  "
                >
                  <span>Enviar respostas {{ localizacao.localizacao }}</span>
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
import { defineComponent, ref, onMounted, onBeforeUpdate } from "vue";
import { saveToken } from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";
import Pergunta from "@/components/Laudo/Pergunta.vue";
import { useRouter } from "vue-router";
import emitter from "tiny-emitter/instance";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "Laudo",
  components: { Pergunta },
  setup() {
    const perguntas = ref<any>([]);
    const analise = ref<any>({});
    const resultado = ref<any>([]);
    const route = useRouter();
    const accordions = ref<any>([]);

    const isCadastroNovo = ref(true);

    const analiseId = ref<any>(route.currentRoute.value.params.analiseId);
    let veiculoId = route.currentRoute.value.query.veiculoId;
    //var res = arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);

    function getNumeroRespostasPorLocalizacao(localizacao) {
      return resultado.value.filter(function(item) {
        return (
          item.localizacao === localizacao ||
          item.localizacao === localizacao.replace(" ", "")
        );
      }).length;
    }

    async function enviarRespostas(loc, index, event) {
      console.log(event);
      if (veiculoId) {
        await ApiService.post(
          "/analise/cadastrar?veiculoId=" + veiculoId,
          {}
        ).then(({ data }) => {
          analiseId.value = data;
          veiculoId = null;
        });
      }

      const respostas = resultado.value.filter(function(item) {
        return item.localizacao === loc.localizacao.replace(" ", "");
      });

      const request = {
        analiseId: analiseId.value,
        respostas: respostas
      };

      ApiService.post("analise/registrar-respostas", request)
        .then(() => {
          Swal.fire({
            text: `${loc.localizacao} foi registrado com sucesso!`,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, proximo!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-primary"
            }
          }).then(() => {
            if (index + 1 === perguntas.value.length) {
              route.push({ name: "Dashboard" });
              return;
            }

            accordions.value[index + 1].click();
            setTimeout(() => {
              window.scrollTo(100, accordions.value[index + 1].offsetTop);
            }, 500);
          });
        })
        .catch(() => {
          Swal.fire({
            text: "Não foi possível registrar as informações",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok :(",
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger"
            }
          });
        });
    }

    const excluir = () => {
      Swal.fire({
        title: "Deseja realmente excluir esse laudo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete("/analise/excluir/" + analiseId.value).then(
            () => {
              Swal.fire("Deletado!", "Esse laudo foi excluído", "success");
            }
          );
        }
      });
    };

    const getEvidencias = (id) => {
      return analise.value.evidencias?.filter(x => { return x.itemId === id });
    };

    onBeforeUpdate(() => {
      accordions.value = [];
    });

    onMounted(() => {
      emitter.on("atualizarResposta", function(resposta) {
        const index = resultado.value.findIndex(
          resp => resp.itemId === resposta.itemId
        );
        if (index > -1) {
          resultado.value[index] = resposta;
        } else {
          resultado.value.push(resposta);
        }
      });

      emitter.on("enviarImagem", async function(imagem, itemId, categoria) {
        await ApiService.post(
          "/evidencia/cadastrar",
          {
            analiseId: analiseId.value,
            itemId: itemId,
            categoria: categoria,
            imagem: imagem
          }
        ).then(({ data }) => {
          console.log('data imagem', data);
        });
      });

      //let analiseNova = {...obj1, ...obj2};
      const veiculoId = route.currentRoute.value.query.veiculoId;
      if (veiculoId) {
        analise.value = { ...analise.value, ...route.currentRoute.value.query };
        ApiService.get("analise/perguntas").then(({ data }) => {
          perguntas.value = data;
        });
      } else {
        isCadastroNovo.value = false;
        ApiService.get("analise/perguntas").then(({ data }) => {
          const perguntasSemRespostas = data;
          ApiService.get(`analise?id=${analiseId.value}`).then(({ data }) => {
            analise.value = data;

            const perguntasComRespostas = perguntasSemRespostas.map(
              pergunta => {
                const respostasPorLocalizacao = pergunta.items.map(item => {
                  const resposta = data.respostas.find(function(object) {
                    return item.itemId === object.itemId;
                  });
                  if (resposta) {
                    item.id = resposta.id;
                    item.resposta = resposta.resposta;
                    item.observacao = resposta.observacao;
                    resultado.value.push({
                      id: resposta.id,
                      itemId: resposta.itemId,
                      localizacao: pergunta.localizacao,
                      resposta: resposta.resposta,
                      observacao: resposta.observacao
                    });
                  }
                  return item;
                });

                pergunta.items = respostasPorLocalizacao;
                return pergunta;
              }
            );

            perguntas.value = perguntasComRespostas;
          });
        });
      }
    });

    return {
      Pergunta,
      perguntas,
      analise,
      resultado,
      accordions,
      getNumeroRespostasPorLocalizacao,
      enviarRespostas,
      excluir,
      getEvidencias,
      isCadastroNovo,
      analiseId
    };
  }
});
</script>

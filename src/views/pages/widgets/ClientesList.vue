<template>
  <div id="style-4">
    <div className="card card-custom">
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">
          Pré-Cadastro de Laudos
        </h3>
        <div className="card-toolbar">
          <button
            className="btn btn-primary font-weight-bolder font-size-sm mr-3 d-flex"
            data-bs-toggle="modal"
            data-bs-target="#pryal_cliente_cadastro"
          >
            <i class="bi bi-person-plus-fill fs-3"></i>
          </button>
        </div>
      </div>
      <div className="card-body pt-2" v-for="c in clientes" :key="c.id">
        <div className="d-flex flex-wrap align-items-center">
          <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
            <a
              href="#pryal_cliente_cadastro"
              @click="setCliente(c)"
              data-bs-toggle="modal"
              ><span class="fs-3">{{ c.nome }}</span></a
            >
            <template v-for="veiculo in c.veiculos" :key="veiculo.id">
              <span
                className="d-flex align-items-center justify-content-between text-muted mb-3"
              >
                <span className="font-size-sm">
                  {{ veiculo.marca }} {{ veiculo.modelo }} | Placa
                  {{ veiculo.placa }}
                </span>
                <button
                  class="btn btn-sm btn-light-primary"
                  @click="criarLaudo(c, veiculo)"
                >
                  <i class="bi bi-card-checklist"></i>Criar laudo
                </button>
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ClienteCadastro :cliente="cliente" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import ClienteCadastro from "@/views/pages/widgets/ClienteCadastro.vue";

export default defineComponent({
  name: "ClientesList",
  components: { ClienteCadastro },
  props: {
    clientes: Array
  },
  setup() {
    const router = useRouter();
    const cliente = ref<unknown>({});

    function setCliente(cli) {
      cliente.value = cli;
    }

    function criarLaudo(cliente, veiculo) {
      router.push({
        name: "Cadastrar-laudo",
        query: {
          nome: cliente.nome,
          marca: veiculo.marca,
          modelo: veiculo.modelo,
          veiculoId: veiculo.id
        }
      });
    }

    return {
      ClienteCadastro,
      criarLaudo,
      setCliente,
      cliente
    };
  }
});
</script>

<template>
  <div class="modal fade" ref="modal" tabindex="-1" id="pryal_cliente_cadastro">
    <div
      class="
        modal-dialog
        modal-dialog-centered
        modal-dialog-scrollable
        modal-fullscreen-sm-down
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title d-flex flex-column align-items-start">
            <span v-if="isCadastroNovo"> Cadastro de novo cliente </span>
            <span v-else>Atualizar cadastro de {{ cliente.nome }}</span>
            <button class="btn btn-sm btn-link p-0" @click="excluir">
              Excluir
            </button>
          </h5>
          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <Form
            name="formCliente"
            id="formCliente"
            class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            ref="form"
            @submit="isCadastroNovo === true ? cadastrar() : atualizar()"
            :validation-schema="validacoes"
            v-slot="{ errors }"
          >
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.nome"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.formNome }"
                name="formNome"
                placeholder="Nome do Cliente"
              />
              <label for="formNome">Nome do Cliente</label>
              <div class="invalid-feedback">{{ errors.formNome }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.cpf"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.formCpf }"
                name="formCpf"
                placeholder="CPF"
                v-mask="'###.###.###-##'"
              />
              <label for="formCpf">CPF</label>
              <div class="invalid-feedback">{{ errors.formCpf }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.email"
                type="email"
                :class="{ 'is-invalid': errors.formEmail }"
                class="form-control"
                id="formEmail"
                name="formEmail"
                placeholder="Email"
              />
              <label for="formEmail">Email</label>
              <div class="invalid-feedback">{{ errors.formEmail }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.dataDeNascimento"
                type="date"
                :class="{ 'is-invalid': errors.formDtnascimento }"
                class="form-control"
                name="formDtnascimento"
                placeholder="Data de Nascimento"
              />
              <label for="formDtnascimento">Data de Nascimento</label>
              <div class="invalid-feedback">{{ errors.formDtnascimento }}</div>
            </div>
            <div v-if="cadastro.veiculos && cadastro.veiculos.length > 0">
              <hr class="mt-2 mb-2" />
              <h3>Veículos</h3>
              <template v-for="veiculo in cadastro.veiculos" :key="veiculo.id"> 
                <span
                  className="d-flex align-items-center justify-content-between text-muted mb-3"
                >
                  <span className="font-size-sm">
                    {{ veiculo.marca }} {{ veiculo.modelo }} | Placa
                    {{ veiculo.placa }}
                  </span>
                  <a
                    href="#pryal_veiculo_cadastro"
                    @click="setVeiculo(veiculo)"
                    data-bs-toggle="modal"
                    ><span>Editar</span></a
                  >
                </span>
              </template>
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <button
                type="button"
                v-if="cadastro.id != null"
                class="btn btn-sm btn-info"
                data-bs-toggle="modal"
                data-bs-target="#pryal_veiculo_cadastro"
              >
                Cadastrar veículo
              </button>
            </div>
          </Form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            ref="closeModal"
            class="btn btn-light"
            data-bs-dismiss="modal"
          >
            Fechar
          </button>
          <input
            type="submit"
            class="btn btn-primary"
            form="formCliente"
            :value="isCadastroNovo === true ? 'Cadastrar' : 'Atualizar'"
          />
        </div>
      </div>
    </div>
  </div>
  <VeiculoCadastro :veiculo="veiculo" :clienteId="cadastro.id" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import VeiculoCadastro from "@/views/pages/widgets/VeiculoCadastro.vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Field, Form } from "vee-validate";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";

export default defineComponent({
  name: "ClienteCadastro",
  components: { Field, Form, VeiculoCadastro },
  props: {
    cliente: Object,
  },
  setup(props) {
    const valoresIniciais = {
      nome: null,
      id: null,
      cpf: null,
      email: null,
      dataDeNascimento: null
    }
    const cadastro = ref<any>(JSON.parse(JSON.stringify(valoresIniciais)));
    const clienteProp = reactive<any>(props);
    const modal = ref<HTMLElement | null>(null);
    const closeModal = ref<HTMLButtonElement | null>(null);
    const isCadastroNovo = ref(true);
    const form = ref<HTMLFormElement>();
    const veiculo = ref<unknown>({});
    const route = useRouter();

    Yup.setLocale(pt);
    const validacoes = Yup.object().shape({
      formNome: Yup.string().nullable().required().label("Nome"),
      formCpf: Yup.string().nullable().required().label("CPF"),
      formEmail: Yup.string().nullable().required().email().label("Email"),
      formDtnascimento: Yup.date()
        .required()
        .nullable()
        .label("Data de nascimento")
        .default(function () {
          return new Date();
        })
    });

    onMounted(() => {
      modal.value?.addEventListener("hidden.bs.modal", () => {
        isCadastroNovo.value = true;
        cadastro.value = JSON.parse(JSON.stringify(valoresIniciais));
        form.value?.resetForm();
      });
    });

    watch(clienteProp, () => {
      isCadastroNovo.value = false;
      const cliente = clienteProp.cliente;
      const merged = { ...cadastro.value, ...cliente };
      cadastro.value = merged;
      cadastro.value["dataDeNascimento"] = cliente.dataDeNascimento.substring(
        0,
        10
      );
    });

    const cadastrar = () => {
      ApiService.post("clientes/cadastrar", cadastro.value).then(({data}) => {
        cadastro.value.id = data;
        Swal.fire({
          text: "Cliente foi registrado com sucesso!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, proximo!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      })
       .catch(({ response }) => {
        Swal.fire({
          text: response.data,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Tente de novo!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger"
          }
        });
      })
    };

    const atualizar = () => {
      ApiService.post("clientes/atualizar", cadastro.value).then(() => {
        Swal.fire({
          text: cadastro.value["nome"] + " foi atualizado com sucesso!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, proximo!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => {
          closeModal.value?.click();
        });
      });
    };

    const excluir = () => {
      Swal.fire({
        title: "Deseja realmente excluir esse cliente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete("/clientes/excluir/" + clienteProp.cliente.id).then(
            () => {
              closeModal.value?.click();
              Swal.fire("Deletado!", "Esse cliente foi excluído", "success");
            }
          );
        }
      });
    };

    function setVeiculo(v) {
      veiculo.value = v;
    }

    return {
      cadastrar,
      atualizar,
      cadastro,
      modal,
      closeModal,
      isCadastroNovo,
      validacoes,
      form,
      Form,
      Field,
      excluir,
      veiculo,
      setVeiculo
    };
  }
});
</script>

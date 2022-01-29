<template>
  <div class="modal fade" ref="modal" tabindex="-1" id="pryal_veiculo_cadastro">
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
            <span v-if="isCadastroNovo"> Cadastro de novo veículo </span>
            <span v-else>Atualizar cadastro de {{ veiculo.modelo }}</span>
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
            name="formVeiculo"
            id="formVeiculo"
            class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            ref="form"
            @submit="isCadastroNovo === true ? cadastrar() : atualizar()"
            :validation-schema="validacoes"
            v-slot="{ errors }"
          >
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.marca"
                as="select"
                :class="{ 'is-invalid': errors.formMarca }"
                class="form-select"
                name="formMarca"
                aria-label="Floating label select example"
                placeholder="Marca"
              >
                <option selected></option>
                <option value="AstonMartin">Aston Martin</option>
                <option value="Audi">Audi</option>
                <option value="Bentley">Bentley</option>
                <option value="BMW">BMW</option>
                <option value="CaoaChery">Caoa Chery</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Chrysler">Chrysler</option>
                <option value="Citroen">Citroen</option>
                <option value="Dodge">Dodge</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Fiat">Fiat</option>
                <option value="Ford">Ford</option>
                <option value="Honda">Honda</option>
                <option value="Husqvarna">Husqvarna</option>
                <option value="Hyundai">Hyundai</option>
                <option value="JAC">JAC</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Jeep">Jeep</option>
                <option value="Kia">Kia</option>
                <option value="Lamborguini">Lamborguini</option>
                <option value="LandRover">Land Rover</option>
                <option value="Lexus">Lexus</option>
                <option value="Lifan">Lifan</option>
                <option value="Maserati">Maserati</option>
                <option value="McLaren">McLaren</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Mini">Mini</option>
                <option value="Mistubishi">Mistubishi</option>
                <option value="Nissan">Nissan</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Porsche">Porsche</option>
                <option value="Renault">Renault</option>
                <option value="RollsRoyce">Rolls Royce</option>
                <option value="RoyalEnfield">Royal Enfield</option>
                <option value="Smart">Smart</option>
                <option value="Subaru">Subaru</option>
                <option value="Susuki">Susuki</option>
                <option value="Toyota">Toyota</option>
                <option value="Triumph">Triumph</option>
                <option value="Troller">Troller</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Volvo">Volvo</option>
                <option value="Yamaha">Yamaha</option>
              </Field>
              <label for="formMarca">Marca</label>
              <div class="invalid-feedback">{{ errors.formMarca }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.modelo"
                type="text"
                :class="{ 'is-invalid': errors.formModelo }"
                class="form-control"
                name="formModelo"
                placeholder="Modelo"
              />
              <label for="formModelo">Modelo</label>
              <div class="invalid-feedback">{{ errors.formModelo }}</div>
            </div>
            <div class="input-group mb-3">
              <Field
                v-model="cadastro.quilometragem"
                type="number"
                :class="{ 'is-invalid': errors.formQuilimetragem }"
                class="form-control"
                placeholder="Quilometragem"
                aria-label="Quilometragem"
                name="formQuilimetragem"
              />
              <span class="input-group-text">KM</span>
              <div class="invalid-feedback">{{ errors.formQuilimetragem }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.anoFabricacao"
                type="text"
                :class="{ 'is-invalid': errors.formAnofabricacao }"
                class="form-control"
                name="formAnofabricacao"
                placeholder="Ano Fabricação"
              />
              <label for="formAnofabricacao">Ano Fabricação</label>
              <div class="invalid-feedback">{{ errors.formAnofabricacao }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.anoModelo"
                type="text"
                :class="{ 'is-invalid': errors.formAnomodelo }"
                class="form-control"
                name="formAnomodelo"
                placeholder="Ano Modelo"
              />
              <label for="formAnomodelo">Ano Modelo</label>
              <div class="invalid-feedback">{{ errors.formAnomodelo }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.placa"
                type="text"
                :class="{ 'is-invalid': errors.formPlaca }"
                class="form-control text-uppercase"
                name="formPlaca"
                placeholder="Placa"
                v-mask="'AAA-#X##'"
              />
              <label for="formPlaca">Placa</label>
              <div class="invalid-feedback">{{ errors.formPlaca }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.renavam"
                type="number"
                :class="{ 'is-invalid': errors.formRenavam }"
                class="form-control"
                name="formRenavam"
                placeholder="Renavam"
              />
              <label for="formRenavam">Renavam</label>
              <div class="invalid-feedback">{{ errors.formRenavam }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field
                v-model="cadastro.chassi"
                type="text"
                :class="{ 'is-invalid': errors.formChassi }"
                class="form-control text-uppercase"
                name="formChassi"
                placeholder="Chassi"
              />
              <label for="formChassi">Chassi</label>
              <div class="invalid-feedback">{{ errors.formChassi }}</div>
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
            form="formVeiculo"
            :value="isCadastroNovo === true ? 'Cadastrar' : 'Atualizar'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Field, Form } from "vee-validate";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";

export default defineComponent({
  name: "VeiculoCadastro",
  components: { Field, Form },
  props: {
    veiculo: Object,
    clienteId: String
  },
  setup(props) {
    const valoresIniciais = {
      id: null,
      marca: null,
      modelo: null,
      clienteId: null,
      quilometragem: null,
      anoFabricacao: null,
      anoModelo: null,
      renavam: null,
      placa: null,
      chassi: null
    }
    const cadastro = ref<any>(JSON.parse(JSON.stringify(valoresIniciais)));
    const veiculoProp = reactive<any>(props);
    const modal = ref<HTMLElement | null>(null);
    const closeModal = ref<HTMLButtonElement | null>(null);
    const isCadastroNovo = ref(true);
    const form = ref<HTMLFormElement>();

    Yup.setLocale(pt);
    const validacoes = Yup.object().shape({
      formMarca: Yup.string().nullable().required().label("Marca"),
      formModelo: Yup.string().required().label("Modelo"),
      formQuilimetragem: Yup.number().nullable().required().label("Quilometragem"),
      formAnofabricacao: Yup.number().nullable().required().label("Ano fabricação"),
      formAnomodelo: Yup.number().nullable().required().label("Ano modelo"),
      formPlaca: Yup.string().nullable().required().label("Placa"),
      formRenavam: Yup.string().nullable().required().label("Renavam"),
      formChassi: Yup.string().nullable().required().label("Chassi"),
    });

    onMounted(() => {
      modal.value?.addEventListener("hidden.bs.modal", () => {
        isCadastroNovo.value = true;
        cadastro.value = JSON.parse(JSON.stringify(valoresIniciais));
        form.value?.resetForm();
      });
    });

    watch(veiculoProp, () => {
      const veiculo = veiculoProp.veiculo;
      const clienteId = veiculoProp.clienteId;
      
      if (clienteId) {
        const merged = { ...cadastro.value, clienteId };
        cadastro.value = merged;
        console.log('cadastro.value', cadastro.value);
      }
      if (veiculo["id"]) { 
        isCadastroNovo.value = false;
        const merged = { ...cadastro.value, ...veiculo };
        cadastro.value = merged;
        console.log('cadastro.value', cadastro.value);
      }
    });

    const cadastrar = () => {
      ApiService.post("veiculos/cadastrar", cadastro.value).then(() => {
        Swal.fire({
          text: "Veículo foi registrado com sucesso!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, proximo!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => {
          closeModal.value?.click();
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
      ApiService.post("veiculos/atualizar", cadastro.value).then(() => {
        Swal.fire({
          text: cadastro.value["modelo"] + " foi atualizado com sucesso!",
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
          ApiService.delete("/veiculos/excluir/" + veiculoProp.id).then(
            () => {
              closeModal.value?.click();
              Swal.fire("Deletado!", "Esse cliente foi excluído", "success");
            }
          );
        }
      });
    };

    //   Swal.fire({
    //     text: "Deseja realmente excluir esse cliente?",
    //     icon: "warning",
    //     buttonsStyling: false,
    //     confirmButtonText: "Sim, excluir!",
    //     customClass: {
    //       confirmButton: "btn fw-bold btn-light-primary"
    //     }
    //   }).then(() => {
    //     console.log('excluiu')
    //     // ApiService.delete("/clientes/excluir/" + clienteProp.cliente.id).then(
    //     //   ({ data }) => {
    //     //     closeModal.value?.click();
    //     //   }
    //     // );
    //   });
    // };

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
    };
  },
});
</script>

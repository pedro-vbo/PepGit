<template>
  <div
    class="
      d-flex
      flex-column flex-column-fluid
      bgi-position-y-bottom
      position-x-center
      bgi-no-repeat bgi-size-contain bgi-attachment-fixed
    "
  >
    <!--begin::Content-->
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
      <!--begin::Logo-->
      <a href="#" class="mb-12">
        <img alt="Logo" src="media/logos/Pryal.png" class="h-100px" />
      </a>
      <!--end::Logo-->

      <!--begin::Wrapper-->
      <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
        <!--begin::Form-->
        <Form
          class="form w-100"
          id="kt_login_signin_form"
          @submit="onSubmitLogin"
          :validation-schema="login"
        >
          <!--begin::Heading-->
          <div class="text-center mb-10">
            <!--begin::Title-->
            <h1 class="text-dark mb-3">Pesquisa de laudo</h1>
            <!--end::Title-->
          </div>
          <!--begin::Heading-->
          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Label-->
            <label class="form-label fs-6 fw-bolder text-dark">Renavam</label>
            <!--end::Label-->

            <!--begin::Input-->
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="renavam"
              autocomplete="off"
            />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="renavam" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack mb-2">
              <!--begin::Label-->
              <label class="form-label fw-bolder text-dark fs-6 mb-0"
                >Placa</label
              >
              <!--end::Label-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Input-->
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="placa"
              autocomplete="off"
              v-mask="'AAA-#X##'"
            />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="placa" />
              </div>
            </div>
          </div>
          <!--end::Input group-->
          <div class="fv-row mb-10">
            <label class="form-check form-check-custom form-check-solid">
              <Field
                class="form-check-input"
                type="checkbox"
                name="toc"
                value="1"
                @change="setToc"
              />
              <span class="form-check-label fw-bold text-gray-700 fs-6">
                Eu li e aceitos os &
                <a href="#pryal_termos" data-bs-toggle="modal" class="ms-1 link-primary"
                  >Termos e condições da Pryal</a
                >.
              </span>
            </label>
          </div>
          <!--begin::Actions-->
          <div class="text-center">
            <!--begin::Submit button-->
            <button
              type="submit"
              ref="submitButton"
              id="kt_sign_in_submit"
              class="btn btn-lg btn-primary w-100 mb-5"
              :disabled="toc === false"
            >
              <span class="indicator-label"> Procurar </span>

              <span class="indicator-progress">
                Procurando...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Submit button-->
          </div>
          <!--end::Actions-->
        </Form>
        <!--end::Form-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Content-->
  </div>
  <div class="modal fade" ref="modal" tabindex="-1" id="pryal_termos">
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
            <span> Termos e condições da PRYAL </span>
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
          <p>A PRYAL, em seus processos de vistoria, utiliza consultas em bases de dados fornecidas por empresas terceiras. A PRYAL não possui responsabilidade sobre o fornecimento de tais dados, vez que se trata de mera apresentação de informações sobre veículos automotores registrados em bases públicas e privadas, estas detentoras do conteúdo. A vistoria e a apresentação das informações são ferramentas de auxílio para proprietários, compradores e vendedores, úteis na decisão de realização ou não de eventual negócio jurídico, no entanto não se confundem com uma recomendação. A PRYAL não avaliza ou assegura a regularidade e a licitude de transações que ocorreram ou venham a ocorrer, já que a tomada de decisão fica inteiramente a cargo do cliente. A PRYAL não é responsável por informações incorretas, faltantes ou divergentes, já que as informações são válidas somente no ato da vistoria. Em razão de se preocupar com os clientes e buscar sempre a transparência, a PRYAL informa que as empresas terceiras, fornecedoras das informações constantes em bancos de dados públicos e privados, não detém acesso e meios para a obtenção de registros advindos do RENAJUD.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";

export default defineComponent({
  name: "check-laudo",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    Yup.setLocale(pt);

    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLElement | null>(null);
    const toc = ref(false);
    

    //Create form validation object
    const login = Yup.object().shape({
      renavam: Yup.number().required().label("Renavam"),
      placa: Yup.string().min(7).required().label("Placa")
    });

    //Form submit function
    const onSubmitLogin = (values) => {
      // Clear existing errors
      ApiService.post("laudo/procurar", values)
        .then(({ data }) => {
          const now = new Date();
          now.setDate(now.getDate() + 1);
          const item = {
            value: true,
            expiry: now.getTime()
          };
          window.localStorage.setItem(`search-${data}`, JSON.stringify(item))
          router.push({ name: "laudo", params: { laudoId: data } });
        })
        .catch(() => {
          Swal.fire({
            text: "Laudo não encontrado, verifique os dados informados",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Tente de novo!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger",
            },
          });
        });
    };

    const setToc = () => {
      toc.value = !toc.value;
    }
    return {
      onSubmitLogin,
      login,
      submitButton,
      toc,
      setToc
    };
  },
});
</script>

<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
  >
    <!--begin::Content-->
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
      <!--begin::Logo-->
      <a href="#" class="mb-12">
        <img alt="Logo" src="media/logos/pryal.png" class="h-100px" />
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
            <h1 class="text-dark mb-3">
              Pesquisa de laudo
            </h1>
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
            />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="placa" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Actions-->
          <div class="text-center">
            <!--begin::Submit button-->
            <button
              type="submit"
              ref="submitButton"
              id="kt_sign_in_submit"
              class="btn btn-lg btn-primary w-100 mb-5"
            >
              <span class="indicator-label">
                Procurar
              </span>

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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import { pt } from 'yup-locale-pt';

export default defineComponent({
  name: "check-laudo",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    Yup.setLocale(pt);

    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      renavam: Yup
        .number()
        .required()
        .label("Renavam"),
      placa: Yup.string()
        .min(7)
        .required()
        .label("Placa")
    });

    //Form submit function
    const onSubmitLogin = values => {
      // Clear existing errors
      ApiService.post("laudo/procurar", values).then(({ data }) => {
       router.push({ name: "laudo", params: { laudoId: data}});
      }).catch(() => {
        Swal.fire({
          text: "Laudo não encontrado, verifique os dados informados",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Tente de novo!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger"
          }
        });
      });
    };

    return {
      onSubmitLogin,
      login,
      submitButton
    };
  }
});
</script>

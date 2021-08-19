<template>
  <div className="row">
    <div className="col-lg-6 mb-20">
      <ClientesList :clientes="clientes" />
    </div>
    <div className="col-lg-6">
      <LaudosList :laudos="laudos" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ClientesList from "@/views/pages/widgets/ClientesList.vue";
import LaudosList from "@/views/pages/widgets/LaudosList.vue";

import { saveToken } from "@/core/services/JwtService";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "Dashboard",
  components: { ClientesList, LaudosList },
  setup() {
    const clientes = ref([]);
    const laudos = ref([]);
    const previewList = ref<any>([]);
    const imageList = ref<any>([]);
    const uploadInput = ref<any>();

    onMounted(() => {
      ApiService.get("clientes/listar").then(({ data }) => {
        clientes.value = data;
      });
      ApiService.get("/analise/listar").then(({ data }) => {
        laudos.value = data;
      });
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
          imageList.value.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    };

    const onUpload = status => {
      console.log("status", status);
    };

    const enviar = () => {
      console.log("uploadInput", uploadInput.value.files);
      const formData = new FormData();

      Array.prototype.forEach.call(uploadInput.value.files, file => {
        formData.append("imagens", file);
      });
      // uploadInput.value.files.forEach((file) => {
      //   formData.append("imagens", file);
      // });
      // form.append("file", this.file);

      ApiService.post("analise/upload", formData, {
        onUploadProgress: onUpload,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(resp => {
        console.log(resp);
      });
    };

    return {
      ClientesList,
      LaudosList,
      clientes,
      laudos,
      previewList,
      imageList,
      onFileAdd,
      enviar,
      uploadInput
    };
  }
});
</script>

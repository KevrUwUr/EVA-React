// swalConfig.js

import Swal from 'sweetalert2';

export const smallAlertDelete = Swal.mixin({
  toast: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  customClass: {
    container: "small-alert-container",
    title: "small-alert-title",
    content: "medium-alert-content",
    actions: "small-alert-actions",
    confirmButton: "small-alert-confirm-button2",
    cancelButton: "small-alert-cancel-button",
  },
  buttonsStyling: true, // Para aplicar estilos personalizados
  width: "400px", // Ajusta el ancho de la alerta
  padding: "1em", // Reduce el padding para que sea menos invasiva
  display: "flex",
  backdrop: false,
  position: "center",
});




export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

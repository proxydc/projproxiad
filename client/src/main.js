import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import './assets/jquery-3.7.0.js';
//import './assets/jquery.dataTables.min.js';
import './assets/dataTables.bootstrap5.min.css';
//import './assets/dataTables.bootstrap5.min.js';
import './assets/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/css/buttons.dataTables.css';
import './assets/css/dataTables.dataTables.css';
//import './assets/css/bootstrap.min.css';
//import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';

import pdfFonts from './assets/vfs_fonts.js';
import JSZip from 'jszip';
import pdfMake from 'pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = JSZip;

createApp(App)
    .use(router)
    .mount("#app");
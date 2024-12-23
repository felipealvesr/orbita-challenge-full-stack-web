import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'customTheme', 
    themes: {
      customTheme: {
        dark: false, 
        colors: {
          primary: '#0f171d', 
          secondary: '#bb243e', 
          terciary: '#00a0a6',
          success: '#8BC34A', 
          error: '#ff203b', 
          warning: '#FFC107', 
          info: '#2196F3', 
          background: '#FFFFFF', 
        },
      },
    },
  },
})

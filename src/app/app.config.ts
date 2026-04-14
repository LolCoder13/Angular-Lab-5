import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '#fff1f3',
      100: '#ffe4e8',
      200: '#fecdd6',
      300: '#fda4b5',
      400: '#fb718f',
      500: '#f43f6a',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
      950: '#4c0519'
    }
  },
  components: {
    menubar: {
      root: {
        background: '#ffffff',
        borderColor: '#fecdd6',
        borderRadius: '0',
        color: '#881337',
        gap: '0.25rem',
        padding: '0.25rem 0.75rem'
      },
      baseItem: {
        borderRadius: '{border.radius.sm}',
        padding: '{navigation.item.padding}'
      },
      item: {
        focusBackground: '#fda4b5',
        activeBackground: '#f43f6a',
        color: '#881337',
        focusColor: '#4c0519',
        activeColor: '#ffffff',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '#881337',
          focusColor: '#4c0519',
          activeColor: '#ffffff'
        }
      },
      submenu: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
        background: '#fff1f3',
        borderColor: '#fecdd6',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        mobileIndent: '1rem',
        icon: {
          size: '{navigation.submenu.icon.size}',
          color: '#881337',
          focusColor: '#4c0519',
          activeColor: '#ffffff'
        }
      },
      separator: {
        borderColor: '#fecdd6'
      },
      mobileButton: {
        color: '#881337',
        hoverColor: '#4c0519',
        hoverBackground: '#ffe4e8',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false
        }
      }
    })
  ]
};

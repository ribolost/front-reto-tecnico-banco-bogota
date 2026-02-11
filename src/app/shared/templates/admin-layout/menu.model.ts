import { signal, WritableSignal } from '@angular/core';

export type MenuSubItem = {
  label: string;
  route: string;
  icon?: string;
};

export type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  subItems?: MenuSubItem[];
  isOpen?: boolean;
};

export const menuItems: WritableSignal<MenuItem[]> = signal<MenuItem[]>([
  {
    id: 'clients',
    label: 'Clientes',
    icon: 'users',
    isOpen: false,
    subItems: [
      { label: 'Listado Clientes', route: '/clientes' },
      { label: 'Registrar Clientes', route: '/clientes/registro' },
    ],
  },
  {
    id: 'accounts',
    label: 'Cuentas',
    icon: 'accounts',
    isOpen: false,
    subItems: [
      { label: 'Gestión de cuentas', route: '/cuentas' },
    ],
  },
]);

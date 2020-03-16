import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: ['fas', 'tachometer-alt'],
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Dashboard 1',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          }
        },
        {
          title: 'Dashboard 2'
        },
        {
          title: 'Dashboard 3'
        }
      ]
    },
    {
      title: 'E-commerce',
      icon: ['fas', 'shopping-cart'],
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: 'Products',
        },
        {
          title: 'Orders'
        },
        {
          title: 'Credit cart'
        }
      ]
    },
    {
      title: 'Components',
      icon: ['far', 'gem'],
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'General',
        },
        {
          title: 'Panels'
        },
        {
          title: 'Tables'
        },
        {
          title: 'Icons'
        },
        {
          title: 'Forms'
        }
      ]
    },
    {
      title: 'Charts',
      icon: ['fas', 'chart-line'],
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Pie chart',
        },
        {
          title: 'Line chart'
        },
        {
          title: 'Bar chart'
        },
        {
          title: 'Histogram'
        }
      ]
    },
    {
      title: 'Maps',
      icon: ['fas', 'globe'],
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Google maps',
        },
        {
          title: 'Open street map'
        }
      ]
    },
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'Documentation',
      icon: ['fas', 'book'],
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendar',
      icon: ['fas', 'calendar'],
      active: false,
      type: 'simple'
    },
    {
      title: 'Examples',
      icon: ['fas', 'folder'],
      active: false,
      type: 'simple'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

}

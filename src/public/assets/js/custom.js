/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable no-new */
// eslint-disable-next-line max-classes-per-file
class User {
  constructor() {
    this.jqueryEvents();
  }

  jqueryEvents() {
    $('form').on('submit', (e) => {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/admin/login',
        data: $('form').serialize(),
        success() {
          window.location.href = '/admin/users';
        },
        error(error) {
          alert(error.responseJSON.message);
        },
      });
    });
  }
}
class Section {
  constructor() {
    this.jqueryEvents();
  }

  jqueryEvents() {
    $('form').on('submit', (e) => {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/admin/login',
        data: $('form').serialize(),
        success() {
          window.location.href = '/admin/users';
        },
        error(error) {
          alert(error.responseJSON.message);
        },
      });
    });
  }
}
class Subsection {
  constructor() {
    this.jqueryEvents();
  }

  jqueryEvents() {
    $('form').on('submit', (e) => {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/admin/login',
        data: $('form').serialize(),
        success() {
          window.location.href = '/admin/users';
        },
        error(error) {
          alert(error.responseJSON.message);
        },
      });
    });
  }
}

class Manufacturer {
  constructor() {
    this.jqueryEvents();
  }

  jqueryEvents() {
    $('form').on('submit', (e) => {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/admin/login',
        data: $('form').serialize(),
        success() {
          window.location.href = '/admin/users';
        },
        error(error) {
          alert(error.responseJSON.message);
        },
      });
    });
  }
}

class Login {
  constructor() {
    this.jqueryEvents();
  }

  jqueryEvents() {
    $('form').on('submit', (e) => {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/admin/login',
        data: $('form').serialize(),
        success() {
          window.location.href = '/admin/users';
        },
        error(error) {
          alert(error.responseJSON.message);
        },
      });
    });
  }
}

if (window.location.pathname === '/admin/login') {
  new Login();
}
if (window.location.pathname === '/admin/users') {
  new User();
}
if (window.location.pathname === '/admin/sections') {
  new Section();
}
if (window.location.pathname === '/admin/subsections') {
  new Subsection();
}
if (window.location.pathname === '/admin/manufacturers') {
  new Manufacturer();
}

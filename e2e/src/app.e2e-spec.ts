import { AppPage } from './app.po';

import { getCurrentRouteUrl } from './utils';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => (page = new AppPage()));

  it('should redirect to "register" route', () => {
    page.navigateTo();
    expect(getCurrentRouteUrl()).toEqual('register');
  });

  it('should have "Register", "Table"', () => {
    page.navigateTo();
    page
      .getAllMenus()
      .then(menus => expect(menus).toEqual(['Register', 'Table']));
  });
});

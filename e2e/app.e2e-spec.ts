import { BookStoreProjectPage } from './app.po';

describe('book-store-project App', () => {
  let page: BookStoreProjectPage;

  beforeEach(() => {
    page = new BookStoreProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const handlebars = exphbs.create({
  handlebars: Handlebars,
  // Specify your custom helpers if needed
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b,
    percent: (a, b) => (100 - a * 100 / b).toFixed(0),
    // Add other helpers if needed
    generatePaginationLinks: function (pages, currentPage,prevPage,nextPage ,role) {
      let links = '';
      //function handle first and last
      function handleArrow(pageNumber, text){
        return `<a id="${pageNumber}" href="/${role}/courses?page=${pageNumber}">${text}</a>`;
      }
      // Function to generate individual links
      function generateLink(pageNumber, text) {
        const isActive = pageNumber === currentPage ? 'active' : '';
        return `<a id="${pageNumber}" href="/${role}/courses?page=${pageNumber}" class="${isActive}">${text}</a>`;
      }

      // Add previous page link
      links += handleArrow(prevPage, '<');

      // Add individual page links
      pages.forEach((pageNumber) => {
        links += generateLink(pageNumber, pageNumber);
      });

      // Add next page link
      links += handleArrow(nextPage, '>');


      return new Handlebars.SafeString(links);
    },
    generateTutorPaginationLinks: function (pages, currentPage,prevPage,nextPage,namePage ) {
      let links = '';
      //function handle first and last
      function handleArrow(pageNumber, text){
        return `<a id="${pageNumber}" href="/tutor/stored/${namePage}?page=${pageNumber}">${text}</a>`;
      }
      // Function to generate individual links
      function generateLink(pageNumber, text) {
        const isActive = pageNumber === currentPage ? 'active' : '';
        return `<a id="${pageNumber}" href="/tutor/stored/${namePage}?page=${pageNumber}" class="${isActive}">${text}</a>`;
      }

      // Add previous page link
      links += handleArrow(prevPage, '<');

      // Add individual page links
      pages.forEach((pageNumber) => {
        links += generateLink(pageNumber, pageNumber);
      });

      // Add next page link
      links += handleArrow(nextPage, '>');


      return new Handlebars.SafeString(links);
    }
  }

});

module.exports = handlebars;

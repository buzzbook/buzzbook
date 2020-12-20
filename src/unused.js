import $ from 'jquery';

const stylechanges = () => {
  console.log($('#filter-container').parent().parent());
  $('#filter-container').parent().parent().addClass("pt-3").removeClass("py-3");
  $('.form-control').parent().parent().addClass("pt-3").removeClass("py-3");

  $('#courseInfo').parent().addClass("mt-4");

  $('#filterBar').css("margin-bottom", "0");
  console.log("asdf");
};

//nav 2nd item margin to .9rem

export default stylechanges;

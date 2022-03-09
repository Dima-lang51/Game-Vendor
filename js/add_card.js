import { options, page_pagination } from "./cards.js";
import { initial_cards } from './cards_data.js';
import { popupClose } from "./popup.js";


const fileUploader = document.getElementById('file-uploader');
const reader = new FileReader();
const imageGrid = document.querySelector('.form__photo-preview');

fileUploader.addEventListener('change', (e) => {
  const files = e.target.files;
  const file = files[0];
  reader.readAsDataURL(file);
  let img;
  reader.addEventListener('load', (e) => {
    img = imageGrid.firstChild;
    img.src = e.target.result;
    img.alt = file.name;

  })
});

$(".form__category-select").select2();
$(".form__discount-select").select2();

let cards_updated = initial_cards;
const add_card_btn = document.getElementById('submit_card');
const category_select = document.querySelector('.select2-selection');
const game_name = document.getElementById('form__name');
const game_desc = document.getElementById('form__description');
const game_price = document.getElementById('form__price');


add_card_btn.addEventListener('click', (e) => {
  let smth_is_empty = false;
  const category_selected = $(".form__category-select").select2('data');
  let category_values = [];
  if (category_selected.length == 0 ) {
    category_select.style.border = 'solid 1px red';
    smth_is_empty = true;
  } else {
      for (let cat in category_selected){
        category_select.style.border = 'solid 1px black';
        category_values.push(category_selected[cat].text);
      }
      
  }
  
  let game_name_value = game_name.value;
  if (game_name_value == ''){
      game_name.style.border  = 'solid 1px red';
      smth_is_empty = true;
  } 
  
  let game_desc_value = game_desc.value;
  let game_price_value = +game_price.value;
  let game_price_new = 0;


  const discount_selected = $(".form__discount-select").select2('data');
  let discount_value = +discount_selected[0].text;
  if (discount_value != 0 && game_price_value !== 0) {
    game_price_new = game_price_value - game_price_value * discount_value / 100;

  }
  
  if (smth_is_empty) {
      return;
  }

  let new_card = {
    'img': imageGrid.firstChild.src,
    'category': category_values,
    'name': game_name_value,
    'rating': 0,
    'voted': '0',
    'description': game_desc_value,
    'oldPrice': (game_price_value != 0) ? '$'+game_price_value : 'Free' ,
    'newPrice': (game_price_new != 0) ? '$'+game_price_new : '',
    'discount': (discount_value != 0) ? '-'+discount_value+'%' : '' 
  }
  
  cards_updated.splice(1, 0, new_card);
  options['dataSource'] = cards_updated;
  page_pagination.pagination(options);
  clear_form();
  popupClose(e.target.closest('.popup'));

})

function clear_form() {
    imageGrid.firstChild.src = './images/cards/placeholder.jpg'
    game_name.value = '';
    game_desc.value = '';
    game_price.value = '';
    $('.form__category-select').val(null).trigger('change');
    $('.form__discount-select').val('0').trigger('change');
}




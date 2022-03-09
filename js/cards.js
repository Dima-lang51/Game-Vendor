import {popupOpen} from './popup.js'
import { initial_cards } from './cards_data.js';

const card_per_page = 15;


function renderTemplate(data) {
  let count = 0;
  let out = ``;
  let addCardHTML = ``;
 console.log(data)
  for (let card of data) {
    
    if (JSON.stringify(card) === '{}') {
      
      out = `
          <li class="list__item-card list__item-add">
              <p class="add__text">You can add a product card by clicking on the button</p>
              <button class="add__button">
                  <img src="../images/icon/Plus_Circle.png" />
                  Add card
              </button>
          </li>
      `;
      continue;
    };
    count +=1;
    let categories = '';
    let categories_class = '';
    card.category.forEach(element => {
        categories += element + ' ';
        categories_class += element.toLowerCase() + '_';
    });
    categories_class = categories_class + 'category';
    let categoriesHTML = `
        <div class="${categories_class}">
            <span class="dot"></span>
            <p>${categories}</p>
        </div>
    `
    let discountHTML = (card.discount == '') ? `` :`
    <div class="discount__block">
      <span class="item__card-discount">${card.discount}</span>
    </div>
    `
    out += `
        <li id="${count}" class="list__item-card">
          <div class="item__card">
            <img class="item__card-img" src="${card.img}"/>
          </div>
            <div class="card__container"> 
                <div class="item__card-category">${categoriesHTML}</div>
                <h2 class="item__card-name">${card.name}</h2>
                <div class="item__card-rating rating_set">
                    <div class="rating__body">
                        <div class="rating__active"></div>  
                    </div>
                    <div class="rating__value">${card.voted}</div>
                </div>
                <p class="item__card-description">${card.description}</p>
                <div class="item__card-price">
                <div class="price__block">
                  <span class="item__card-oldPrice">${card.oldPrice}</span>
                  <span class="item__card-newPrice">${card.newPrice}</span>
                </div>
                ${discountHTML}
                </div>
            </div> 
        </li>
    `;
  
  }
  return out;
}

export let page_pagination = $('.page__card-pagination');

export let options = {
  dataSource: initial_cards,
  pageSize: card_per_page,
  callback: function(data, pagination) {
      // template method of yourself
      var html = renderTemplate(data);
      $('.cards__list').html(html);
      let count = 0;
      for (let card of data) {
          
          if (JSON.stringify(card) === '{}') continue;
          count +=1;
          let cur_card = document.getElementById(count);
          let rating = cur_card.querySelector('.rating__active');
          let ratingActiveWidth = card.rating / 5 * 100;
          rating.style.width = `${ratingActiveWidth}%`;
      }
      // assign event to add button
      const btn = document.querySelector('.add__button');
      btn.addEventListener('click', function(e) {
        const curentPopup = document.getElementById('popup');
        popupOpen(curentPopup);
        e.preventDefault();
      })
      document.querySelector('.paginationjs-prev').innerHTML = `<img class="pagination_arrows" src="../images/icon/arror_prev.svg"/>`;
      document.querySelector('.paginationjs-next').innerHTML = `<img class="pagination_arrows" src="../images/icon/arror_next.svg"/>`;

  }
};


page_pagination.pagination(options);


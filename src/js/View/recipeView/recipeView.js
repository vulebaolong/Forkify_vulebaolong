import View from "../View.js"

import icons from "url:../../../img/icons.svg" //pacel 2
import IngredientsView from "./ingredientsView.js"
import BookMarkButton from "./bookMarkButton.js"

class RecipeView extends View {
    _parentEl = ".recipe"

    addEventRender(handler) {
        ;["hashchange", "load"].forEach((e) => {
            window.addEventListener(e, handler)
        })
    }

    addEventListen(handler) {
        this.getParentEl().addEventListener("click", (e) => {
            const btn = e.target.closest(".btn--tiny")
            if (!btn) return

            handler(+btn.dataset.servingGoto)
        })
    }

    _createHtml(recipe) {
        return `
        <figure class="recipe__fig">
          <img src="${recipe.img}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-serving-goto='${
                  recipe.servings - 1
              }'>
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-serving-goto='${
                  recipe.servings + 1
              }'>
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            ${BookMarkButton._createHtml(recipe)}
          </button>
        </div>

        <div class="recipe__ingredients">
          ${IngredientsView._createHtml(recipe)}  
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
                recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.source}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `
    }
}

export default new RecipeView()

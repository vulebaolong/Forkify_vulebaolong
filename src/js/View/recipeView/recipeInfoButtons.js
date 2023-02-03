//recipeInfoButtons.js
import icons from "url:../../../img/icons.svg" //pacel 2
import View from "../View.js"

class RecipeInfoButtons extends View {
    _parentEl = ".recipe__info-buttons"

    _createHtml(recipe) {
        return `
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
        `
    }
}

export default new RecipeInfoButtons()

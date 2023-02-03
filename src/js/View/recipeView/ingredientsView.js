import View from "../View.js"

class IngredientsView extends View {
    _parentEl = ".recipe__ingredients"

    _createHtml(recipe) {
        return `
        <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._ingredientsMap(recipe)}            
        </ul>
        `
    }
}

export default new IngredientsView()

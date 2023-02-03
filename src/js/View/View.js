import icons from "url:../../img/icons.svg" //pacel 2
// import { Fraction } from "fractional"

export default class View {
    renderText(data, classEl) {
        const parent = document.querySelector(classEl)
        parent.textContent = data
    }

    getParentEl() {
        return document.querySelector(this._parentEl)
    }

    render(data) {
        this._clearHtml()
        this.getParentEl().insertAdjacentHTML(
            "afterbegin",
            this._createHtml(data)
        )
    }

    _clearHtml() {
        this.getParentEl().innerHTML = ""
    }

    renderMessenger(mes) {
        const html = `
          <div class="error">
              <div>
                  <svg>
                      <use
                          href="${icons}#icon-alert-triangle"
                      ></use>
                  </svg>
              </div>
              <p>${mes}</p>
          </div>
      `
        this._clearHtml()
        this._parentEl.insertAdjacentHTML("afterbegin", html)
    }

    renderSpinner() {
        const html = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> 
        `
        this._clearHtml()
        this.getParentEl().insertAdjacentHTML("afterbegin", html)
    }

    _ingredientsMap(recipe) {
        return recipe.ingredients
            .map((ing) => {
                // const quantity = `${new Fraction(ing.quantity ?? 0)}`
                return `
                <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity || ""}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>`
            })
            .join("")
    }

    addEventActivePreview(handler) {
        this.getParentEl().addEventListener("click", (e) => {
            const activeEl = e.target.closest(this._activeEl)
            if (!activeEl) return
            handler(activeEl)
        })
    }
}
